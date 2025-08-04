-- Create database if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'ngear_platform') THEN
        CREATE DATABASE ngear_platform;
    END IF;
END
$$;

-- Connect to the database
\c ngear_platform;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE ngear_platform TO ngear_user;