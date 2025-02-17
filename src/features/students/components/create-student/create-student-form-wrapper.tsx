import { CreateStudentForm } from "./create-student-form";

export const CreateStudentFormWrapper = ({ onCancel }: CreateStudentFormProps) => {
    return <CreateStudentForm onCancel={onCancel} />;
};
