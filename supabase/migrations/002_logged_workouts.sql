-- ---------------------------------------
-- ----------- workout_type -------------
-- ---------------------------------------
create table public.workout_type(
    id int primary key,
    name text not null unique
);

-- Enable RLS
alter table public.workout_type enable row level security;

-- Allow all users to access table
create policy "Signed-in users can read workout types"
on public.workout_type for select to authenticated
using (true);

insert into public.workout_type (id, name) values
(1, 'push'),
(2, 'pull'),
(3, 'legs'),
(4, 'upper body'),
(5, 'lower body'),
(6, 'full body'),
(7, 'cardio'),
(8, 'other'),
(9, 'rest');


-- ---------------------------------------
-- -------- logged_workout --------------
-- ---------------------------------------
create table public.logged_workout(
    id bigint generated always as identity primary key,
    user_id uuid not null default auth.uid()
        references public.profile(user_id) on delete cascade,
    type_id int not null
        references public.workout_type(id) on delete restrict,
    workout_date date not null,
    notes text check (char_length(notes) <= 500),  
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (user_id, workout_date)
);

-- Enable RLS
alter table public.logged_workout enable row level security;

-- ------------ Policies ------------
-- Allow users to read their own logged workouts
create policy "Users can view their own logged workouts"
on public.logged_workout for select to authenticated
using ((select auth.uid()) = user_id);

-- Allow users to insert their own workouts
create policy "Users can log their own workouts"
on public.logged_workout for insert to authenticated
with check (
    (select auth.uid()) = user_id
    and workout_date <= current_date + 1
    and workout_date >= (
        select p.created_at::date - 1
        from public.profile p
        where p.user_id = (select auth.uid())
    )
);

-- Allow users to update their own workouts
create policy "Users can update their own workouts"
on public.logged_workout for update to authenticated
using ((select auth.uid()) = user_id)
with check (
    (select auth.uid()) = user_id
    and workout_date <= current_date + 1
    and workout_date >= (
        select p.created_at::date - 1
        from public.profile p
        where p.user_id = (select auth.uid())
    )
);

-- Allow users to only delete their own workouts
create policy "Users can delete their own workouts"
on public.logged_workout for delete to authenticated
using ((select auth.uid()) = user_id);

-- Set updated at automatically on every edit
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin 
    new.updated_at = now();
    return new;
end;
$$;

create trigger logged_workout_set_updated_at
before update on public.logged_workout
for each row execute function public.set_updated_at();