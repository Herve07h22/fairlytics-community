import React from "react";
import ReactEcharts from "echarts-for-react";
//import "echarts/theme/macarons";
import { FormattedNumber } from "../datatable/FormattedNumber";

const CHARTCONFIG = {
  color: {
    primary: "rgba(16,142,233,.85)", // #108ee9
    success: "rgba(61,189,125,.85)", // #3dbd7d
    info: "rgba(1,188,212,.85)", // #01BCD4
    infoAlt: "rgba(148,138,236,.85)", // #948aec
    warning: "rgba(255,206,61,.85)", // #ffce3d
    danger: "rgba(244,110,101,.85)", // #f46e65
    gray: "rgba(221,221,221,.3)",
    text: "#898989", // for dark theme as well
    splitLine: "rgba(0,0,0,.05)",
    splitArea: ["rgba(250,250,250,0.035)", "rgba(200,200,200,0.1)"],
  },
};

type ChartPropsType = { xLabelsArray:string[], yDataArray:number[], serieLabel:string }

const setData = ({ xLabelsArray, yDataArray, serieLabel }:ChartPropsType) => ({
  tooltip: {
    trigger: "axis",
  },
  calculable: true,
  xAxis: [
    {
      type: "category",
      data: xLabelsArray,
      axisLabel: {
        //show:false,
        rotate: 90,
        textStyle: {
          color: CHARTCONFIG.color.text,
        },
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine,
        },
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      axisLabel: {
        textStyle: {
          color: CHARTCONFIG.color.text,
        },
        formatter: function (value:number) {
          return FormattedNumber(value);
        },
      },
      splitLine: {
        lineStyle: {
          color: CHARTCONFIG.color.splitLine,
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: CHARTCONFIG.color.splitArea,
        },
      },
    },
  ],
  series: [
    {
      name: serieLabel,
      type: "bar",
      data: yDataArray,
      itemStyle: {
        color: "#3E00EE",
      },
    },
  ],
});

const Chart:React.FC<ChartPropsType> = ({ xLabelsArray, yDataArray, serieLabel }) => (
  <ReactEcharts
    option={setData({ xLabelsArray, yDataArray, serieLabel })}
    theme={"macarons"}
  />
);

export default Chart;
