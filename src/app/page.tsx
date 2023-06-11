"use client";

import { useEffect, useState } from "react";

import Feed from "~/components/Feed";

export default function Home() {
  const [posts, setPosts] = useState<any>([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="flex-center w-full flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        {/* can also use max-md:hidden */}
        <br className="hidden md:block" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        PrompNext is an open-source AI prompting tool for modern world to discover, create and share creative prompts
      </p>
      <Feed posts={posts} />
    </section>
  );
}
