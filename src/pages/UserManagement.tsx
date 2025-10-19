import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserRoles, useUserManagement } from "@/hooks/useUserRoles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, UserCog, Crown, User as UserIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserManagement() {
  const { isAdmin, loading: rolesLoading } = useUserRoles();
  const { users, loading, fetchUsers, addRole, removeRole } = useUserManagement();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!rolesLoading && !isAdmin) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
    }
  }, [isAdmin, rolesLoading, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const handleAddRole = async (userId: string, role: string) => {
    try {
      await addRole(userId, role as any);
      toast({
        title: "Role Added",
        description: `Successfully added ${role} role`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add role",
        variant: "destructive",
      });
    }
  };

  const handleRemoveRole = async (userId: string, role: string) => {
    try {
      await removeRole(userId, role as any);
      toast({
        title: "Role Removed",
        description: `Successfully removed ${role} role`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove role",
        variant: "destructive",
      });
    }
  };

  if (rolesLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-cyber-purple" />
      </div>
    );
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-3 h-3" />;
      case 'moderator':
        return <Shield className="w-3 h-3" />;
      default:
        return <UserIcon className="w-3 h-3" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'moderator':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <UserCog className="w-8 h-8 text-cyber-purple" />
            <div>
              <CardTitle className="text-2xl">User Management</CardTitle>
              <CardDescription>Manage users and their roles</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.display_name || 'Unknown'}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap">
                      {user.roles.map((role) => (
                        <Badge
                          key={role}
                          variant="outline"
                          className={getRoleColor(role)}
                        >
                          {getRoleIcon(role)}
                          <span className="ml-1">{role}</span>
                          <button
                            onClick={() => handleRemoveRole(user.id, role)}
                            className="ml-1 hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Select onValueChange={(role) => handleAddRole(user.id, role)}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Add role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
