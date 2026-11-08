-- The only allowed weight units
create type public.weight_unit as enum ('lb', 'kg');

alter table public.profile
add column unit public.weight_unit not null default 'lb';

-- 001 only lets users update specific columns, so the new one has to be allowed too
grant update(unit) on public.profile to authenticated;
