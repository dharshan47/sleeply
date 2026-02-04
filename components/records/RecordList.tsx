"use client";

import RecordItem from "../../profile/RecordItem";
import { Record } from "@/types/types";
import { useState } from "react";

const RecordList = ({ records }: { records: Record[] }) => {
  const [recordList, setRecordList] = useState(records);

  const handleDelete = (id: string) => {
    setRecordList((prev) => prev.filter((r) => r.id !== id)); // Remove item immediately
  };

  return (
    <ul>
      {recordList.map((record) => (
        <RecordItem
          key={record.id}
          record={record}
          onDelete={handleDelete} // Pass delete handler
        />
      ))}
    </ul>
  );
};

export default RecordList;
