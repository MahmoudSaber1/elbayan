import { Models } from "node-appwrite";

export enum StudentGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

export type Student = Models.Document & {
    name: string;
    code: string;
    birthDate: string;
    nationalId: string;
    phone: string;
    guardianPhone: string;
    profilePicture: string;
    address: string;
    school: string;
    gender: StudentGender;
};
