"use client";

import React from "react";
import BookingList from "./_components/BookingList";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function BookingManagementPage() {
  const { status } = useRequireAuth();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <BookingList />
    </>
  );
}
