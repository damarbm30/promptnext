"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import PromptCard from "./PromptCard";

type Props = {
  data: any;
  handleTagClick: (tagName: string) => void;
};

const PromptCardList = ({ data, handleTagClick }: Props) => {
  return (
    <div className="prompt_layout mt-16">
      {data?.length > 0 &&
        data?.map((post: any) => {
          return <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />;
        })}
    </div>
  );
};

export default function Feed() {
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>([]);

  const { data: session } = useSession();

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user?.id}/posts`);
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPrompts = (searchText: string) => {
    // case insensitive
    const regex = new RegExp(searchText, "i");
    const filtered = posts.filter((post: Post) => {
      return regex.test(post.creator.username) || regex.test(post.prompt) || regex.test(post.tag);
    });

    return filtered;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filteredPrompts(e.target.value);
        setSearchResults(searchResults);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResults = filteredPrompts(tagName);
    setSearchResults(searchResults);
  };

  return (
    <section className="feed">
      <form className="flex-center relative w-full">
        <input
          type="text"
          placeholder="Search for a tag/username"
          value={searchText}
          required
          className="search_input peer"
          onChange={handleSearchChange}
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
}
