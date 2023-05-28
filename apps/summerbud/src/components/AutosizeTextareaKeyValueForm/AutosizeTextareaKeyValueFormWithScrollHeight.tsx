import { createEffect, createSignal, on } from "solid-js";

export type AutosizeTextareaKeyValueFormWithScrollHeightProps = {
	initHeight?: boolean;
};

export const AutosizeTextareaKeyValueFormWithScrollHeight = (
	props: AutosizeTextareaKeyValueFormWithScrollHeightProps
) => {
	const [keyValue, setKeyValue] = createSignal("");
	const [textAreaValue, setTextAreaValue] = createSignal("");
	let textarea: HTMLTextAreaElement;

	createEffect(
		on(textAreaValue, () => {
			if (!textarea) return;

			if (textarea.scrollHeight < 120) {
				textarea.style.overflow = "hidden";

				if (props.initHeight) {
					textarea.style.height = "0px";
				}

				textarea.style.height = `${textarea.scrollHeight}px`;
			} else {
				textarea.style.overflow = "auto";
			}
		})
	);

	return (
		<div class="flex flex-col h-full">
			<div class="grid grid-flow-row grid-cols-2 gap-x-4 p-8">
				<div class="flex flex-col gap-y-2">
					<p class="font-sans text-base font-normal text-zinc-400">Key</p>
					<input
						class="px-3 py-2 h-10 leading-6 font-sans text-lg font-normal text-zinc-300 bg-zinc-950 border border-zinc-700 rounded"
						value={keyValue()}
						onInput={(e) => {
							setKeyValue(e.currentTarget.value);
						}}
					/>
				</div>
				<div class="flex flex-col gap-y-2">
					<p class="block font-sans text-base font-normal text-zinc-400">Value</p>
					<div class="relative flex">
						<textarea
							ref={textarea!}
							class="px-3 py-2 border w-full resize-none min-h-[40px] bg-zinc-950 border-zinc-700 rounded leading-6 font-sans text-lg font-normal text-zinc-300"
							rows={1}
							value={textAreaValue()}
							onInput={(e) => {
								let value = e.currentTarget.value;
								setTextAreaValue(value);
							}}
							style={{ "scrollbar-gutter": "stable" }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
