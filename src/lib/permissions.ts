
export type UserRole = 'admin' | 'moderator' | 'chef' | 'driver' | 'customer';

export interface Permission {
  canBanUsers: boolean;
  canEditProfiles: boolean;
  canDeleteProfiles: boolean;
  canEditDishes: boolean;
  canDeleteDishes: boolean;
  canManageOrders: boolean;
  canViewAnalytics: boolean;
  canManageChefs: boolean;
  canManageDrivers: boolean;
  canViewAllUsers: boolean;
  canModerateContent: boolean;
}

export const getPermissions = (role: UserRole): Permission => {
  switch (role) {
    case 'admin':
      return {
        canBanUsers: true,
        canEditProfiles: true,
        canDeleteProfiles: true,
        canEditDishes: true,
        canDeleteDishes: true,
        canManageOrders: true,
        canViewAnalytics: true,
        canManageChefs: true,
        canManageDrivers: true,
        canViewAllUsers: true,
        canModerateContent: true,
      };
    case 'moderator':
      return {
        canBanUsers: true,
        canEditProfiles: false,
        canDeleteProfiles: false,
        canEditDishes: true,
        canDeleteDishes: false,
        canManageOrders: false,
        canViewAnalytics: true,
        canManageChefs: false,
        canManageDrivers: false,
        canViewAllUsers: true,
        canModerateContent: true,
      };
    case 'chef':
      return {
        canBanUsers: false,
        canEditProfiles: false,
        canDeleteProfiles: false,
        canEditDishes: true,
        canDeleteDishes: true,
        canManageOrders: true,
        canViewAnalytics: false,
        canManageChefs: false,
        canManageDrivers: false,
        canViewAllUsers: false,
        canModerateContent: false,
      };
    case 'driver':
      return {
        canBanUsers: false,
        canEditProfiles: false,
        canDeleteProfiles: false,
        canEditDishes: false,
        canDeleteDishes: false,
        canManageOrders: true,
        canViewAnalytics: false,
        canManageChefs: false,
        canManageDrivers: false,
        canViewAllUsers: false,
        canModerateContent: false,
      };
    default: // customer
      return {
        canBanUsers: false,
        canEditProfiles: false,
        canDeleteProfiles: false,
        canEditDishes: false,
        canDeleteDishes: false,
        canManageOrders: false,
        canViewAnalytics: false,
        canManageChefs: false,
        canManageDrivers: false,
        canViewAllUsers: false,
        canModerateContent: false,
      };
  }
};

export const hasPermission = (role: UserRole, permission: keyof Permission): boolean => {
  const permissions = getPermissions(role);
  return permissions[permission] || false;
};
