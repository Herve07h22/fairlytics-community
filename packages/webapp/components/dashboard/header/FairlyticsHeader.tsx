import React from "react";
import { Row, Col, Spin } from "antd";
import PeriodSelector from "./PeriodSelector";
import { Logo } from "components/icons/LogoIcon";
import Link from "next/link";
import { Period } from "../useElasticSearch";

const FairlyticsHeader: React.FC<{
  loading: boolean;
  period: Period;
  setPeriod: (p: Period) => void;
}> = ({ loading, period, setPeriod }) => {
  return (
    <Row justify="space-between" style={{ margin: "auto", maxWidth: "1200px" }}>
      <Col xs={0} md={4}>
        <div className="site-header-logo">
          <Logo />
          <Link href="/">
            <div>&nbsp;{loading ? <Spin /> : "Fairlytics"}</div>
          </Link>
        </div>
      </Col>
      <Col xs={24} md={18} xl={16}>
        <PeriodSelector period={period} setPeriod={setPeriod} />
      </Col>
    </Row>
  );
};

export default FairlyticsHeader;
