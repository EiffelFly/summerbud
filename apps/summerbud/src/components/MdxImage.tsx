export type MdxImageProps = {
	src: string;
	alt: string;
};

export const MdxImage = (props: MdxImageProps) => {
	return (
		<div class="flex flex-col border border-gray-700">
			<div class="p-[1px]">
				<img src={props.src} alt={props.alt} class="w-full h-auto" />
			</div>
			<div class="p-2 border-t border-gray-700">
				<span class="text-sm text-gray-400">{props.alt}</span>
			</div>
		</div>
	);
};
