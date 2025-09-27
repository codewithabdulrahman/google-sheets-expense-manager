"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [readResult, setReadResult] = useState<string>("");
  const [createdId, setCreatedId] = useState<string>("");
  const [spreadsheetId, setSpreadsheetId] = useState<string>("");
  const [range, setRange] = useState<string>("Sheet1!A1:D10");
  useEffect(() => {
    if (createdId) setSpreadsheetId(createdId);
  }, [createdId]);

  async function callRead() {
    setReadResult("");
    const res = await fetch("/api/sheets/read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spreadsheetId, range }),
    });
    const json = await res.json();
    setReadResult(JSON.stringify(json, null, 2));
  }

  async function callCreate() {
    setCreatedId("");
    const res = await fetch("/api/sheets/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "My New Sheet" }),
    });
    const json = await res.json();
    setCreatedId(json.id || "");
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[16px] row-start-2 items-center sm:items-start w-full max-w-3xl">
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />

        <div className="flex gap-4 items-center">
          {!session ? (
            <button className="rounded border px-4 py-2" onClick={() => signIn("google")}>
              Sign in with Google
            </button>
          ) : (
            <>
              <span>Signed in</span>
              <button className="rounded border px-4 py-2" onClick={() => signOut()}>
                Sign out
              </button>
            </>
          )}
        </div>

        <div className="flex gap-4 items-center flex-wrap">
          <button className="rounded border px-4 py-2" onClick={callCreate} disabled={!session}>
            Create spreadsheet
          </button>
        </div>

        <div className="w-full grid gap-2 sm:grid-cols-[1fr_auto] items-center">
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Spreadsheet ID"
            value={spreadsheetId}
            onChange={(e) => setSpreadsheetId(e.target.value)}
          />
          <input
            className="w-full rounded border px-3 py-2 sm:col-start-1"
            placeholder="Range, e.g. Sheet1!A1:D10"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
          <button className="rounded border px-4 py-2 sm:row-start-1 sm:col-start-2" onClick={callRead} disabled={!session}>
            Read range
          </button>
        </div>


        {createdId && (
          <div className="text-sm">
            Created spreadsheet ID: <code>{createdId}</code>
          </div>
        )}

        {readResult && (
          <pre className="text-xs w-full max-w-[80vw] overflow-auto p-3 rounded bg-black/5 dark:bg-white/10">
            {readResult}
          </pre>
        )}
      </main>
    </div>
  );
}
