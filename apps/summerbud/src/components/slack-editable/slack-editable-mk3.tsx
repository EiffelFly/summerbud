import cn from "clsx";
import { createSignal } from "solid-js";
import { CHARACTERS } from "./characters";

type Position = {
	x?: number;
	y?: number;
	top?: number;
	left?: number;
};

// Implement highlighted select

export function SlackEditableMk3() {
	let containerRef: HTMLDivElement | undefined;
	let hintsContainer: HTMLDivElement | undefined;
	const [text, setText] = createSignal("");
	const [hinting, setHinting] = createSignal(false);
	const [hintPositionInContainer, setHintPositionInContainer] = createSignal<Position>({});
	const hintOffset = 10;
	const [highlightedHintIndex, setHighlightedHintIndex] = createSignal(0);

	return (
		<div ref={containerRef!} class="relative flex flex-col gap-y-2">
			<div
				contentEditable={true}
				onKeyUp={(e) => {}}
				onKeyDown={(e) => {
					// We can get the current cursor position by using the range object

					switch (e.key) {
						case "$": {
							const range = window.getSelection()?.getRangeAt(0);

							if (range && containerRef) {
								const cursorPosition = range.getClientRects().item(0);

								const containerRect = containerRef.getBoundingClientRect();

								if (cursorPosition) {
									setHintPositionInContainer({
										top: cursorPosition.y + cursorPosition.height + hintOffset - containerRect.y,
										left: cursorPosition.x - containerRect.x,
									});
								} else {
									// For the cursor set on the newline, the Range's getClientRects() will return an
									// empty DOMRect, we deal with it by inserting a zero width space character and
									// called the getClientRects() again

									const tmpNode = document.createTextNode("\ufeff");
									range.insertNode(tmpNode);
									const tempCursorPosition = range.getClientRects().item(0);
									tmpNode.remove();

									if (tempCursorPosition) {
										setHintPositionInContainer({
											top:
												tempCursorPosition.y +
												tempCursorPosition.height +
												hintOffset -
												containerRect.y,
											left: tempCursorPosition.x - containerRect.x,
										});
									}
								}

								setHinting(true);
							}
							break;
						}
						case "ArrowDown": {
							if (hinting()) {
								e.preventDefault();
								let newIdx = 0;
								setHighlightedHintIndex((prev) => {
									newIdx = Math.min(prev + 1, CHARACTERS.length - 1);
									return newIdx;
								});

								hintsContainer?.querySelector(`#character-hint-${newIdx}`)?.scrollIntoView({
									block: "nearest",
									behavior: "smooth",
								});
							}

							break;
						}
						case "ArrowUp": {
							if (hinting()) {
								e.preventDefault();
								let newIdx = 0;

								setHighlightedHintIndex((prev) => {
									newIdx = Math.max(prev - 1, 0);
									return newIdx;
								});

								hintsContainer
									?.querySelector(`#character-hint-${newIdx}`)
									?.scrollIntoView({ block: "nearest", behavior: "smooth" });
							}

							break;
						}
						case "Enter": {
							if (hinting()) {
								e.preventDefault();
								const currentRange = window.getSelection()?.getRangeAt(0);
								const span = document.createElement("span");

								const hintResult = CHARACTERS[highlightedHintIndex()]
									? `$${CHARACTERS[highlightedHintIndex()]}`
									: null;
								span.ariaLabel = hintResult;
								span.textContent = hintResult;
								span.className = "bg-slate-500 text-slate-100 font-medium py-0.5 px-1 rounded-md";

								if (currentRange?.endOffset) {
									const deleteRange = new Range();
									deleteRange.setStart(
										currentRange.commonAncestorContainer,
										currentRange.endOffset - 1
									);
									deleteRange.setEnd(currentRange.commonAncestorContainer, currentRange.endOffset);
									deleteRange.deleteContents();
								}

								currentRange?.insertNode(span);

								const range = new Range();
								range.collapse(true);
								range.setStartAfter(span);
								range.setEndAfter(span);
								window.getSelection()?.removeAllRanges();
								window.getSelection()?.addRange(range);
								setHinting(false);
							}

							break;
						}
						default: {
							setHinting(false);
							break;
						}
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
					ref={hintsContainer!}
					style={{
						top: `${hintPositionInContainer().top}px`,
						left: `${hintPositionInContainer().left}px`,
					}}
					class="flex absolute w-[300px] h-[200px] bg-slate-600 flex-col py-4 overflow-y-auto"
				>
					{CHARACTERS.map((char, i) => {
						return (
							<div
								id={`character-hint-${i}`}
								class={cn(
									"px-4 py-1 text-base font-medium text-slate-300",
									highlightedHintIndex() === i ? "bg-slate-500" : ""
								)}
							>
								{char}
							</div>
						);
					})}
				</div>
			) : null}
		</div>
	);
}
