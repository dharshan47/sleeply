"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Settings } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

export default function UserButton() {
  const router = useRouter();
  const { data: session } = useSession();

  const user = session?.user
    ? {
        ...session.user,
        image: session.user.image || undefined, 
      }
    : null;
    
  if (!user) {
    return (
      <Button
        variant="default" 
        onClick={() => router.push("/login")}
        className="font-medium bg-gradient-to-r from-purple-600 via-pink-500 to-red-500"
      >
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 relative overflow-visible">
          <Avatar className="h-8 w-8">
            {user.image ? (
              <AvatarImage src={user?.image} alt={user.name || "User"} />
            ) : (
              <AvatarFallback>
                <User className="w-4 h-4" />
              </AvatarFallback>
            )}
          </Avatar>
          <span className="hidden sm:inline text-sm font-medium">
            {user.name || "User"}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="text-sm font-semibold flex items-center gap-3 ">
          <Avatar className="h-9 w-9">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.name || "User"} />
            ) : (
              <AvatarFallback>
                {user.name?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col ">
            <span className="font-medium">{user.name || "User"}</span>
            <span className="text-xs font-normal text-muted-foreground truncate ">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push("/profile")}
          className="flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/settings")}
          className="flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={async () => {
            await signOut();
            router.push("/login");
          }}
          className="flex items-center gap-2 text-red-600 font-medium"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
