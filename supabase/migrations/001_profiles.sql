-- The only allowed weight units (weights are always stored in lb; this is for display)
create type public.weight_unit as enum ('lb', 'kg');

-- Table
create table public.profile(
    user_id         uuid primary key references auth.users (id) on delete cascade,
    onboarded       boolean not null default false,
    weekly_goal     smallint not null default 4 check (weekly_goal between 1 and 7),
    start_weight    numeric(5,1) check (start_weight > 0 and start_weight < 1500),   -- lb
    curr_weight     numeric(5,1) check (curr_weight > 0 and curr_weight < 1500),     -- lb
    unit            public.weight_unit not null default 'lb',
    streak          int not null default 0,
    last_workout    date,
    total_workouts  int not null default 0,
    created_at      timestamptz not null default now()
);

-- Enable RLS
alter table public.profile enable row level security;

-- -------- Policies---------
-- Users can view their own Profile
create policy "Users can view their own Profile" on public.profile
for select to authenticated
using ((select auth.uid()) = user_id);

-- Users can modify their own profile data
create policy "User can modify their own profile data" on public.profile
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- but only these columns
revoke update on public.profile from authenticated;
grant update(onboarded, weekly_goal, start_weight, curr_weight, unit, streak, last_workout, total_workouts)
on public.profile to authenticated;

-- Create a profile automatically when someone signs up
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    insert into public.profile (user_id) values (new.id);
    return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Give every existing user a profile
insert into public.profile(user_id)
select id from auth.users
on conflict (user_id) do nothing;
