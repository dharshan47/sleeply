"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Eye, EyeOff } from "lucide-react";
import { PrivacySettings } from "@/types/types";
import { useRouter } from "next/navigation";
import { changePassword, useSession } from "@/lib/auth-client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[0-9]/, "Password must contain a number")
      .regex(/[\W_]/, "Password must contain a special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type PasswordData = z.infer<typeof passwordSchema>;

const Settings = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  // Password Change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Privacy Settings
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    showMemberSince: true,
    showLastActive: true,
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
  });

  const [mounted, setMounted] = useState(false);

  // Load privacy settings from localStorage
  useEffect(() => {
    if (!user) return;
    setMounted(true);

    const key = `privacySettings_${user.email || user.id}`; // unique per user
    const saved = localStorage.getItem(key);
    if (saved) {
      setPrivacy(JSON.parse(saved));
    }
  }, [user]);

  // Save privacy settings on change
  useEffect(() => {
    if (!mounted || !user) return;
    const key = `privacySettings_${user.email || user.id}`;
    localStorage.setItem(key, JSON.stringify(privacy));
  }, [privacy, mounted, user]);

  const handleToggle = (key: keyof PrivacySettings, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));
    toast.success("Privacy setting updated");
  };

  const handlePasswordChange = async (data: PasswordData) => {
    try {
      const { error } = await changePassword({
        currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(error.message || "Failed to change password");
        return;
      }
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background w-full mt-16 font-sans text-gray-800">
      <div className="container max-w-5xl mx-auto py-8 px-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Settings
          </h1>
          <Button
            variant="outline"
            onClick={() => router.push("/sleep-tracker")}
          >
            Back
          </Button>
        </div>

        <Tabs defaultValue="privacy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* PRIVACY TAB */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Profile Visibility
                </CardTitle>
                <CardDescription>
                  Enable or disable what information is visible to other users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {(
                  [
                    {
                      id: "showMemberSince",
                      label: "Member Since",
                      desc: "Display when you joined",
                    },
                    {
                      id: "showLastActive",
                      label: "Last Active",
                      desc: "Show your last online time",
                    },
                  ] as const
                ).map(({ id, label, desc }, i) => (
                  <div key={id}>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor={id}>{label}</Label>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                      <Switch
                        id={id}
                        checked={privacy[id]}
                        onCheckedChange={(val) => handleToggle(id, val)}
                      />
                    </div>
                    {i < 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECURITY TAB */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Change Password
                </CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit(handlePasswordChange)}
                  className="space-y-4"
                >
                  <div className="space-y-2 relative">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showCurrent ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showCurrent ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 relative">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        placeholder="Enter new password"
                        {...register("newPassword", {
                          onChange: (e) => setNewPassword(e.target.value),
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showNew ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.newPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 relative">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        placeholder="Confirm new password"
                        {...register("confirmPassword", {
                          onChange: (e) => setConfirmPassword(e.target.value),
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirm ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
