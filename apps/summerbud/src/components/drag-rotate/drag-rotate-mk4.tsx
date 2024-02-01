import { createEffect, createSignal, onCleanup } from "solid-js";

export function DragRotateMK4() {
	let targetRef: HTMLDivElement | undefined;

	const [isDragging, setIsDragging] = createSignal(false);
	const [rotation, setRotation] = createSignal(0);

	createEffect(() => {
		function onMouseUp() {
			console.log("hehehe");
			setIsDragging(false);
		}

		function onMouseMove(e: MouseEvent) {
			if (!isDragging() || !targetRef) return;
			const rect = targetRef.getBoundingClientRect();

			const origin = {
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2,
			};

			const mousePos = {
				x: e.clientX,
				y: e.clientY,
			};

			const rad = Math.atan2(mousePos.y - origin.y, mousePos.x - origin.x);

			const angle = (rad * 180) / Math.PI;

			setRotation(angle - 45);
		}

		addEventListener("mouseup", onMouseUp);
		addEventListener("mousemove", onMouseMove);

		onCleanup(() => {
			removeEventListener("mouseup", onMouseUp);
			removeEventListener("mousemove", onMouseMove);
		});
	});

	return (
		<div
			style={{
				transform: `rotate(${rotation()}deg)`,
			}}
			ref={targetRef!}
			class="flex relative w-[200px] h-[200px] border border-slate-500"
		>
			<div
				onMouseDown={() => {
					setIsDragging(true);
				}}
				class="absolute bottom-0 right-0 cursor-alias translate-x-full translate-y-full rounded-full w-3 h-3 bg-slate-600"
			></div>
		</div>
	);
}
