import { Button } from "@/components/ui/button";
import Image from "next/image";
import Img from "@/public/sleep-tracker.png";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";

const faqs = [
  {
    id: 1,
    question: "What is Sleeply?",
    content:
      "Sleeply is a powerful tool designed to help you monitor your sleep patterns and improve your overall health.",
  },
  {
    id: 2,
    question: "How does it work?",
    content:
      "Sleeply analyzes your sleep data and provides personalized insights to help you achieve better sleep.",
  },
  {
    id: 3,
    question: "What is Sleeply?",
    content:
      "Sleeply is completely free, providing all the essential features and insights you need.",
  },
];
const testimonials = [
  {
    id: 1,
    name: "Sarah L.",
    qoutes:
      "Sleeply has completely transformed my sleep schedule. I feel more energized every day!",
  },
  {
    id: 2,
    name: "John D.",
    qoutes:
      "The insights from Sleeply have helped me identify and fix my sleep issues. Highly recommend it!",
  },
  {
    id: 3,
    name: "Emily R.",
    qoutes:
      "Sleeply is so easy to use and provides accurate data.It's a must-have for anyone looking to improve their sleep!",
  },
];

export default async function Home() {
  const session = await getSession();

  async function getStarted() {
    "use server";
    if (session) {
      redirect("/sleep-tracker");
    } else {
      redirect("/login");
    }
  }
  return (
    <div className="min-h-screen font-sans w-full mt-16  text-gray-800 ">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-100 jusity-center items-center p-3 md:p-10 pt-10 ">
        <div className="md:pl-10 mb-8 ">
          <span className="text-2xl md:text-4xl font-bold  bg-linear-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Welcome to Sleeply
          </span>
          <p className="md:text-xl mb-6 mt-2">
            Track your sleep, improve your health, and wake up feeling refreshed
            with Sleeply.
          </p>
          <Button
            className="w-auto bg-linear-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer"
            onClick={getStarted}
          >
            Get Started
          </Button>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Image
            src={Img}
            alt="SleepTracker Illustration"
            className="w-full md:max-w-md rounded-tl-3xl rounded-br-3xl shadow-lg"
          />
        </div>
      </div>
      <div className="py-16 px-8 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 ">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {faqs.map((faq) => (
            <div key={faq.id}>
              <h3 className="text-xl font-bold">{faq.question}</h3>
              <p className="text-gray-600">{faq.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="py-16 px-8 bg-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          What Our Users Say
        </h2>
        <div
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8
        "
        >
          {testimonials.map((user) => (
            <div key={user.id} className="bg-white p-6 rounded-md shadow">
              <p className="text-gray-700 mb-4">&quot;{user.qoutes}&quot;</p>
              <p className="text-purple-500 font-bold">- {user.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
