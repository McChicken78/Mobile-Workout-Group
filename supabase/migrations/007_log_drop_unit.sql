-- Weight logs are now always stored in lb; the app converts for display using profile.unit
alter table public.logged_weight
drop column unit;
