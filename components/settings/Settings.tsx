"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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
import { Lock, Eye } from "lucide-react";
import { PrivacySettings } from "@/types/types";
import { useRouter } from "next/navigation";
import { changePassword, useSession } from "@/lib/auth-client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/common";
import { useActionLock } from "@/hooks";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, " Current password is required"),
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
  const {loading,lock,unlock} = useActionLock()
  const { data: session } = useSession();
  const user = session?.user;

  // Privacy Settings
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    showMemberSince: true,
    showLastActive: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors},
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
    if(!lock())return;
    try {
      const { error } = await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(error.message || "Failed to change password");
        return;
      }
      toast.success("Password updated successfully");
    } catch {
      toast.error("Something went wrong");
    }
    finally{
      unlock()
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background w-full mt-16 font-sans text-gray-800">
      <div className="container max-w-5xl mx-auto py-8 px-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
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
                  <FormInput
                    id="current-password"
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                    showPasswordToggle
                    register={register("currentPassword")}
                    error={errors.currentPassword?.message}
                  />
                  <FormInput
                    id="new-password"
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    showPasswordToggle
                    register={register("newPassword")}
                    error={errors.newPassword?.message}
                  />
                  <FormInput
                    id="confirm-password"
                    label="Confirm New Password"
                    type="password"
                    placeholder="Enter confirm new password"
                    showPasswordToggle
                    register={register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-linear-to-r from-purple-600 via-pink-500 to-red-500 font-medium"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Password"}
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
