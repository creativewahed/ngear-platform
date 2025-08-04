#!/bin/bash

# Create databases for multi-tenancy
echo "Creating databases for NGEAR Platform..."

# Main platform database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create extensions
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS "pg_trgm";
    CREATE EXTENSION IF NOT EXISTS "btree_gin";

    -- Create schemas
    CREATE SCHEMA IF NOT EXISTS platform;
    CREATE SCHEMA IF NOT EXISTS analytics;
    CREATE SCHEMA IF NOT EXISTS audit;

    -- Create platform admin user
    INSERT INTO platform.users (id, email, first_name, last_name, is_active, created_at, updated_at)
    VALUES (uuid_generate_v4(), 'admin@ngear.com', 'Platform', 'Admin', true, NOW(), NOW())
    ON CONFLICT (email) DO NOTHING;

    -- Grant permissions
    GRANT ALL PRIVILEGES ON SCHEMA platform TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON SCHEMA analytics TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON SCHEMA audit TO $POSTGRES_USER;
EOSQL

echo "Database initialization completed."