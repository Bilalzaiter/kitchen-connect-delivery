import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getUserPrimaryRole, getAllPermissions } from '@/lib/permissions';

const Dashboard = () => {
  const { profile } = useAuth();

  if (!profile) {
    return <div>Loading...</div>;
  }

  const userRoles = profile.roles || ['customer'];
  const primaryRole = getUserPrimaryRole(userRoles as any);
  const permissions = getAllPermissions(userRoles as any);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'moderator': return 'bg-yellow-500';
      case 'chef': return 'bg-brand-orange';
      case 'driver': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {profile.first_name}!</h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening on your platform today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userRoles.map((role) => (
                <Badge key={role} className={`${getRoleBadgeColor(role)} text-white capitalize`}>
                  {role}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {primaryRole === 'admin' && 'Full system access'}
              {primaryRole === 'moderator' && 'Content moderation access'}
              {primaryRole === 'chef' && 'Kitchen management access'}
              {primaryRole === 'driver' && 'Delivery management access'}
              {primaryRole === 'customer' && 'Customer portal access'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {permissions.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Active permissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="text-green-600 border-green-600">
              Active
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              Account is in good standing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Permissions Overview */}
      {(userRoles.includes('admin') || userRoles.includes('moderator')) && (
        <Card>
          <CardHeader>
            <CardTitle>Your Permissions</CardTitle>
            <CardDescription>
              Overview of your current access level and capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {permissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm text-foreground">
                    {permission.replace(/([A-Z])/g, ' $1').replace(/^can/, '').trim()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
