"use client";

import React, { useState } from 'react';

type PredictionRow = {
    id:string;
    prediction: string;
    confidence: string;
};

interface PredictionTableProps {
    data: PredictionRow[];
}

export const PredictionTable: React.FC<PredictionTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(data.length / recordsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const startIdx = currentPage * recordsPerPage;
  const visibleData = data.slice(startIdx, startIdx + recordsPerPage);
  console.log(visibleData)
  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
            <thead className="[&>tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th
                    style={{ width: '20%' }}
                    className="h-10 px-2 text-left align-middle font-medium text-muted-foreground"
                    >
                    #
                    </th>
                    <th
                    style={{ width: '40%' }}
                    className="h-10 px-2 text-left align-middle font-medium text-muted-foreground"
                    >
                    Prediction
                    </th>
                    <th
                    style={{ width: '40%' }}
                    className="h-10 px-2 text-left align-middle font-medium text-muted-foreground text-right"
                    >
                    Confidence
                    </th>
                </tr>
            </thead>
            <tbody className="[&>tr:last-child]:border-0">
            {visibleData.map((row, index) => (
                <tr
                key={row.id}
                className="border-b transition-colors hover:bg-muted/50"
                >
                <td style={{ width: '20%' }} className="p-2 align-middle">
                    {startIdx + index + 1}
                </td>
                <td style={{ width: '40%' }} className="p-2 align-middle text-middle">
                    {row.prediction}
                </td>
                <td style={{ width: '40%' }} className="p-2 align-middle text-left align-middle font-medium text-muted-foreground text-right">
                    {row.confidence}
                </td>
                </tr>
            ))}
            </tbody>

        </table>
      </div>
      <div className="flex justify-between items-center p-2">
        <button
            type='button'
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`px-3 py-1 text-sm border rounded disabled:opacity-50 ${currentPage === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
            Prev
            </button>

            <button
            type='button'
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
            className={`px-3 py-1 text-sm border rounded disabled:opacity-50 ${currentPage >= totalPages - 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
            Next
            </button>
      </div>
    </div>
  );
};
