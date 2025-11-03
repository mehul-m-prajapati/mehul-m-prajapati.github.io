"use client";

import React, { useEffect, useState } from "react";

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
}

function Page() {
  const [blogs, setBlogs] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mehul2802"
        );
        const data = await response.json();

        const posts: MediumPost[] = data.items.map((item: any) => {

          const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
          let thumbnail = imgMatch ? imgMatch[1] : null;

          const cleanDescription = item.description
            .replace(/<[^>]+>/g, "")
            .slice(0, 120) + "...";

          if (!thumbnail) {
            const keyword = encodeURIComponent(
              item.title.split(" ").slice(0, 3).join(" ")
            );
            thumbnail = `https://source.unsplash.com/600x400/?${keyword},technology,web`;
          }

          return {
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            thumbnail,
            description: cleanDescription,
          };
        });

        setBlogs(posts);
      } catch (error) {
        console.error("Error fetching Medium posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, []);

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-3xl mx-auto">
        {/* --- Intro Section --- */}
        <h1 className="text-lg font-bold mb-4 text-center">My Blogs</h1>
        <p className="text-justify text-sm mb-8 text-foreground/80">
          I document and articulate my thoughts and learnings on{" "}
          <span className="font-semibold">software architecture</span>,{" "}
          <span className="font-semibold">build tools</span>, and{" "}
          <span className="font-semibold">web development</span>. Here
          are all blogs I wrote to date.
        </p>

        {/* --- Blog List --- */}
        {loading ? (
          <p className="text-center">Loading posts...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center">No posts found.</p>
        ) : (
          <ul className="space-y-6">
            {blogs.map((post, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center bg-card rounded-lg shadow-sm hover:shadow-md transition p-3"
              >
                {/* --- Left Side: Thumbnail --- */}
                <div className="w-full sm:w-1/3 flex-shrink-0">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="rounded-md w-full h-32 object-cover"
                    onError={(e) => {
                      // fallback to avatar-style image if broken
                      (e.currentTarget.src = `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(
                        post.title
                      )}`);
                    }}
                  />
                </div>

                {/* --- Right Side: Content --- */}
                <div className="w-full sm:w-2/3 sm:pl-4 mt-3 sm:mt-0">
                  <p className="text-xs text-muted-foreground mb-1">
                    {new Date(post.pubDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-blue-700 hover:text-blue-800
                     dark:text-blue-400 dark:hover:text-blue-600 no-underline"
                  >
                    {post.title}
                  </a>
                  <p className="text-sm text-foreground/80 mt-1 leading-snug">
                    {post.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Page;
