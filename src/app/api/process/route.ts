import { NextRequest, NextResponse } from "next/server";
import { fetchArticleText } from "@/lib/article";
import { findCredibleSources } from "@/lib/googleSearch";

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();
    let content = String(input || "").trim();
    if (/^https?:\/\//i.test(content)) {
      content = await fetchArticleText(content);
    }
    const sources = await findCredibleSources(content.slice(0, 120));
    return NextResponse.json({ content, sources });
  } catch (err) {
    console.error("process error", err);
    return NextResponse.json({ content: "", sources: [] });
  }
}
