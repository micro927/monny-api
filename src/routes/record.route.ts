import { Elysia } from "elysia";
import { fetchLatestCsvAsJson } from "../controllers/record.controller";

export const recordRoute = new Elysia().get("/record", async () => {
  try {
    const data = await fetchLatestCsvAsJson();
    return { data };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
});
