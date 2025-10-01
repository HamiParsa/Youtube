"use client";
import { useState } from "react";
import {
  Home,
  Video,
  Compass,
  Library,
  Bell,
  User,
  LayoutPanelLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Define color palette for sidebar items
const colors = {
  red: "#FF0000",
  blue: "#3B82F6",
  green: "#10B981",
  yellow: "#FACC15",
};

// Define TypeScript type for a video
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
    channel: "rihana",
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

// Sidebar menu items
const sidebarItems = [
  { name: "Home", icon: Home, color: colors.red },
  { name: "Shorts", icon: Video, color: colors.blue },
  { name: "Explore", icon: Compass, color: colors.green },
  { name: "Library", icon: Library, color: colors.yellow },
];

export default function YouTubeProDark() {
  // State for search query input
  const [query, setQuery] = useState("");
  // State for active sidebar item
  const [activeSidebar, setActiveSidebar] = useState("Home");
  // State to store search results
  const [searchResults, setSearchResults] = useState<Video[]>([]);
  // State to track if a search has been performed
  const [hasSearched, setHasSearched] = useState(false);

  // Function to filter videos based on query
  const performSearch = () => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    const results = videos.filter((v) =>
      v.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
    setHasSearched(true);
  };

  // Handle form submission for search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  // Handle Enter key press in search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") performSearch();
  };

  // Determine which videos to display (all or search results)
  const displayedVideos = hasSearched ? searchResults : videos;

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-3 shadow-lg sticky top-0 bg-gray-850 z-50">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <div className="bg-red-600 w-8 h-6 flex items-center justify-center rounded-sm">
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
              <path d="M10 8.64L15.27 12 10 15.36V8.64M21 3H3C1.9 3 1 3.9 1 5v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <span className="text-xl font-bold">YouTube</span>
        </div>

        {/* Search form */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-1 max-w-2xl mx-6"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search"
            className="w-full border border-gray-700 bg-gray-800 px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-red-600 text-white placeholder-gray-400 transition"
          />
          <button
            type="submit"
            className="bg-gray-700 px-4 rounded-r-full hover:bg-gray-600 transition"
          >
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M9.5 3a6.5 6.5 0 016.5 6.5c0 1.61-.595 3.082-1.567 4.207l5.431 5.432-1.414 1.414-5.432-5.431A6.464 6.464 0 019.5 16a6.5 6.5 0 110-13zm0 2a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
            </svg>
          </button>
        </form>

        {/* Navbar icons */}
        <div className="flex items-center gap-4">
          <LayoutPanelLeft className="w-6 h-6 cursor-pointer text-gray-300 hover:text-white transition" />
          <Bell className="w-6 h-6 cursor-pointer text-gray-300 hover:text-white transition" />
          <User className="w-8 h-8 cursor-pointer text-gray-300 hover:text-white transition rounded-full bg-gray-700" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 border-r border-gray-700 h-full overflow-y-auto sticky top-[64px] bg-gray-850 p-4">
          <ul className="space-y-4">
            {sidebarItems.map(({ name, icon: Icon, color }) => (
              <li
                key={name}
                onClick={() => setActiveSidebar(name)}
                className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-all duration-200
                  ${
                    activeSidebar === name
                      ? "bg-gray-700 scale-105"
                      : "hover:bg-gray-700 hover:scale-105"
                  }
                `}
              >
                <Icon className="w-6 h-6" style={{ color }} />
                <span className="font-semibold">{name}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content / Video grid */}
        <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hasSearched && searchResults.length === 0 ? (
            // Display message if no search results
            <p className="text-white col-span-full text-center mt-10 text-xl font-semibold">
              Video Not Found 😢
            </p>
          ) : (
            // Display video cards
            displayedVideos.map((video) => (
              <Link
                key={video.id}
                href={`/video/${video.id}`}
                className="group h-[300px] cursor-pointer rounded-lg overflow-hidden bg-gray-800 shadow-md hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition duration-300"
              >
                {/* Video thumbnail */}
                <div className="relative">
                  <Image
                    width={1000}
                    height={1000}
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute bottom-2 right-2 bg-gradient-to-r from-black/70 to-black/50 text-white text-xs px-2 py-0.5 rounded-sm font-mono">
                    {video.duration}
                  </span>
                </div>
                {/* Video title and channel info */}
                <div className="p-3">
                  <h2 className="font-semibold text-lg line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
                    {video.title}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                    <span>{video.channel}</span>
                    {video.isVerified && (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-blue-500 inline-block"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        />
                      </svg>
                    )}
                    <span>• {video.views} views</span>
                  </p>
                </div>
              </Link>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
