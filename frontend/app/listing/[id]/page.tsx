import ListingDetailClient from "@/components/ListingDetailClient";
import { API_URL } from "@/lib/api";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/listings`);
    const listings = await res.json();
    return listings.map((listing: any) => ({
      id: listing.id.toString(),
    }));
  } catch (e) {
    console.error("Failed to generate static params", e);
    return [];
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ListingDetailClient id={id} />;
}
