
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Booking = {
  id: number;
  item: string;
  days: number;
  total: number;
  createdAt: string;
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("novellaBookings");
      if (saved) {
        setBookings(JSON.parse(saved));
      }
    } catch {
      setBookings([]);
    }
    setLoaded(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#faf7f0] px-6 py-10 text-[#302b25]">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm underline">
          ← Back to Explore
        </Link>

        <p className="mt-8 text-sm uppercase tracking-[0.25em] text-[#82786c]">
          NOVELLA
        </p>

        <h1 className="mt-2 text-4xl font-semibold">My Rentals</h1>
        <p className="mt-3 text-[#82786c]">
          Your rentals, all in one place.
        </p>

        {!loaded ? (
          <p className="mt-10">Loading your rentals...</p>
        ) : bookings.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[#e5dbce] bg-[#fffefa] p-8">
            <h2 className="text-xl font-medium">No rentals yet</h2>
            <p className="mt-2 text-[#82786c]">
              Find something you love and book your first rental.
            </p>
            <Link
              href="/"
              className="mt-5 inline-block rounded-full bg-[#302b25] px-6 py-3 text-white"
            >
              Explore items
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {bookings.map((booking) => (
              <article
                key={booking.id}
                className="rounded-2xl border border-[#e5dbce] bg-[#fffefa] p-6"
              >
                <h2 className="text-xl font-semibold">{booking.item}</h2>
                <p className="mt-3 text-[#82786c]">
                  Rental duration: {booking.days}{" "}
                  {booking.days === 1 ? "day" : "days"}
                </p>
                <p className="mt-1 font-medium">
                  Total: ₹{booking.total}
                </p>
                <p className="mt-2 text-sm text-[#82786c]">
                  Booked on{" "}
                  {new Date(booking.createdAt).toLocaleDateString("en-IN")}
                </p>
                <p className="mt-3 text-sm">Status: Booking saved</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
