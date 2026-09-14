begin;

select plan(6);

select ok(
    (
        select relrowsecurity
        from pg_class
        where oid = 'public.registrations'::regclass
    ),
    'RLS is enabled on registrations'
);

select ok(
    not has_table_privilege(
        'anon',
        'public.registrations',
        'SELECT'
    ),
    'anon cannot select registrations'
);

select ok(
    not has_table_privilege(
        'anon',
        'public.registrations',
        'INSERT'
    ),
    'anon cannot insert registrations'
);

select ok(
    not has_table_privilege(
        'authenticated',
        'public.registrations',
        'SELECT'
    ),
    'authenticated cannot select registrations'
);

select ok(
    not has_table_privilege(
        'autheticated',
        'public.registrations',
        'INSERT'
    ),
    'authenticated cannot insert registrations'
);

select ok(
    has_table_privilege(
        'service_role',
        'public.registrations',
        'INSERT'
    ),
    'service_role can insert registrations'
);

select * from finish();

rollback;