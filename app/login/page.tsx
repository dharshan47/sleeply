"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.email("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[\W_]/, "Password must contain a special character"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setError("");
    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
      });
      if (result.error) {
        setError(result.error.message || "Login Failed");
      } else {
        router.push("/sleep-tracker");
      }
    } catch (err) {
      setError("An Error occured during Login");
      console.log(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signIn.social({
        provider: "google",
      });
      if (result.error) {
        setError(result.error.message || "Login Failed");
      } else {
        router.push("/sleep-tracker");
      }
    } catch {
      setError("An Error occured during Login");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center w-full p-4 text-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            <FaGoogle />
            Login with Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">
                Or continue with
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                {...register("email", {
                  onChange: (e) => setEmail(e.target.value),
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2 relative">
              <div className="flex justify-between ">
                <Label htmlFor="password">Password</Label>
                <span
                  onClick={() => router.push("/forget-password")}
                  className="text-sm cursor-pointer"
                >
                  Forget password?
                </span>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  {...register("password", {
                    onChange: (e) => setPassword(e.target.value),
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            {error && (
              <div className="bg-destructive/10 p-3 rounded-md text-sm text-destructive">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <div className="text-center text-sm ">
          Don&#39;t have an account?{" "}
          <span
            className="font-bold underline cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </span>
        </div>
      </Card>
    </div>
  );
}
