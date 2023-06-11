import Link from "next/link";

export default function Home() {
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
      <Link href="/feed" className="mt-4 rounded-xl bg-primary-orange px-5 py-3 text-4xl font-bold text-white">
        Go to Feed
      </Link>
    </section>
  );
}
