import { parseAsString, useQueryStates } from "nuqs";

export const useGroupFilters = () => {
    return useQueryStates({
        search: parseAsString,
    });
};
