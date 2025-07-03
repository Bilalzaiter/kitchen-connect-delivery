
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPermissions } from '@/lib/permissions';

const Dashboard = () => {
  const { profile } = useAuth();

  if (!profile) {
    return <div>Loading...</div>;
  }

  const userRole = profile.role as 'admin' | 'moderator' | 'chef' | 'driver' | 'customer';
  const permissions = getPermissions(userRole);

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
            <CardTitle className="text-sm font-medium">Your Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge className={`${getRoleBadgeColor(profile.role)} text-white capitalize`}>
                {profile.role}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {profile.role === 'admin' && 'Full system access'}
              {profile.role === 'moderator' && 'Content moderation access'}
              {profile.role === 'chef' && 'Kitchen management access'}
              {profile.role === 'driver' && 'Delivery management access'}
              {profile.role === 'customer' && 'Customer portal access'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(permissions).filter(Boolean).length}
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
      {(profile.role === 'admin' || profile.role === 'moderator') && (
        <Card>
          <CardHeader>
            <CardTitle>Your Permissions</CardTitle>
            <CardDescription>
              Overview of your current access level and capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(permissions).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className={`text-sm ${value ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
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
