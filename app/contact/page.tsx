"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        target.reset();
        setTimeout(() => {
          setSuccess(false);
        }, 4000);
      } else {
        throw new Error(data.error || "Failed to send email");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full text-gray-800 font-sans mt-16">
      <section className="flex flex-col items-center justify-center text-center py-16 px-8 bg-gray-100 ">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Contact Sleeply
        </h1>
        <p className="text-lg md:text-xl bg-gradient-to-r from-purple-500 via--pink-500 to-red-500 bg-clip-text text-transparent">
          {" "}
          Have questions or need help? Get in touch with us!
        </p>
      </section>

      <section className="py-16 px-8 bg-white max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          {success && (
            <p className="text-green-600">Message sent successfully!</p>
          )}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 font-medium rounded-md shadow"
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit"}
          </Button>
        </form>
      </section>

      <section className="py-16 px-8 bg-gray-100">
        <h2 className="text-3xl text-center font-bold mb-8">
          Contact Information
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-gray-600">sleeplyteam@gmail.com</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <p className="text-gray-600">+91 9753377590</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Address</h3>
            <p className="text-gray-600">123 Sleeply St, Dream City, TN</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
