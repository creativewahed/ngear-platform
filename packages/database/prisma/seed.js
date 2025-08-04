"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Temporary utility class for password hashing (should use @ngear/shared when properly configured)
class TempUtils {
    static async hashPassword(password) {
        const bcrypt = require('bcrypt');
        const saltRounds = 12;
        return bcrypt.hash(password, saltRounds);
    }
}
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seed...');
    // Create system tenant
    const systemTenant = await prisma.tenant.upsert({
        where: { subdomain: 'system' },
        update: {},
        create: {
            name: 'System',
            subdomain: 'system',
            status: 'ACTIVE',
            plan: 'ENTERPRISE',
            settings: {
                branding: {
                    theme: 'dark',
                    primaryColor: '#3B82F6',
                    secondaryColor: '#1E40AF',
                },
                features: {
                    maxUsers: 1000,
                    maxApiCalls: 1000000,
                    advancedAnalytics: true,
                    customIntegrations: true,
                },
                compliance: {
                    gdprEnabled: true,
                    soc2Compliant: true,
                    pciDssCompliant: true,
                },
            },
        },
    });
    // Create demo tenant
    const demoTenant = await prisma.tenant.upsert({
        where: { subdomain: 'demo' },
        update: {},
        create: {
            name: 'Demo Company',
            subdomain: 'demo',
            status: 'ACTIVE',
            plan: 'PROFESSIONAL',
            settings: {
                branding: {
                    theme: 'light',
                    primaryColor: '#10B981',
                    secondaryColor: '#059669',
                },
                features: {
                    maxUsers: 100,
                    maxApiCalls: 100000,
                    advancedAnalytics: true,
                    customIntegrations: false,
                },
                compliance: {
                    gdprEnabled: true,
                    soc2Compliant: false,
                    pciDssCompliant: false,
                },
            },
        },
    });
    // Create system roles
    const adminRole = await prisma.role.upsert({
        where: {
            tenantId_name: {
                tenantId: systemTenant.id,
                name: 'System Admin',
            },
        },
        update: {},
        create: {
            tenantId: systemTenant.id,
            name: 'System Admin',
            description: 'Full system administration access',
            isSystemRole: true,
        },
    });
    const platformAdminRole = await prisma.role.upsert({
        where: {
            tenantId_name: {
                tenantId: demoTenant.id,
                name: 'Platform Admin',
            },
        },
        update: {},
        create: {
            tenantId: demoTenant.id,
            name: 'Platform Admin',
            description: 'Platform administration access',
            isSystemRole: false,
        },
    });
    // Create permissions
    const permissions = [
        { resource: 'tenant', action: 'create' },
        { resource: 'tenant', action: 'read' },
        { resource: 'tenant', action: 'update' },
        { resource: 'tenant', action: 'delete' },
        { resource: 'user', action: 'create' },
        { resource: 'user', action: 'read' },
        { resource: 'user', action: 'update' },
        { resource: 'user', action: 'delete' },
        { resource: 'role', action: 'create' },
        { resource: 'role', action: 'read' },
        { resource: 'role', action: 'update' },
        { resource: 'role', action: 'delete' },
        { resource: 'api-integration', action: 'create' },
        { resource: 'api-integration', action: 'read' },
        { resource: 'api-integration', action: 'update' },
        { resource: 'api-integration', action: 'delete' },
        { resource: 'reward-rule', action: 'create' },
        { resource: 'reward-rule', action: 'read' },
        { resource: 'reward-rule', action: 'update' },
        { resource: 'reward-rule', action: 'delete' },
        { resource: 'wallet', action: 'create' },
        { resource: 'wallet', action: 'read' },
        { resource: 'wallet', action: 'update' },
        { resource: 'wallet', action: 'delete' },
        { resource: 'analytics', action: 'read' },
    ];
    for (const tenant of [systemTenant, demoTenant]) {
        for (const perm of permissions) {
            await prisma.permission.upsert({
                where: {
                    tenantId_resource_action: {
                        tenantId: tenant.id,
                        resource: perm.resource,
                        action: perm.action,
                    },
                },
                update: {},
                create: {
                    tenantId: tenant.id,
                    resource: perm.resource,
                    action: perm.action,
                    conditions: {},
                },
            });
        }
    }
    // Create system admin user
    const hashedPassword = await TempUtils.hashPassword('admin123!');
    const systemAdmin = await prisma.user.upsert({
        where: {
            tenantId_email: {
                tenantId: systemTenant.id,
                email: 'admin@ngear.com',
            },
        },
        update: {},
        create: {
            tenantId: systemTenant.id,
            email: 'admin@ngear.com',
            firstName: 'System',
            lastName: 'Administrator',
            password: hashedPassword,
            status: 'ACTIVE',
            profile: {
                timezone: 'UTC',
                language: 'en',
                preferences: {},
            },
        },
    });
    // Create demo admin user
    const demoAdmin = await prisma.user.upsert({
        where: {
            tenantId_email: {
                tenantId: demoTenant.id,
                email: 'demo@demo.com',
            },
        },
        update: {},
        create: {
            tenantId: demoTenant.id,
            email: 'demo@demo.com',
            firstName: 'Demo',
            lastName: 'User',
            password: hashedPassword,
            status: 'ACTIVE',
            profile: {
                timezone: 'America/New_York',
                language: 'en',
                preferences: {},
            },
        },
    });
    // Assign roles to users
    await prisma.userRole.upsert({
        where: {
            userId_roleId: {
                userId: systemAdmin.id,
                roleId: adminRole.id,
            },
        },
        update: {},
        create: {
            userId: systemAdmin.id,
            roleId: adminRole.id,
        },
    });
    await prisma.userRole.upsert({
        where: {
            userId_roleId: {
                userId: demoAdmin.id,
                roleId: platformAdminRole.id,
            },
        },
        update: {},
        create: {
            userId: demoAdmin.id,
            roleId: platformAdminRole.id,
        },
    });
    // Create sample reward rules
    await prisma.rewardRule.upsert({
        where: { id: 'sample-purchase-rule' },
        update: {},
        create: {
            id: 'sample-purchase-rule',
            tenantId: demoTenant.id,
            name: 'Purchase Reward',
            description: 'Award points for purchases',
            conditions: [
                {
                    field: 'transaction.type',
                    operator: 'eq',
                    value: 'purchase',
                },
                {
                    field: 'transaction.amount',
                    operator: 'gte',
                    value: 10,
                },
            ],
            actions: [
                {
                    type: 'award_points',
                    parameters: {
                        amount: 100,
                        currency: 'POINTS',
                    },
                },
            ],
            status: 'ACTIVE',
            priority: 1,
        },
    });
    console.log('✅ Database seed completed successfully!');
    console.log('System Admin: admin@ngear.com / admin123!');
    console.log('Demo User: demo@demo.com / admin123!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
