"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import { logo } from "~/assets";

export default function Navbar() {
  const [providers, setProviders] = useState<any>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between mb-16 w-full pt-3">
      {/* desktop */}
      <Link href="/" className="flex-center flex gap-2">
        <Image src={logo} alt="prompnext logo" width={30} height={30} className="object-contain" />
        <p className="logo_text">PromptNext</p>
      </Link>
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={() => signOut()}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image src={session?.user.image} width={40} height={40} alt="profile" className="rounded-full" />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => {
                return (
                  <button type="button" key={provider.id} className="black_btn" onClick={() => signIn(provider.id)}>
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>
      {/* mobile */}
      <div className="relative flex sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={40}
              height={40}
              alt="profile"
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="black_btn mt-5 w-full"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => {
                return (
                  <button type="button" key={provider.id} className="black_btn" onClick={() => signIn(provider.id)}>
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
}
