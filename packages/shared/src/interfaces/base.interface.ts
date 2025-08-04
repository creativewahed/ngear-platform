export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantAwareEntity extends BaseEntity {
  tenantId: string;
}

export interface SoftDeletableEntity extends BaseEntity {
  deletedAt?: Date;
}