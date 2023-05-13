export function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getFormattedTime(date: string) {
	const dateObject = new Date(date);
	const dateList = dateObject.toDateString().split(" ").slice(1);
	const yearAndDate = [dateList[1], dateList[2]].join(", ");
	return [dateList[0], yearAndDate].join(" ");
}
