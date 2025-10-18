export type UserRole = 'admin' | 'moderator' | 'chef' | 'driver' | 'customer';

export type Permission =
  | 'canViewAllUsers'
  | 'canEditAnyUser'
  | 'canDeleteAnyUser'
  | 'canBanUsers'
  | 'canModerateContent'
  | 'canManageChefs'
  | 'canManageDrivers'
  | 'canEditOwnProfile'
  | 'canDeleteOwnAccount';

const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    'canViewAllUsers',
    'canEditAnyUser',
    'canDeleteAnyUser',
    'canBanUsers',
    'canModerateContent',
    'canManageChefs',
    'canManageDrivers',
    'canEditOwnProfile',
    'canDeleteOwnAccount',
  ],
  moderator: [
    'canModerateContent',
    'canManageChefs',
    'canManageDrivers',
    'canEditOwnProfile',
  ],
  chef: ['canEditOwnProfile', 'canDeleteOwnAccount'],
  driver: ['canEditOwnProfile', 'canDeleteOwnAccount'],
  customer: ['canEditOwnProfile', 'canDeleteOwnAccount'],
};

export function hasPermission(roles: UserRole | UserRole[], permission: Permission): boolean {
  const roleArray = Array.isArray(roles) ? roles : [roles];
  return roleArray.some(role => rolePermissions[role]?.includes(permission) ?? false);
}

export function hasAnyPermission(roles: UserRole | UserRole[], permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(roles, permission));
}

export function hasAllPermissions(roles: UserRole | UserRole[], permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(roles, permission));
}

export function getUserPrimaryRole(roles: UserRole[]): UserRole {
  // Priority: admin > moderator > chef > driver > customer
  if (roles.includes('admin')) return 'admin';
  if (roles.includes('moderator')) return 'moderator';
  if (roles.includes('chef')) return 'chef';
  if (roles.includes('driver')) return 'driver';
  return 'customer';
}

export function getAllPermissions(roles: UserRole[]): Permission[] {
  const allPerms = new Set<Permission>();
  roles.forEach(role => {
    rolePermissions[role]?.forEach(perm => allPerms.add(perm));
  });
  return Array.from(allPerms);
}
