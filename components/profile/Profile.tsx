/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useUploadThing } from "@/lib/uploadthing";
import { useActionLock } from "@/hooks";

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;
  const { startUpload } = useUploadThing("profileImage");

  // Server-backed fields
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");

  // UI-only state
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { loading, lock, unlock } = useActionLock();

  // Local-only fields
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [lastActive, setLastActive] = useState<string>("");

  // LocalStorage helpers
  const loadLocalData = () => {
    const stored = localStorage.getItem("userLocalData");
    return stored ? JSON.parse(stored) : {};
  };

  const saveLocalData = (data: any) => {
    localStorage.setItem("userLocalData", JSON.stringify(data));
  };

  // Initialize server and local fields
  useEffect(() => {
    if (!user) return;

    // Server fields
    setName(user.name || "");
    setImageUrl(user.image || "");
    // Local fields
    const now = new Date().toLocaleString();
    const data = loadLocalData();

    setBio(data.bio || "");
    setWebsite(data.website || "");
    setTwitter(data.twitter || "");
    setGithub(data.github || "");
    setLinkedin(data.linkedin || "");
    setInstagram(data.instagram || "");

    setLastActive(now);
    saveLocalData({ ...data, lastActive: now });
  }, [user]);

  // Save local-only fields to localStorage
  useEffect(() => {
    const localData = {
      bio,
      website,
      twitter,
      github,
      linkedin,
      instagram,
      lastActive,
    };
    saveLocalData(localData);
  }, [bio, website, twitter, github, linkedin, instagram, lastActive]);

  if (!user) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    const MAX_FILE_SIZE_MB = 4;
    const fileSizeMB = file.size / 1024 / 1024;
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      toast.error(`File is too large! Max size is ${MAX_FILE_SIZE_MB}MB.`);
      e.target.value = ""; // reset the input
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const uploadedFiles = await startUpload([file]); // returns array of uploaded file objects
      // uploadedFiles[0].url contains the public URL
      if (uploadedFiles && uploadedFiles.length > 0) {
        setImageUrl(uploadedFiles[0]?.ufsUrl);
      }
    } catch {
      toast.error("Image upload failed");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  // Update server fields
  const handleUpdate = async () => {
    if (!lock()) return;
    try {
      await updateUser({
        name,
        image: imageUrl,
      });
      toast.success("Profile updated 🎉", {
        description:
          "Your name and profile picture have been updated successfully.",
      });
    } catch (err) {
      toast.error("Error updating profile", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      unlock();
    }
  };

  return (
    <main className="min-h-screen bg-background w-full font-sans mt-16 text-gray-800">
      <div className="container max-w-4xl mx-auto py-10 px-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Profile
          </h1>
          <Button
            variant="outline"
            onClick={() => router.push("/sleep-tracker")}
            className="border-border/60 cursor-pointer"
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
              <Avatar className="h-32 w-32 ">
                <AvatarImage src={preview || imageUrl} alt={name} />
                {!preview && !imageUrl && (
                  <AvatarFallback className="text-3xl font-medium">
                    {name[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                )}

                {/* Spinner overlay while uploading */}
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                    <span className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full opacity-80"></span>
                  </div>
                )}

                <label
                  htmlFor="profile-upload"
                  aria-label="Upload Profile Picture"
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
              </Avatar>
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
                    <Badge variant="outline" className="gap-1 text-green-700">
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
                  <p className="text-sm text-muted-foreground">{lastActive}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
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
          className="w-full bg-linear-to-r from-purple-600 via-pink-500 to-red-500 text-white cursor-pointer"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </main>
  );
}
