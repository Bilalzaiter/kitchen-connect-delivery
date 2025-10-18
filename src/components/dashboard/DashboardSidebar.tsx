
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  User, 
  Users, 
  Settings, 
  ChefHat, 
  Bike, 
  LayoutDashboard, 
  Shield,
  Ban
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import { hasPermission } from '@/lib/permissions';

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { profile } = useAuth();
  const currentPath = location.pathname;

  if (!profile) return null;

  const isCollapsed = state === 'collapsed';
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-brand-orange/10 text-brand-orange font-medium" : "hover:bg-muted/50";

  const userRoles = profile.roles || ['customer'];

  const mainNavItems = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Profile', url: '/dashboard/profile', icon: User },
  ];

  const adminNavItems = [
    { title: 'All Users', url: '/dashboard/users', icon: Users, permission: 'canViewAllUsers' },
    { title: 'Moderation', url: '/dashboard/moderation', icon: Shield, permission: 'canModerateContent' },
    { title: 'Bans', url: '/dashboard/bans', icon: Ban, permission: 'canBanUsers' },
  ];

  const roleNavItems = [
    { title: 'Chefs', url: '/dashboard/chefs', icon: ChefHat, permission: 'canManageChefs' },
    { title: 'Drivers', url: '/dashboard/drivers', icon: Bike, permission: 'canManageDrivers' },
  ];

  const settingsNavItems = [
    { title: 'Settings', url: '/dashboard/settings', icon: Settings },
  ];

  const renderNavItems = (items: any[], title?: string) => {
    const filteredItems = items.filter(item => 
      !item.permission || hasPermission(userRoles as any, item.permission as any)
    );

    if (filteredItems.length === 0) return null;

    return (
      <SidebarGroup>
        {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
        <SidebarGroupContent>
          <SidebarMenu>
            {filteredItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink to={item.url} end className={getNavCls}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {renderNavItems(mainNavItems, "Main")}
        {renderNavItems(adminNavItems, "Administration")}
        {renderNavItems(roleNavItems, "Management")}
        {renderNavItems(settingsNavItems)}
      </SidebarContent>
    </Sidebar>
  );
}
