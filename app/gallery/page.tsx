import { client } from "@/sanity/lib/client";
import { GALLERY_QUERY } from "@/sanity/lib/queries";
import { GalleryClient } from "./GalleryClient";

import { VideoReelSection } from "@/components/organisms/VideoReelSection";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function GalleryPage() {
  const initialImages = await client.fetch(GALLERY_QUERY);

  return (
    <main className="min-h-screen bg-[#F9F6F0] pt-32 pb-20 text-primary">
      <div className="container-x mb-20">
        <GalleryClient initialImages={initialImages} />
      </div>
      
      {/* Moved Video Reel from home page to here */}
      <VideoReelSection />
    </main>
  );
}
