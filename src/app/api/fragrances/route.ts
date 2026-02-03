import { createClient } from "@/prismicio";
import { asText } from "@prismicio/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = createClient();
    const fragrances = await client.getAllByType("fragrance");

    const data = fragrances.map((fragrance) => ({
      uid: fragrance.uid,
      title: asText(fragrance.data.title) || fragrance.uid,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching fragrances:", error);
    return NextResponse.json(
      { error: "Failed to fetch fragrances" },
      { status: 500 },
    );
  }
}
