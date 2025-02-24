import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";

import { DATABASE_ID, GROUPS_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";

import { Group } from "../types";
import { createGroupSchema, getGroupSchema } from "../schemas";

const app = new Hono()
    .get("/", sessionMiddleware, zValidator("query", getGroupSchema), async (c) => {
        const databases = c.get("databases");

        const { search } = c.req.valid("query");

        const query = [Query.orderDesc("$createdAt")];

        if (search) {
            query.push(Query.search("name", search));
        }

        const groups = await databases.listDocuments<Group>(DATABASE_ID, GROUPS_ID, query);

        return c.json({ data: groups });
    })
    .get("/:groupId", sessionMiddleware, async (c) => {
        const databases = c.get("databases");
        const { groupId } = c.req.param();

        const group = await databases.getDocument<Group>(DATABASE_ID, GROUPS_ID, groupId);

        return c.json({ data: group });
    })
    .post("/create", sessionMiddleware, zValidator("json", createGroupSchema), async (c) => {
        const databases = c.get("databases");

        const { name, teacherId, groupNumber, students } = c.req.valid("json");

        const group = await databases.createDocument(DATABASE_ID, GROUPS_ID, ID.unique(), {
            name,
            teacherId,
            groupNumber,
            students,
        });

        return c.json({ data: group, message: "تم إضافة الحلقة بنجاح" });
    })
    .put("/update/:groupId", sessionMiddleware, zValidator("json", createGroupSchema), async (c) => {
        const databases = c.get("databases");

        const { name, teacherId, groupNumber, students } = c.req.valid("json");
        const { groupId } = c.req.param();

        const group = await databases.updateDocument(DATABASE_ID, GROUPS_ID, groupId, {
            name,
            teacherId,
            groupNumber,
            students,
        });

        return c.json({ data: group, message: "تم تعديل الحلقة بنجاح" });
    })
    .delete("/delete/:groupId", sessionMiddleware, async (c) => {
        const databases = c.get("databases");

        const { groupId } = c.req.param();

        const group = await databases.deleteDocument(DATABASE_ID, GROUPS_ID, groupId);

        return c.json({ data: group, message: "تم حذف الحلقة بنجاح" });
    });

export default app;
