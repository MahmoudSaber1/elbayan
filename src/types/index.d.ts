interface PropsChildren {
    children: React.ReactNode;
}

interface DottedSeparatorProps {
    className?: string;
    color?: string;
    height?: string;
    dotSize?: string;
    gapSize?: string;
    direction?: "horizontal" | "vertical";
}

interface InputFormFieldProps<T> {
    name: string;
    control: T;
    type?: string;
    placeholder?: string;
    label?: string;
    withLabel?: boolean;
    withoutImage?: boolean;
    options?: { id: string; name: string; imageUrl?: string }[];
}

interface AvatarProps {
    image?: string;
    name: string;
    className?: string;
    fallbackClassName?: string;
}

interface ResponsiveModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    className?: string;
}

interface DatePickerProps {
    value: Date | undefined;
    onChange: (value: Date | undefined) => void;
    className?: string;
    placeholder?: string;
}

interface UpdateFormProps {
    onCancel?: () => void;
    id: string;
}

// Student Props
interface GetStudentProps<T> {
    search?: string | null;
    gender?: T;
    birthDate?: string | null;
}
interface StudentActionsProps {
    id: string;
    children: React.ReactNode;
}
interface CreateStudentFormProps {
    onCancel?: () => void;
}
interface UpdateStudentFormProps<T> {
    onCancel?: () => void;
    initialValues: T;
}

// Teacher Props
interface GetTeacherProps<T> {
    search?: string | null;
    gender?: T;
    birthDate?: string | null;
}
interface TeacherActionsProps {
    id: string;
    children: React.ReactNode;
}
interface CreateTeacherFormProps {
    onCancel?: () => void;
    studentOptions?: { id: string; name: string; imageUrl?: string }[];
}
interface UpdateTeacherFormProps<T> {
    onCancel?: () => void;
    studentOptions?: { id: string; name: string; imageUrl?: string }[];
    initialValues: T;
}

// Groups Props
interface GetGroupProps {
    search?: string | null;
}
interface GroupActionsProps {
    id: string;
    children: React.ReactNode;
}
interface CreateGroupFormProps {
    onCancel?: () => void;
    teacherOptions?: { id: string; name: string; imageUrl?: string }[];
}
interface UpdateGroupFormProps<T> {
    onCancel?: () => void;
    teacherOptions?: { id: string; name: string; imageUrl?: string }[];
    initialValues: T;
}
