"use client";

import { deleteRecord } from "@/app/actions";
import { Record } from "@/types/types";

import { useTransition } from "react";
import { toast } from "sonner";

interface RecordItemProps {
  record: Record;
  onDelete?: (id: string) => void;
}

const RecordItem = ({ record, onDelete }: RecordItemProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteRecord = (recordId: string) => {
    startTransition(async () => {
      try {
        await deleteRecord(recordId);
        toast.success("Record deleted successfully!");
        if (onDelete) onDelete(recordId);
      } catch (err: any) {
        toast.error(err?.message || "Failed to delete record.");
      }
    });
  };
  return (
    <li
      className={`flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4 border-t border-t-gray-100 ${
        record?.amount < 7
          ? "border-l-4 border-red-500"
          : "border-l-4 border-green-500"
      } `}
    >
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">
          {new Date(record?.date).toLocaleDateString()}
        </span>
        <span className="text-lg font-bold text-gray-800">
          {record?.amount} hours
        </span>
        <span className="text-sm text-gray-600">
          Sleep Mode: {record?.text}
        </span>
      </div>
      <button
        onClick={() => handleDeleteRecord(record.id)}
        className={`bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition cursor-pointer ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Delete record"
        disabled={isPending} // Disable button while loading
      >
        {isPending ? (
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
          "✖"
        )}
      </button>
    </li>
  );
};

export default RecordItem;
