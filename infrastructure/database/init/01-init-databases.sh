#!/bin/bash
set -e

# Create databases for different services
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE ngear_auth;
    CREATE DATABASE ngear_tenant;
    CREATE DATABASE ngear_user;
    CREATE DATABASE ngear_analytics;
    
    -- Create a read-only user for analytics
    CREATE USER analytics_reader WITH PASSWORD 'analytics_pass';
    GRANT CONNECT ON DATABASE ngear_analytics TO analytics_reader;
    GRANT USAGE ON SCHEMA public TO analytics_reader;
    GRANT SELECT ON ALL TABLES IN SCHEMA public TO analytics_reader;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO analytics_reader;
    
    GRANT ALL PRIVILEGES ON DATABASE ngear_auth TO postgres;
    GRANT ALL PRIVILEGES ON DATABASE ngear_tenant TO postgres;
    GRANT ALL PRIVILEGES ON DATABASE ngear_user TO postgres;
    GRANT ALL PRIVILEGES ON DATABASE ngear_analytics TO postgres;
EOSQL