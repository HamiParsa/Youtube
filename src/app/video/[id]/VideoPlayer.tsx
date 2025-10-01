"use client";
import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

type Video = {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  isShort?: boolean;
  isLive?: boolean;
  isVerified?: boolean;
};

export function VideoPlayer({ video }: { video: Video }) {
  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <div className="flex flex-col md:flex-row bg-gray-900 text-white min-h-screen p-6">
      <main className="flex-1">
        <div className="w-full aspect-video bg-black mb-4 rounded-lg overflow-hidden shadow-2xl">
          <video
            src={`https://www.youtube.com/watch?v=${video.id}`}
            controls
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold mb-2 hover:text-red-600 transition">
          {video.title}
        </h1>
        <p className="text-sm text-gray-400 mb-4">{video.views} views • 2 days ago</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
              <Image
                src={`https://i.pravatar.cc/100?u=${video.channel}`}
                alt={video.channel}
                width={48}
                height={48}
              />
            </div>
            <div>
              <p className="font-semibold flex items-center gap-1">
                {video.channel} {video.isVerified && <Check className="w-4 h-4 text-blue-500" />}
              </p>
              <p className="text-gray-400 text-sm">1.2M subscribers</p>
            </div>
          </div>
          <button className="bg-red-600 px-4 py-1 rounded-full font-semibold hover:bg-red-700 transition">
            Subscribe
          </button>
        </div>

        <div className="text-gray-300 text-sm mb-6">
          <p className={showFullDesc ? "block" : "line-clamp-3"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
            malesuada. Ut convallis, purus vel luctus blandit, mauris purus
            fermentum ligula, eu tincidunt enim elit in nulla.
          </p>
          <button
            className="text-blue-500 mt-1 font-semibold"
            onClick={() => setShowFullDesc(!showFullDesc)}
          >
            {showFullDesc ? "Show less" : "Show more"}
          </button>
        </div>
      </main>
    </div>
  );
}
