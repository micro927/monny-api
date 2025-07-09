import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { recordRoute } from "./routes/record.route";

export const app = new Elysia()
  .use(swagger())
  .use(recordRoute)
  .onError(({ code }) => {
    if (code === "NOT_FOUND") return "Route not found :(";
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
