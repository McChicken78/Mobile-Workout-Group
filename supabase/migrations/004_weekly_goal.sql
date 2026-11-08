alter table public.profile
    add column weekly_goal smallint not null default 4
        check (weekly_goal between 1 and 7);

-- 001 only lets users update specific columns, so the new one has to be allowed too
grant update(weekly_goal) on public.profile to authenticated;
