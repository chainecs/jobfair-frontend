"use client";

import React from "react";
import BookingList from "./_components/BookingList";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import Loading from "../loading";

export default function BookingManagementPage() {
  const { status } = useRequireAuth();

  if (status === "loading" || status === "unauthenticated") {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <BookingList />
    </>
  );
}
