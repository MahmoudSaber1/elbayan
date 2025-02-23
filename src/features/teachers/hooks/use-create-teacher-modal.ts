import { useQueryState, parseAsBoolean } from "nuqs";

export const useCreateTeachersModal = () => {
    const [isOpen, setIsOpen] = useQueryState("create-teacher", parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }));

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return { isOpen, open, close, setIsOpen };
};
