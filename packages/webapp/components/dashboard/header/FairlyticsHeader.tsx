import React from "react";
import { Row, Col, Spin } from "antd";
import IntervalSelector from "./IntervalSelector";
import { Logo } from "components/icons/LogoIcon";
import Link from "next/link";

const FairlyticsHeader: React.FC<{
  loading: boolean;
  interval: number;
  setInterval: (i: number) => void;
}> = ({ loading, interval, setInterval }) => {
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
      <Col xs={24} md={10} xl={8}>
        <IntervalSelector interval={interval} setInterval={setInterval} />
      </Col>
    </Row>
  );
};

export default FairlyticsHeader;
