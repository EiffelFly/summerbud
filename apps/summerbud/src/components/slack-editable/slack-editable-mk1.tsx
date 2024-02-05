import { createSignal } from "solid-js";

type Position = {
	x?: number;
	y?: number;
	top?: number;
	left?: number;
};

export function SlackEditableMk1() {
	let containerRef: HTMLDivElement | undefined;
	const [text, setText] = createSignal("");
	const [hinting, setHinting] = createSignal(false);
	const [hintPositionInContainer, setHintPositionInContainer] = createSignal<Position>({});
	const hintOffset = 10;

	return (
		<div ref={containerRef!} class="relative flex flex-col gap-y-2">
			<div
				contentEditable={true}
				onKeyUp={(e) => {}}
				onKeyDown={(e) => {
					// We can get the current cursor position by using the range object

					if (e.key === "$") {
						const range = window.getSelection()?.getRangeAt(0);

						if (range) {
							const cursorPosition = range.getClientRects().item(0);

							const containerRect = containerRef?.getBoundingClientRect();

							if (containerRect && cursorPosition) {
								setHintPositionInContainer({
									top: cursorPosition.y + cursorPosition.height + hintOffset - containerRect.y,
									left: cursorPosition.x - containerRect.x,
								});
							}

							setHinting(true);
						}
					} else {
						setHinting(false);
					}
				}}
				onPaste={(e) => {
					// Prevent copying and pasting with format
					e.preventDefault();
					console.log(e.clipboardData?.getData("text"));
					document.execCommand("insertText", false, e.clipboardData?.getData("text"));
				}}
				onInput={(e) => {
					// Because each line in the contenteditable dis is a childNode
					// We can loop through all the childNodes and get the textContent
					let text = "";

					e.target.childNodes.forEach((node, i) => {
						text += (node.textContent || node.nodeValue || "").replace(/\n/g, "");

						// Every childNodes are quivalent to a new line
						if (i !== e.target.childNodes.length - 1) {
							text += "\n";
						}
					});

					setText(text);
				}}
				class="p-4 text-slate-100 whitespace-pre-wrap w-[600px] min-h-[200px] border border-slate-500"
			></div>
			<p class="text-slate-200 font-medium text-lg">Value</p>
			<div class="text-slate-300 w-[600px] break-words font-medium text-lg">
				{JSON.stringify(text())}
			</div>
			{hinting() ? (
				<div
					style={{
						top: `${hintPositionInContainer().top}px`,
						left: `${hintPositionInContainer().left}px`,
					}}
					class="flex absolute w-[300px] h-[150px] bg-slate-600"
				></div>
			) : null}
		</div>
	);
}
