
-- ---------------------------------------
-- ----------- logged_weight -------------
-- ---------------------------------------
create table public.logged_weight(
    id bigint generated always as identity primary key,
    user_id uuid not null default auth.uid()
        references public.profile(user_id) on delete cascade,
    weight numeric(5,1) not null check (weight > 0 and weight < 1500),
    unit text not null default 'lb' check (unit in ('lb', 'kg')),
    recorded_on date not null,                -- app sends the phone's local date
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (user_id, recorded_on)
);

-- Enable RLS
alter table public.logged_weight enable row level security;

-- --------- Policies ------------
-- Allow users to read their own logs
create policy "Users can view their own weight logs"
on public.logged_weight for select to authenticated
using ((select auth.uid()) = user_id);


-- Allow users to insert their own logs
create policy "Users can log their own weight"
on public.logged_weight for insert to authenticated
with check (
    (select auth.uid()) = user_id
    and recorded_on <= current_date + 1
);


-- Allow users to update weights today and prior to
create policy "Users can update their own weight logs"
on public.logged_weight for update to authenticated
using ((select auth.uid()) = user_id)
with check (
    (select auth.uid()) = user_id
    and recorded_on <= current_date + 1
);

-- Allow users to delete their own logs
create policy "Users can delete their own weight logs"
on public.logged_weight for delete to authenticated
using ((select auth.uid()) = user_id);

-- Automatically set the updated date when data changes
create trigger logged_weight_set_updated_at
before update on public.logged_weight
for each row execute function public.set_updated_at();

-- ---------------------------------------
-- Weight now lives here, so remove the old profile columns
-- ---------------------------------------
alter table public.profile
    drop column start_weight,
    drop column curr_weight;