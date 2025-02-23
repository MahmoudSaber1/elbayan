import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

import { UpdateGroupModal } from "@/features/groups/components/update-group/update-group-modal";
import { CreateGroupModal } from "@/features/groups/components/create-group/create-group-modal";
import { UpdateStudentModal } from "@/features/students/components/update-student/update-task-modal";
import { CreateStudentModal } from "@/features/students/components/create-student/create-student-modal";
import { CreateTeacherModal } from "@/features/teachers/components/create-teacher/create-teacher-modal";
import { UpdateTeacherModal } from "@/features/teachers/components/update-teacher/update-teacher-modal";

const DashboardLayout = ({ children }: PropsChildren) => {
    return (
        <div className="min-h-screen">
            <CreateStudentModal />
            <UpdateStudentModal />
            <CreateTeacherModal />
            <UpdateTeacherModal />
            <CreateGroupModal />
            <UpdateGroupModal />
            <div className="flex w-full h-full">
                <div className="fixed right-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
                    <Sidebar />
                </div>
                <div className="lg:pr-[264px] w-full">
                    <div className="mx-auto max-w-screen-2xl h-full">
                        <Navbar />
                        <main className="h-full py-8 px-6 flex flex-col">{children}</main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
