import type { JSX } from "solid-js";

export type MdxShowcaseWrapperProps = {
	alt: string;
	children: JSX.Element;
};

export const MdxShowcaseWrapper = (props: MdxShowcaseWrapperProps) => {
	return (
		<div class="flex flex-col border border-gray-700">
			<div class="w-full flex min-h-[360px]">
				<div class="m-auto">{props.children}</div>
			</div>
			<div class="p-2 border-t border-gray-700">
				<span class="text-sm text-gray-400">{props.alt}</span>
			</div>
		</div>
	);
};
