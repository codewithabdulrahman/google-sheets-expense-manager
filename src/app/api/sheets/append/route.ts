import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/auth";
import { getSheets } from "@/lib/google";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !(session as any).accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { spreadsheetId, range, values } = await req.json();
  if (!spreadsheetId || !range || !Array.isArray(values)) {
    return NextResponse.json({ error: "Missing spreadsheetId, range, or values[]" }, { status: 400 });
  }

  try {
    const sheets = getSheets((session as any).accessToken as string);
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: { values },
    });
    return NextResponse.json({ result: res.data.updates });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
