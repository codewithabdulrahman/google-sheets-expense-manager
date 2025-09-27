import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/auth";
import { getDrive } from "@/lib/google";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !(session as any).accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json();
  const spreadsheetName = name || "My New Sheet";

  try {
    const drive = getDrive((session as any).accessToken as string);
    const file = await drive.files.create({
      requestBody: {
        name: spreadsheetName,
        mimeType: "application/vnd.google-apps.spreadsheet",
      },
    });
    return NextResponse.json({ id: file.data.id });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
