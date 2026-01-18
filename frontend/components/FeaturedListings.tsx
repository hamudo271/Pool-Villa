"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ListingCard from "./ListingCard";

import { API_URL } from "@/lib/api";

export default function FeaturedListings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/listings`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-text-primary mb-6">
        추천 풀빌라
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {listings.map((listing: any) => (
          <Link href={`/listing/${listing.id}`} key={listing.id} className="block group">
            <ListingCard {...listing} />
          </Link>
        ))}
      </div>
    </section>
  );
}
