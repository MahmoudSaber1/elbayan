import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";

import { createAdminClient } from "@/lib/appwrite";
import { DATABASE_ID, STUDENTS_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";

import { Student } from "../types";
import { createStudentSchema, getStudentSchema } from "../schemas";

const app = new Hono()
    .get("/", sessionMiddleware, zValidator("query", getStudentSchema), async (c) => {
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

        const students = await databases.listDocuments<Student>(DATABASE_ID, STUDENTS_ID, query);

        return c.json({ data: students });
    })
    .get("/:studentId", sessionMiddleware, async (c) => {
        const databases = c.get("databases");
        const { studentId } = c.req.param();

        const student = await databases.getDocument<Student>(DATABASE_ID, STUDENTS_ID, studentId);

        return c.json({ data: student });
    })
    .post("/create", sessionMiddleware, zValidator("json", createStudentSchema), async (c) => {
        const databases = c.get("databases");

        const { name, code, birthDate, nationalId, phone, guardianPhone, profilePicture, address, school, gender } = c.req.valid("json");

        const { account } = await createAdminClient();

        await account.create(ID.unique(), `${code}@eltbyan.com`, `${code}`, `${name}`);

        const student = await databases.createDocument(DATABASE_ID, STUDENTS_ID, ID.unique(), {
            name,
            code,
            birthDate,
            nationalId,
            phone,
            guardianPhone,
            profilePicture,
            address,
            school,
            gender,
        });

        return c.json({ data: student, message: "تم إضافة الطالب بنجاح" });
    })
    .put("/update/:studentId", sessionMiddleware, zValidator("json", createStudentSchema), async (c) => {
        const databases = c.get("databases");

        const { name, code, birthDate, nationalId, phone, guardianPhone, profilePicture, address, school, gender } = c.req.valid("json");
        const { studentId } = c.req.param();

        const student = await databases.updateDocument(DATABASE_ID, STUDENTS_ID, studentId, {
            name,
            code,
            birthDate,
            nationalId,
            phone,
            guardianPhone,
            profilePicture,
            address,
            school,
            gender,
        });

        return c.json({ data: student, message: "تم تعديل الطالب بنجاح" });
    })
    .delete("/delete/:studentId", sessionMiddleware, async (c) => {
        const databases = c.get("databases");

        const { studentId } = c.req.param();

        const student = await databases.deleteDocument(DATABASE_ID, STUDENTS_ID, studentId);

        return c.json({ data: student, message: "تم حذف الطالب بنجاح" });
    });

export default app;
