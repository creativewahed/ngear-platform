-- Create databases for different services
CREATE DATABASE ngear_auth;
CREATE DATABASE ngear_tenant;
CREATE DATABASE ngear_user;
CREATE DATABASE ngear_config;
CREATE DATABASE ngear_wallet;
CREATE DATABASE ngear_rewards;
CREATE DATABASE ngear_analytics;

-- Create users with appropriate permissions
CREATE USER ngear_auth_user WITH PASSWORD 'auth_password';
CREATE USER ngear_tenant_user WITH PASSWORD 'tenant_password';
CREATE USER ngear_user_user WITH PASSWORD 'user_password';
CREATE USER ngear_config_user WITH PASSWORD 'config_password';
CREATE USER ngear_wallet_user WITH PASSWORD 'wallet_password';
CREATE USER ngear_rewards_user WITH PASSWORD 'rewards_password';
CREATE USER ngear_analytics_user WITH PASSWORD 'analytics_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE ngear_auth TO ngear_auth_user;
GRANT ALL PRIVILEGES ON DATABASE ngear_tenant TO ngear_tenant_user;
GRANT ALL PRIVILEGES ON DATABASE ngear_user TO ngear_user_user;
GRANT ALL PRIVILEGES ON DATABASE ngear_config TO ngear_config_user;
GRANT ALL PRIVILEGES ON DATABASE ngear_wallet TO ngear_wallet_user;
GRANT ALL PRIVILEGES ON DATABASE ngear_rewards TO ngear_rewards_user;
GRANT ALL PRIVILEGES ON DATABASE ngear_analytics TO ngear_analytics_user;