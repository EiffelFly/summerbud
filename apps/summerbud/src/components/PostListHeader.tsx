export const PostListHeader = (props: { title: string; description: string }) => {
	return (
		<div class="flex flex-col gap-y-4 mb-16">
			<h1 class="text-4xl font-bold text-slate-300">{props.title}</h1>
			<p class="text-lg text-gray-400 font-sans font-normal">{props.description}</p>
		</div>
	);
};
