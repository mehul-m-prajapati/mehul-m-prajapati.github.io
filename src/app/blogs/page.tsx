"use client"

import React, { useEffect, useState } from "react";

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
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

        const posts: MediumPost[] = data.items.map((item: any) => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
        }));

        setBlogs(posts);
      }
      catch (error) {
        console.error("Error fetching Medium posts:", error);
      }
      finally {
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
          <ul className="list-disc list-inside space-y-3 text-sm">
            {blogs.map((post, index) => (
              <li key={index} className="leading-relaxed">
                <span className="">
                  {new Date(post.pubDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>{" "}
                :{" "}
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-800
                   dark:text-blue-400 dark:hover:text-blue-600 no-underline"
                >
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Page;
