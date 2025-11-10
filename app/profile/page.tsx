"use client";

import React, { useState, useEffect } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Calendar,
  Activity,
  Check,
  X,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  const [name, setName] = useState(user?.name || "");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

  // ✅ Local-only fields (stored in localStorage)
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [lastActive, setLastActive] = useState<string>("");

  // 🧠 Load from localStorage when component mounts
  useEffect(() => {
  const now = new Date().toLocaleString();

  // Load other local data
  const stored = localStorage.getItem("userLocalData");
  const data = stored ? JSON.parse(stored) : {};
  setBio(data.bio || "");
  setWebsite(data.website || "");
  setTwitter(data.twitter || "");
  setGithub(data.github || "");
  setLinkedin(data.linkedin || "");
  setInstagram(data.instagram || "");

  // Update lastActive in state and localStorage immediately
  setLastActive(now);
  data.lastActive = now;
  localStorage.setItem("userLocalData", JSON.stringify(data));
}, []);


  // 💾 Save to localStorage when any local-only field changes
  useEffect(() => {
    const localData = { bio, website, twitter, github, linkedin, instagram,lastActive };
    localStorage.setItem("userLocalData", JSON.stringify(localData));
  }, [bio, website, twitter, github, linkedin, instagram,lastActive]);

  if (!user) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      let uploadedImageUrl = preview;

      if (profileImage) {
        const formData = new FormData();
        formData.append("file", profileImage);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        uploadedImageUrl = data.url;
      }

      await updateUser({
        name,
        image: uploadedImageUrl,
      });

      toast.success("Profile updated 🎉", {
        description:
          "Your name and profile picture have been updated successfully.",
      });
    } catch {
      toast.error("Error updating profile", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background w-full font-sans mt-16 text-gray-800">
      <div className="container max-w-4xl mx-auto py-10 px-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Profile
          </h1>
          <Button
            variant="outline"
            onClick={() => router.push("/sleep-tracker")}
            className="border-border/60"
          >
            Back
          </Button>
        </div>

        {/* Profile Picture */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Upload your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <Avatar className="h-32 w-32">
                {preview ? (
                  <AvatarImage src={preview} alt={name} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-r from-purple-600  via-pink-500 to-red-500 text-white text-4xl">
                    {name[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              <label
                htmlFor="profile-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                <Camera className="h-8 w-8 text-white" />
              </label>
              <input
                type="file"
                accept="image/*"
                id="profile-upload"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Click to upload a new profile picture
            </p>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Manage your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  Email
                  {user.emailVerified ? (
                    <Badge
                    variant="outline" className="gap-1 text-green-700">
                      <Check className="h-3 w-3" /> Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="gap-1 text-red-500">
                      <X className="h-3 w-3" /> Not Verified
                    </Badge>
                  )}
                </Label>
                <Input
                  id="email"
                  value={user.email}
                  readOnly
                  className="bg-muted cursor-not-allowed"
                />
              </div>
            </div>

            {/* Local-only Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio </Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell something about yourself"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Activity className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Last Active</p>
                  <p className="text-sm text-muted-foreground">
                    {lastActive}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Local-only Social Links */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Social Links </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">
                  <LinkIcon className="inline h-4 w-4 mr-1 -mt-1" /> Website
                </Label>
                <Input
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleUpdate}
          size="lg"
          className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </div>
  );
}
