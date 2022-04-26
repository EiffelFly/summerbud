export const getFormattedTime = (date: string): string => {
  const dateObject = new Date(date);
  const dateList = dateObject.toDateString().split(" ").slice(1);
  const yearAndDate = [dateList[1], dateList[2]].join(", ");
  return [dateList[0], yearAndDate].join(" ");
};
