import { fetchThreads } from "@/lib/actions/thread.actions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageNumber = Number(searchParams.get("pageNumber"));
  const pageSize = Number(searchParams.get("pageSize"));

  const threads = await fetchThreads({ pageNumber, pageSize });

  return Response.json({ threads });
}
