export interface AuditLog {
  id: string;
  userId: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'export';
  entityType: 'user' | 'course' | 'module' | 'setting' | 'system';
  entityId?: string;
  details: any;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

export interface AuditFilter {
  startDate?: Date;
  endDate?: Date;
  action?: string;
  entityType?: string;
  userId?: string;
}

export interface AuditStats {
  totalActions: number;
  actionsByType: Record<string, number>;
  actionsByUser: Record<string, number>;
  recentActivity: AuditLog[];
}