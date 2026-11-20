SELECT
    t.typname AS enum_name,
    e.enumlabel AS enum_value,
    d.deptype AS dependency_type,
    pg_describe_object(d.classid, d.objid, d.objsubid) AS dependent_object
FROM pg_type t
JOIN pg_enum e ON e.enumtypid = t.oid
LEFT JOIN pg_depend d
    ON d.refclassid = 'pg_type'::regclass
   AND d.refobjid = t.oid
   AND d.deptype = 'n'
WHERE t.typname = 'UserStatus'
ORDER BY e.enumsortorder;
