import { sameDay } from "./helpers";

export const formatTimeSeries = ({
  format,
  xLabelsArray,
  yDataArray,
}: {
  format: string;
  xLabelsArray: string[];
  yDataArray: number[];
}) => {
  let nbValeursAttendues = 14;
  switch (format) {
    case "now-30d":
      nbValeursAttendues = 30;
      break;
    case "now-90d":
      nbValeursAttendues = 90;
      break;
    default:
      nbValeursAttendues = 14;
  }

  let xLabelsArrayToDate = xLabelsArray.map((d) => new Date(d));

  let yDataArrayFormatted: number[] = [];
  const emptyArray = new Array(nbValeursAttendues).fill(new Date());

  let xLabelsArrayFormatted = emptyArray.map((_, i) => {
    let d = new Date();
    let computedDate = new Date(
      d.setDate(d.getDate() - (nbValeursAttendues - i - 1))
    );
    let valueIndex = xLabelsArrayToDate.findIndex((e) =>
      sameDay(e, computedDate)
    );
    yDataArrayFormatted[i] = valueIndex >= 0 ? yDataArray[valueIndex] : 0;
    return computedDate;
  });

  return { xLabelsArrayFormatted, yDataArrayFormatted };
};
