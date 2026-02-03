import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import logoUrl from "@assets/logo_1769031259580.png";
import { mockUsers } from "@/lib/mock-data";

const THEME_PRIMARY = "#1E9AD6";

const roleColors: Record<string, string> = {
  admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  instructor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  student: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

export default function AdminUsers() {
  const { user, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "student",
  });

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setLocation("/admin/login");
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !filterRole || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    if (!newUser.username || !newUser.email || !newUser.firstName) return;
    
    const newId = Math.max(...users.map(u => u.id)) + 1;
    setUsers([...users, {
      id: newId,
      ...newUser,
      isActive: true,
      createdAt: new Date().toISOString(),
    }]);
    setShowAddModal(false);
    setNewUser({ username: "", email: "", firstName: "", lastName: "", role: "student" });
    alert("User created successfully!");
  };

  const handleDeleteUser = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
      alert("User deleted successfully!");
    }
  };

  const handleToggleActive = (id: number) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, isActive: !u.isActive } : u
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="Univaciti" className="h-10 w-10 rounded-full" />
              <div>
                <span className="font-bold text-lg" style={{ color: THEME_PRIMARY }}>Univaciti</span>
                <span className="text-xs block text-muted-foreground">Admin Portal</span>
              </div>
            </div>
            
            <nav className="flex items-center gap-6">
              <Link href="/admin/dashboard">
                <span className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Dashboard</span>
              </Link>
              <Link href="/admin/courses">
                <span className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Courses</span>
              </Link>
              <Link href="/admin/users">
                <span className="text-sm font-medium" style={{ color: THEME_PRIMARY }}>Users</span>
              </Link>
              <Link href="/admin/enrollments">
                <span className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Enrollments</span>
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user?.firstName || user?.username}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Users</h1>
            <p className="text-muted-foreground">Manage student and instructor accounts</p>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="text-white"
            style={{ backgroundColor: THEME_PRIMARY }}
          >
            Add User
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
            <option value="student">Student</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-muted-foreground border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Joined</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <p className="font-medium">{u.firstName} {u.lastName}</p>
                    <p className="text-xs text-muted-foreground">@{u.username}</p>
                  </td>
                  <td className="px-6 py-4 text-sm">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-medium capitalize ${roleColors[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleActive(u.id)}
                      className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                        u.isActive
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {u.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No users found</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Students</p>
            <p className="text-2xl font-bold">{users.filter(u => u.role === "student").length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Instructors</p>
            <p className="text-2xl font-bold">{users.filter(u => u.role === "instructor").length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold">{users.filter(u => u.isActive).length}</p>
          </div>
        </div>
      </main>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">First Name</label>
                <Input
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Last Name</label>
                <Input
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Username</label>
                <Input
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleAddUser} 
                className="flex-1 text-white"
                style={{ backgroundColor: THEME_PRIMARY }}
              >
                Add User
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
