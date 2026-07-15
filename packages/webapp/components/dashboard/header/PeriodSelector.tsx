import React from "react";
import { DatePicker, Radio, Space } from "antd";
import moment, { Moment } from "moment";
import { dateRangeBetween, lastDays } from "domain/analytics/models/DateRange";
import { Period } from "../useElasticSearch";

const { RangePicker } = DatePicker;

const PRESETS = [14, 30, 90];

// Le picker raisonne en date locale, les buckets Elasticsearch en UTC :
// on ne retient que le jour du calendrier choisi par l'utilisateur.
const toUTCDay = (m: Moment) => new Date(Date.UTC(m.year(), m.month(), m.date()));

const PeriodSelector: React.FC<{
  period: Period;
  setPeriod: (p: Period) => void;
}> = ({ period, setPeriod }) => {
  return (
    <Space wrap className="period-selector">
      <Radio.Group
        value={period.preset}
        onChange={(e) => {
          const preset = parseInt(e.target.value);
          setPeriod({ preset, ...lastDays(preset) });
        }}
      >
        {PRESETS.map((preset) => (
          <Radio.Button key={preset} value={preset}>
            {preset} jours
          </Radio.Button>
        ))}
      </Radio.Group>
      <RangePicker
        allowClear={false}
        value={[moment.utc(period.from), moment.utc(period.to)]}
        disabledDate={(d) => d.isAfter(moment(), "day")}
        onChange={(dates) => {
          const [from, to] = dates || [];
          if (!from || !to) return;
          setPeriod(dateRangeBetween(toUTCDay(from), toUTCDay(to)));
        }}
      />
    </Space>
  );
};

export default PeriodSelector;
