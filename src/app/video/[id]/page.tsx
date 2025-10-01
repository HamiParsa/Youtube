"use client";
import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ThumbsUp, ThumbsDown, Share, Bookmark } from "lucide-react";
import { Home, LayoutPanelLeft, Bell, User } from "lucide-react";

// Video type definition
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

// Comment type definition
type Comment = {
  id: number;
  user: string;
  text: string;
};

// Hardcoded video data
const videos: Video[] = [
  {
    id: "kJQP7kiw5Fk",
    title: "Luis Fonsi – Despacito ft. Daddy Yankee",
    channel: "Luis Fonsi",
    views: "8.8B",
    duration: "4:42",
    thumbnail: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
    isVerified: true,
  },
  {
    id: "9bZkp7q19f0",
    title: "PSY – Gangnam Style",
    channel: "PSY",
    views: "4.4B",
    duration: "4:13",
    thumbnail: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
    isVerified: true,
  },
  {
    id: "JGwWNGJdvx8",
    title: "Ed Sheeran – Shape of You",
    channel: "Ed Sheeran",
    views: "5.6B",
    duration: "4:24",
    thumbnail: "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg",
    isVerified: true,
  },
  {
    id: "fRh_vgS2dFE",
    title: "Justin Bieber – Sorry",
    channel: "Justin Bieber",
    views: "3.5B",
    duration: "3:20",
    thumbnail: "https://i.ytimg.com/vi/fRh_vgS2dFE/hqdefault.jpg",
    isVerified: true,
  },
  {
    id: "3tmd-ClpJxA",
    title: "Mark Ronson – Uptown Funk ft. Bruno Mars",
    channel: "Mark Ronson",
    views: "4B",
    duration: "4:31",
    thumbnail: "https://i.ytimg.com/vi/3tmd-ClpJxA/hqdefault.jpg",
    isVerified: true,
  },
  {
    id: "RgKAFK5djSk",
    title: "Wiz Khalifa – See You Again ft. Charlie Puth",
    channel: "Wiz Khalifa",
    views: "5.2B",
    duration: "3:50",
    thumbnail: "https://i.ytimg.com/vi/RgKAFK5djSk/hqdefault.jpg",
    isVerified: true,
  },
  {
    id: "hT_nvWreIhg",
    title: "Maroon 5 – Sugar",
    channel: "Maroon 5",
    views: "4.2B",
    duration: "5:00",
    thumbnail: "https://i.ytimg.com/vi/hT_nvWreIhg/hqdefault.jpg",
    isVerified: true,
  },
  {
    id: "kOkQ4T5WO9E",
    title: "this is what you came for",
    channel: "rihanna",
    views: "3.6B",
    duration: "4:02",
    thumbnail: "https://i.ytimg.com/vi/kOkQ4T5WO9E/hqdefault.jpg",
    isVerified: true,
  },
  {
    id: "uelHwf8o7_U",
    title: "Eminem – Love The Way You Lie ft. Rihanna",
    channel: "Eminem",
    views: "3.7B",
    duration: "4:26",
    thumbnail: "https://i.ytimg.com/vi/uelHwf8o7_U/hqdefault.jpg",
    isVerified: true,
  },
  {
    id: "60ItHLz5WEA",
    title: "Alan Walker – Faded",
    channel: "Alan Walker",
    views: "3.3B",
    duration: "3:32",
    thumbnail: "https://i.ytimg.com/vi/60ItHLz5WEA/hqdefault.jpg",
    isVerified: true,
  },
];

