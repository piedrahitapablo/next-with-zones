import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Header from "../components/Header";

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

  const handleLogin = () => {
    // set localstorage
    localStorage.setItem("auth.token", "123456ls");

    // set cookie
    document.cookie = "auth.token=123456cookie";
  };

  const handleLogout = () => {
    // set localstorage
    localStorage.removeItem("auth.token");

    // set cookie
    document.cookie = "auth.token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Header />
      <p>This is our homepage (test branch 2)</p>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <a href="/blog">Blog using a</a>
        <Link href="/blog">Blog using Link</Link>
        <button onClick={() => router.push("/blog")} style={{ width: 150 }}>
          Blog using push
        </button>
      </div>

      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div>
        <p>authFromLocalStorage: {lsAuth}</p>
        <p>authFromCookie: {cookieAuth}</p>
      </div>
    </div>
  );
}
