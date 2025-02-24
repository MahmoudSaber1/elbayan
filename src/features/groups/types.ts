import { Models } from "node-appwrite";

export type Group = Models.Document & {
    name: string;
    teacherId: string;
    groupNumber: string;
    students: string[];
};
