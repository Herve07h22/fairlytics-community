import React from "react";
import { Radio } from "antd";

const IntervalSelector: React.FC<{
  interval: number;
  setInterval: (i: number) => void;
}> = ({ interval, setInterval }) => {
  return (
    <Radio.Group
      value={interval}
      onChange={(e) => setInterval(parseInt(e.target.value))}
    >
      <Radio.Button value={14}>14 jours</Radio.Button>
      <Radio.Button value={30}>30 jours</Radio.Button>
      <Radio.Button value={90}>90 jours</Radio.Button>
    </Radio.Group>
  );
};

export default IntervalSelector;
