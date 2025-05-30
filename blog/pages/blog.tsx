import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Home() {
  const router = useRouter();

  const [lsAuth, setLsAuth] = React.useState<string | null>(null);
  const [cookieAuth, setCookieAuth] = React.useState<string | null>(null);

  React.useEffect(() => {
    const value = localStorage.getItem("auth.token");
    if (value) {
      setLsAuth(value);
    }
  }, []);

  React.useEffect(() => {
    const value = document.cookie.match(/auth.token=([^;]*)/);
    if (value) {
      setCookieAuth(value[1]);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Test branch</p>

      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />

      <Link href="/">home using Link</Link>
      <a href="/">home using a</a>
      <button onClick={() => router.push("/")}>home using push</button>

      <p>authFromLocalStorage: {lsAuth}</p>
      <p>authFromCookie: {cookieAuth}</p>
    </div>
  );
}
