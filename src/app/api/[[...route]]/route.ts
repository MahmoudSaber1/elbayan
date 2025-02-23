/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

import auth from "@/features/auth/server/route";
import students from "@/features/students/server/route";
import teachers from "@/features/teachers/server/route";
import groups from "@/features/groups/server/route";

const app = new Hono().basePath("/api");
app.use("/api/*", cors());

const routes = app.route("/auth", auth).route("/students", students).route("/teachers", teachers).route("/groups", groups);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
