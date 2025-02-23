import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";

import { DATABASE_ID, TEACHERS_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";

import { Teacher } from "../types";
import { createTeacherSchema, getTeacherSchema } from "../schemas";

const app = new Hono()
    .get("/", sessionMiddleware, zValidator("query", getTeacherSchema), async (c) => {
        const databases = c.get("databases");

        const { gender, search, birthDate } = c.req.valid("query");

        const query = [Query.orderDesc("$createdAt")];

        if (gender) {
            query.push(Query.equal("gender", gender));
        }
        if (search) {
            query.push(Query.search("name", search));
        }
        if (birthDate) {
            query.push(Query.equal("birthDate", birthDate));
        }

        const teachers = await databases.listDocuments<Teacher>(DATABASE_ID, TEACHERS_ID, query);

        return c.json({ data: teachers });
    })
    .get("/:teacherId", sessionMiddleware, async (c) => {
        const databases = c.get("databases");
        const { teacherId } = c.req.param();

        const teacher = await databases.getDocument<Teacher>(DATABASE_ID, TEACHERS_ID, teacherId);

        return c.json({ data: teacher });
    })
    .post("/create", sessionMiddleware, zValidator("json", createTeacherSchema), async (c) => {
        const databases = c.get("databases");

        const { name, nationalId, phone, birthDate, hireDate, gender, groupIds, studentIds } = c.req.valid("json");

        const teacher = await databases.createDocument(DATABASE_ID, TEACHERS_ID, ID.unique(), {
            name,
            birthDate,
            nationalId,
            phone,
            gender,
            hireDate,
            groupIds,
            studentIds,
        });

        return c.json({ data: teacher, message: "تم إضافة المعلم بنجاح" });
    })
    .put("/update/:teacherId", sessionMiddleware, zValidator("json", createTeacherSchema), async (c) => {
        const databases = c.get("databases");

        const { name, nationalId, phone, birthDate, hireDate, gender, groupIds, studentIds } = c.req.valid("json");
        const { teacherId } = c.req.param();

        const teacher = await databases.updateDocument(DATABASE_ID, TEACHERS_ID, teacherId, {
            name,
            birthDate,
            nationalId,
            phone,
            gender,
            hireDate,
            groupIds,
            studentIds,
        });

        return c.json({ data: teacher, message: "تم تعديل المعلم بنجاح" });
    })
    .delete("/delete/:teacherId", sessionMiddleware, async (c) => {
        const databases = c.get("databases");

        const { teacherId } = c.req.param();

        const teacher = await databases.deleteDocument(DATABASE_ID, TEACHERS_ID, teacherId);

        return c.json({ data: teacher, message: "تم حذف المعلم بنجاح" });
    });

export default app;
