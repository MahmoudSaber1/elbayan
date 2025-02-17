import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

import { CreateStudentModal } from "@/features/students/components/create-student/create-student-modal";
import { UpdateStudentModal } from "@/features/students/components/update-student/update-task-modal";

const DashboardLayout = ({ children }: PropsChildren) => {
    return (
        <div className="min-h-screen">
            <CreateStudentModal />
            <UpdateStudentModal />
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
