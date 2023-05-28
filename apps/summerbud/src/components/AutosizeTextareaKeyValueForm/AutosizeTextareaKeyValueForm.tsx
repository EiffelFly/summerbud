import cn from "clsx";
import { createEffect, createSignal, on } from "solid-js";

export const AutosizeTextareaKeyValueForm = () => {
	const [keyValue, setKeyValue] = createSignal("");
	const [textAreaValue, setTextAreaValue] = createSignal("");
	let textareaFontStyle = "font-sans text-lg leading-6 font-normal text-zinc-300";
	let textareaPadding = "py-2 scroll-py-2 px-3";
	let textareaBreakWord = "whitespace-break-spaces break-all";
	let textareaMaxHeight = 120;

	let textarea: HTMLTextAreaElement | undefined;

	createEffect(
		on(textAreaValue, () => {
			if (!textarea) return;

			if (textarea.scrollHeight > textareaMaxHeight) {
				textarea.style.overflow = "auto";
			} else {
				textarea.style.overflow = "hidden";
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
						<div
							class={cn(
								"border-none w-full invisible !m-0 box-border",
								textareaPadding,
								textareaFontStyle,
								textareaBreakWord
							)}
							style={{
								"max-height": `${textareaMaxHeight}px`,
							}}
							contentEditable={true}
						>
							{"initial one line \n" + textAreaValue()}
						</div>
						<textarea
							ref={textarea!}
							class={cn(
								"border max-w-full overflow-hidden !m-0 box-border resize-none w-full h-full bg-zinc-950 border-zinc-700 rounded absolute top-0 left-0",
								textareaPadding,
								textareaFontStyle,
								textareaBreakWord
							)}
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
