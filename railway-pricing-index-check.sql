SELECT
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
AND indexname IN (
    'PricingEngineAudit_applicationId_key',
    'PricingEngineInferenceLog_applicationId_key',
    'PricingResult_applicationId_key'
)
ORDER BY tablename;
