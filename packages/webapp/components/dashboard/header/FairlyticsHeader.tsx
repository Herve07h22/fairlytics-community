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
    <Row
      align="middle"
      justify="space-between"
      style={{ margin: "auto", maxWidth: "1200px" }}
    >
      <Col xs={5} md={4} className="site-header-logo-col">
        <div className="site-header-logo">
          <Logo />
          <Link href="/">
            <div className="site-header-logo-text">
              &nbsp;{loading ? <Spin /> : "Fairlytics"}
            </div>
          </Link>
        </div>
      </Col>
      <Col xs={19} md={18} xl={16} className="site-header-controls-col">
        <PeriodSelector period={period} setPeriod={setPeriod} />
      </Col>
    </Row>
  );
};

export default FairlyticsHeader;
