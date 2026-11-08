alter table public.profile
    add column start_weight numeric(5,1) check (start_weight > 0 and start_weight < 1500),
    add column curr_weight  numeric(5,1) check (curr_weight > 0 and curr_weight < 1500);

-- 001 only lets users update specific columns, so the new ones have to be allowed too
grant update(start_weight, curr_weight) on public.profile to authenticated;
