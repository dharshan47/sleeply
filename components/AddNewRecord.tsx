"use client";

import { addSleepRecord } from "@/app/actions/addSleepRecord";
import React, { useRef, useState } from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const AddNewRecord = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [amount, setAmount] = useState(6);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(false);
  const [sleepQuality, setSleepQuality] = useState("");

  const clientAction = async (formData: FormData) => {
    setLoading(true);
    setAlertMessage(null);
    formData.set("amount", amount.toString());
    formData.set("text", sleepQuality);
    const { error } = await addSleepRecord(formData);

    if (error) {
      setAlertMessage(`Error: ${error}`);
      setAlertType("error");
    } else {
      setAlertMessage("Sleep record added successfully!");
      setAlertType("success");
      formRef.current?.reset();
      setAmount(6);
      setSleepQuality("");
    }
    setLoading(false);

    setTimeout(() => {
      setAlertMessage(null);
      setAlertType(null);
    }, 5000);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Track Your Sleep
        </h3>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(formRef.current!);
            clientAction(formData);
          }}
          className="space-y-6"
        >
          {/* Sleep Quality and Sleep Date */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            {/* Sleep Quality */}
            <div className="flex-1">
              <Label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Sleep Quality
              </Label>
              <Select
                value={sleepQuality}
                name="text"
                onValueChange={(value) => setSleepQuality(value)}
              >
                <SelectTrigger
                  className="w-full border border-gray-300 focus:ring-purple-500 focus:border-purple-500 mb-2 md:mb-0"
                  id="text"
                >
                  <SelectValue placeholder="Sleep Quality..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Refreshed">🌞 Refreshed</SelectItem>
                  <SelectItem value="Tired">😴 Tired</SelectItem>
                  <SelectItem value="Neutral">😐 Neutral</SelectItem>
                  <SelectItem value="Exhausted">😫 Exhausted</SelectItem>
                  <SelectItem value="Energetic">⚡ Energetic</SelectItem>
                </SelectContent>
              </Select>
            </div>

             {/* Sleep Date */}
            <div className="flex-1">
              <Label
                className="block text-sm font-medium mb-2 text-gray-700"
                htmlFor="date"
              >
                Sleep Date
              </Label>
              <Input
                type="date"
                name="date"
                id="date"
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4 py-2"
                placeholder="Select a date"
                required
                onFocus={(e) => e.target.showPicker()}
              />
            </div>
          </div>

           {/* Hours Slept */}
          <div>
            <Label
              htmlFor="amount"
              className="blocl text-sm font-medium text-gray-700 mb-2"
            >
              Hours Slept
              <br />
              <span className="text-xs text-gray-500">
                (select between 0 and 12 in steps of 0.5)
              </span>
            </Label>
            <Input
              type="range"
              name="amount"
              id="amount"
              min="0"
              max="12"
              step="0.5"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="w-full cursor-pointer"
            />
            <div className=" text-center text-gray-700">{amount} hours</div>
          </div>
           {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white px-4 py-2 rounded-md font-medium shadow-md transition flex items-center justify-center cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Add Sleep Record"
            )}
          </Button>
        </form>

        {alertMessage && (
          <div
            className={`mt-4 p-3 rounded-md text-sm ${
              alertType === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewRecord;
