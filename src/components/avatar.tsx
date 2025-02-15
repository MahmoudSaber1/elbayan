import Image from "next/image";

import { cn } from "@/lib/utils";

import { Avatar as AvatarComp, AvatarFallback } from "@/components/ui/avatar";

export const Avatar = ({ name, className, image, fallbackClassName }: AvatarProps) => {
	if (image) {
		return (
			<div className={cn("size-5 relative rounded-md overflow-hidden", className)}>
				<Image src={image} alt={name} fill className="object-cover" />
			</div>
		);
	}

	return (
		<AvatarComp className={cn("size-5 rounded-md", className)}>
			<AvatarFallback className={cn("text-white bg-blue-600 font-semibold text-sm uppercase rounded-md", fallbackClassName)}>{name.charAt(0)}</AvatarFallback>
		</AvatarComp>
	);
};
