import { Input } from "@/components/ui/input";

import { useGroupFilters } from "../hooks/use-group-filters";

export const DataFilters = () => {
    const [{ search }, setFilters] = useGroupFilters();

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <Input placeholder="بحث" className="h-8 w-full lg:w-auto" value={search ?? ""} onChange={(e) => setFilters({ search: e.target.value })} />
        </div>
    );
};