export default function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Resolve dynamic route params
  const resolvedParams = use(params);
  // Find the video by ID
  const video = videos.find((v) => v.id === resolvedParams.id);

  // State to toggle full description
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Comments state
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // Load comments from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined" && video) {
      const saved = localStorage.getItem(`comments_${video.id}`);
      setComments(saved ? JSON.parse(saved) : []);
    }
  }, [video]);

  // Add a new comment
  const addComment = () => {
    if (!newComment.trim() || !video) return;
    const comment = { id: Date.now(), user: "Guest", text: newComment.trim() };
    const updated = [comment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments_${video.id}`, JSON.stringify(updated));
    setNewComment("");
  };

  // Show message if video not found
  if (!video) return <p className="text-white p-6">Video not found</p>;

  return (
    <div>
      {/* Navbar */}
      <header className="flex items-center bg-black justify-between px-6 py-3 shadow-md sticky top-0 bg-gray-850 z-50">
        {/* Logo and Home Link */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-red-600 w-8 h-6 flex items-center justify-center rounded-sm">
              <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M10 8.64L15.27 12 10 15.36V8.64M21 3H3C1.9 3 1 3.9 1 5v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <span className="text-xl text-white font-bold">YouTube</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1 text-white hover:text-red-600 transition"
          >
            <Home className="w-5 h-5" />
            <span className="font-semibold">Home</span>
          </Link>
        </div>

        {/* Right-side Icons */}
        <div className="flex items-center gap-4">
          <LayoutPanelLeft className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition" />
          <Bell className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition" />
          <User className="w-8 h-8 rounded-full bg-gray-700 text-gray-300 hover:text-white cursor-pointer transition" />
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-col md:flex-row bg-gray-900 text-white min-h-screen p-6 gap-6">
        {/* Main Video Section */}
        <main className="flex-1 flex flex-col gap-4">
          {/* Video iframe */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-700">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?autoplay=0`}
              title={video.title}
              allowFullScreen
              className="w-full h-full"
            />
            {/* LIVE badge */}
            {video.isLive && (
              <span className="absolute top-2 left-2 bg-red-600 px-2 py-0.5 rounded text-xs font-bold animate-pulse">
                LIVE
              </span>
            )}
            {/* SHORTS badge */}
            {video.isShort && (
              <span className="absolute top-2 left-2 bg-yellow-500 px-2 py-0.5 rounded text-xs font-bold">
                SHORTS
              </span>
            )}
          </div>

          {/* Video Title */}
          <h1 className="text-2xl font-bold">{video.title}</h1>
          <p className="text-sm text-gray-400 mb-2">
            {video.views} views • 2 days ago
          </p>

          {/* Channel Info */}
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
                  {video.channel}{" "}
                  {video.isVerified && (
                    <Check className="w-4 h-4 text-blue-500" />
                  )}
                </p>
                <p className="text-gray-400 text-sm">1.2M subscribers</p>
              </div>
            </div>
            {/* Subscribe Button */}
            <button className="bg-red-600 px-4 py-1 rounded-full font-semibold hover:bg-red-700 transition">
              Subscribe
            </button>
          </div>

          {/* Video Description */}
          <div className="text-gray-300 text-sm mb-6">
            <p className={showFullDesc ? "block" : "line-clamp-3"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
              malesuada.
            </p>
            <button
              className="text-blue-500 mt-1 font-semibold"
              onClick={() => setShowFullDesc(!showFullDesc)}
            >
              {showFullDesc ? "Show less" : "Show more"}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <button className="flex items-center gap-1 px-3 py-1 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
              <ThumbsUp className="w-5 h-5" /> 12K
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
              <ThumbsDown className="w-5 h-5" /> 1K
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
              <Share className="w-5 h-5" /> Share
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
              <Bookmark className="w-5 h-5" /> Save
            </button>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">
              Comments ({comments.length})
            </h3>
            {/* Add New Comment */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                onClick={addComment}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition font-semibold"
              >
                Comment
              </button>
            </div>
            {/* Display Comments */}
            <div className="flex flex-col gap-3">
              {comments.map((c) => (
                <div key={c.id} className="bg-gray-800 p-3 rounded-lg">
                  <p className="font-semibold">{c.user}</p>
                  <p className="text-gray-300 text-sm">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Related Videos Sidebar */}
        <aside className="w-80 flex-shrink-0 flex flex-col gap-4 overflow-y-auto">
          <h2 className="text-lg font-bold mb-2">Related Videos</h2>
          <div className="flex flex-col gap-3">
            {videos
              .filter((v) => v.id !== video.id)
              .map((v) => (
                <Link
                  key={v.id}
                  href={`/video/${v.id}`}
                  className="group cursor-pointer flex gap-2 rounded-lg overflow-hidden hover:bg-gray-800 transition"
                >
                  {/* Thumbnail */}
                  <div className="w-36 h-20 relative flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={v.thumbnail}
                      alt={v.title}
                      width={144}
                      height={80}
                      className="object-cover w-full h-full rounded-lg"
                    />
                    {v.isLive && (
                      <span className="absolute top-1 left-1 bg-red-600 px-1 py-0.5 text-xs rounded animate-pulse">
                        LIVE
                      </span>
                    )}
                    {v.isShort && (
                      <span className="absolute top-1 left-1 bg-yellow-500 px-1 py-0.5 text-xs rounded">
                        SHORTS
                      </span>
                    )}
                  </div>
                  {/* Video Info */}
                  <div className="flex flex-col justify-between py-1">
                    <p className="text-sm font-semibold line-clamp-2 group-hover:text-red-600">
                      {v.title}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      {v.channel}{" "}
                      {v.isVerified && (
                        <Check className="w-3 h-3 inline text-blue-500" />
                      )}
                    </p>
                    <p className="text-xs text-gray-400">{v.views} views</p>
                  </div>
                </Link>
              ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
