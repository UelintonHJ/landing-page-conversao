create table public.registrations (
    id uuid primary key,
    name text not null,
    email text not null,
    created_at timestamptz not null default now(),

    constraint registrations_name_length
        check (char_length(trim(name)) between 2 and 100),

    constraint registrations_email_length
        check (char_length(trim(email)) between 3 and 254),

    constraint registrations_email_unique
        unique (email)
);

alter table public.registrations enable row level security;

revoke all on table public.registrations
from public, anon, authenticated;

grant insert on table public.registrations
to service_role;