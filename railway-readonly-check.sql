SELECT
    current_database() AS database_name,
    current_user AS database_user;

SELECT
    (SELECT COUNT(*) FROM public."PricingAuditLog") AS pricing_audit_logs,
    (SELECT COUNT(*) FROM public."Application") AS applications;
