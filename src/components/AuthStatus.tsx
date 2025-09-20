import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export const AuthStatus = () => {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return <div className="text-gray-400">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <User className="h-4 w-4 text-green-400" />
      <span className="text-white">{user.full_name}</span>
      <span className="text-gray-400">({user.user_type})</span>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={signOut}
        className="text-gray-400 hover:text-white"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
};