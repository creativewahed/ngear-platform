import { PrismaClient } from '@prisma/client';

// Types (temporary definitions until @ngear/types is properly integrated)
export interface User {
  id: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  status: string;
  profile: any;
  createdAt: Date;
  updatedAt: Date;
  roles?: any[];
  permissions?: any[];
}

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  status: string;
  plan: string;
  settings: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: any[];
  tenantId: string;
  isSystemRole: boolean;
}

export interface Permission {
  id: string;
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export class DatabaseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async connect(): Promise<void> {
    await this.prisma.$connect();
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }

  async health(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      return false;
    }
  }

  // Tenant operations
  async createTenant(data: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tenant> {
    return this.prisma.tenant.create({
      data: {
        name: data.name,
        subdomain: data.subdomain,
        status: data.status,
        plan: data.plan,
        settings: data.settings as any,
      },
    }) as any;
  }

  async getTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
    return this.prisma.tenant.findUnique({
      where: { subdomain },
    }) as any;
  }

  async getTenantById(id: string): Promise<Tenant | null> {
    return this.prisma.tenant.findUnique({
      where: { id },
    }) as any;
  }

  async updateTenant(id: string, data: Partial<Tenant>): Promise<Tenant> {
    return this.prisma.tenant.update({
      where: { id },
      data: {
        ...data,
        settings: data.settings as any,
      },
    }) as any;
  }

  // User operations
  async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return this.prisma.user.create({
      data: {
        tenantId: data.tenantId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        status: data.status,
        profile: data.profile as any,
      },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    }) as any;
  }

  async getUserByEmail(tenantId: string, email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        tenantId_email: {
          tenantId,
          email,
        },
      },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    }) as any;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    }) as any;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        profile: data.profile as any,
      },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    }) as any;
  }

  // Role operations
  async createRole(data: Omit<Role, 'id'>): Promise<Role> {
    return this.prisma.role.create({
      data,
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    }) as any;
  }

  async getRolesByTenant(tenantId: string): Promise<Role[]> {
    return this.prisma.role.findMany({
      where: { tenantId },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    }) as any;
  }

  // Session operations
  async createSession(userId: string, token: string, expiresAt: Date) {
    return this.prisma.userSession.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  async getSession(token: string) {
    return this.prisma.userSession.findUnique({
      where: { token },
      include: {
        user: {
          include: {
            tenant: true,
            roles: {
              include: {
                role: {
                  include: {
                    permissions: {
                      include: {
                        permission: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async deleteSession(token: string) {
    return this.prisma.userSession.delete({
      where: { token },
    });
  }

  async cleanupExpiredSessions() {
    return this.prisma.userSession.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  // Analytics operations
  async createAnalyticsEvent(data: {
    tenantId: string;
    userId?: string;
    eventType: string;
    properties: Record<string, any>;
    sessionId?: string;
  }) {
    return this.prisma.analyticsEvent.create({
      data: {
        ...data,
        properties: data.properties as any,
      },
    });
  }

  async getAnalyticsEvents(tenantId: string, filters: any = {}) {
    return this.prisma.analyticsEvent.findMany({
      where: {
        tenantId,
        ...filters,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  // Audit log operations
  async createAuditLog(data: {
    userId: string;
    tenantId: string;
    action: string;
    resource: string;
    resourceId?: string;
    oldValues?: any;
    newValues?: any;
    metadata?: any;
  }) {
    return this.prisma.auditLog.create({
      data: {
        ...data,
        oldValues: data.oldValues as any,
        newValues: data.newValues as any,
        metadata: data.metadata as any,
      },
    });
  }

  // Wallet operations
  async createWallet(userId: string, tenantId: string, type: any = 'PREPAID') {
    return this.prisma.wallet.create({
      data: {
        userId,
        tenantId,
        type,
        balances: [],
      },
    });
  }

  async getWalletByUser(userId: string) {
    return this.prisma.wallet.findFirst({
      where: { userId },
      include: {
        transactions: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
      },
    });
  }

  async createTransaction(data: {
    walletId: string;
    tenantId: string;
    type: any;
    amount: number;
    currency: string;
    description: string;
    metadata?: any;
  }) {
    return this.prisma.transaction.create({
      data: {
        ...data,
        metadata: data.metadata as any,
      },
    });
  }

  get client() {
    return this.prisma;
  }
}

export const db = new DatabaseService();