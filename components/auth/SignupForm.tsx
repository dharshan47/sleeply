"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { FormInput } from "@/components/common";
import { useActionLock, useStatus } from "@/hooks";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name is required"),
    email: z.email("Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[0-9]/, "Password must contain a number")
      .regex(/[\W_]/, "Password must contain a special character"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export default function SignupForm() {
  const {
    error,
    success: isRegistered,
    setError,
    setSuccess: setIsRegistered,
    setSuccessWithTimeout,
  } = useStatus();
  const [registeredEmail, setRegisteredEmail] = useState("");
  const { loading, lock, unlock } = useActionLock();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    if (!lock()) return;
    setError("");
    try {
      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        setError(result.error.message || "Signup Failed");
      } else {
        // ✅ Show verification message instead of redirecting
        setRegisteredEmail(data.email);
        setSuccessWithTimeout(5000);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
    } finally {
      unlock();
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center w-full p-4 text-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            {isRegistered ? "Verify your account" : "Create a new account"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {isRegistered ? (
            <div className="p-4  border border-gray-200  rounded-md text-center">
              ✔️ Thank you for registering!
              <br />
              Please check your email <strong>{registeredEmail}</strong> for a
              verification link to activate your account.
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={`space-y-4 ${loading ? "pointer-events-none " : ""}`}
              >
                <FormInput
                  id="name"
                  label="Name"
                  type="name"
                  placeholder="Enter your name"
                  showPasswordToggle
                  register={register("name")}
                  error={errors.name?.message}
                />

                <FormInput
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  showPasswordToggle
                  register={register("email")}
                  error={errors.email?.message}
                />
                <FormInput
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  showPasswordToggle
                  register={register("password")}
                  error={errors.password?.message}
                />

                <FormInput
                  id="confirm-password"
                  label="Confirm Password"
                  type="password"
                  placeholder="Enter your confirm password"
                  showPasswordToggle
                  register={register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                />

                {error && (
                  <div className="bg-destructive/10 p-3 rounded-md text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>
              </form>
              <div className="text-center text-sm -mt-2">
                Already have an account?{" "}
                <span
                  className="font-bold underline cursor-pointer"
                  onClick={() => router.push("/login")}
                >
                  Login
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
