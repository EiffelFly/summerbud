import cn from "clsx";
import type { Component, JSX } from "solid-js";

export type LinkProps = {
	dest: string;
	className?: string;
	children: JSX.Element;
};

export const Link: Component<LinkProps> = (props: LinkProps) => {
	const isInternalLink = props.dest && (props.dest.startsWith("/") || props.dest.startsWith("#"));
	return isInternalLink ? (
		<a
			rel="prefetch"
			href={props.dest}
			class={cn(
				"my-auto font-sans text-sm font-normal text-gray-300 cursor-pointer hover:underline",
				props.className
			)}
		>
			{props.children}
		</a>
	) : (
		<a
			href={props.dest}
			target="_blank"
			rel="noopener noreferrer"
			class={cn(
				"my-auto font-sans text-sm font-normal text-gray-300 cursor-pointer hover:underline",
				props.className
			)}
		>
			{props.children}
		</a>
	);
};
