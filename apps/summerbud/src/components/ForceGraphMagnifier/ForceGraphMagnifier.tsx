import { createEffect } from "solid-js";
import ForceGraph from "force-graph";

export const ForceGraphMagnifier = () => {
	const graphData = {
		nodes: [
			{ id: "Harry", name: "Harry" },
			{ id: "Sally", name: "Sally" },
			{ id: "Alice", name: "Alice" },
			{ id: "Bob", name: "Bob" },
			{ id: "Carol", name: "Carol" },
		],
		links: [
			{ source: "Harry", target: "Sally" },
			{ source: "Harry", target: "Alice" },
			{ source: "Alice", target: "Bob" },
			{ source: "Bob", target: "Carol" },
			{ source: "Alice", target: "Carol" },
		],
	};

	createEffect(() => {
		const container = document.getElementById("graph");
		if (!container) return;
		ForceGraph()(container)
			.graphData(graphData)
			.nodeColor(() => "#9ca3af");
	});

	return (
		<>
			<canvas id="zoom" class="absolute top-0 right-0" />
			<div id="graph" class="hover:cursor-cell"></div>
		</>
	);
};
