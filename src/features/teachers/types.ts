import { Models } from "node-appwrite";

export enum TeacherGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

export type Teacher = Models.Document & {
    name: string;
    birthDate: string;
    nationalId: string;
    phone: string;
    gender: TeacherGender;
    hireDate: string;
    studentIds: string;
    groupIds: string;
};
