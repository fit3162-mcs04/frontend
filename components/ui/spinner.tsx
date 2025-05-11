"use client";

export const Spinner = () => {
  return (
    <div className="flex justify-center" aria-label="loading...">
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
