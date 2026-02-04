/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionLock, useStatus } from "@/hooks";

const ContactForm = () => {
  const { loading, lock, unlock } = useActionLock();
  const { error, success, setError, setSuccess, reset, setSuccessWithTimeout } =
    useStatus();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!lock()) return;
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const message = (formData.get("message") as string).trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to send email");
      }
      e.currentTarget.reset();
      setSuccessWithTimeout();
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      unlock();
    }
  };
  return (
    <section className="py-16 px-8 bg-white max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
      <form
        className={`space-y-6 ${loading ? "pointer-events-none " : ""}`}
        onSubmit={handleSubmit}
      >
        <div>
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            placeholder="Your Name"
            required
            onChange={reset}
          />
        </div>
        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            placeholder="Your Email"
            required
            onChange={reset}
          />
        </div>
        <div>
          <Label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 resize-none"
            placeholder="Your Message"
            required
            onChange={reset}
          />
        </div>
        {error && (
          <p className="text-red-600" role="alert" aria-live="assertive">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600" role="status" aria-live="polite">
            Message sent successfully!
          </p>
        )}
        <Button
          type="submit"
          className="w-full bg-linear-to-r from-purple-500 via-pink-500 to-red-500 font-medium rounded-md shadow"
          disabled={loading}
        >
          {loading ? "Sending..." : "Submit"}
        </Button>
      </form>
    </section>
  );
};

export default ContactForm;
