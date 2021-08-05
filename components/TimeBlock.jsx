const TimeBlock = ({ date, className }) => {
  const dateObject = new Date(date);
  const dateList = dateObject.toDateString().split(' ').slice(1)
  const yearAndDate = [dateList[1], dateList[2]].join(", ")
  const dateFormat = [dateList[0], yearAndDate].join(" ")
  console.log(yearAndDate)
  return (
    <div
      className={"font-sans " + className}
    >
      {dateFormat}
    </div>
  )
}

export default TimeBlock;