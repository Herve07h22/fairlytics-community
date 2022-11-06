import { Card, Typography } from "antd";
import { ReactElement } from "react";


export const BorderedCard: React.FC<{
  title: string;
  children: ReactElement;
}> = ({ title, children }) => (
  <Card
    title={<Typography.Title level={3}>{title}</Typography.Title>}
    style={{ height: "100%" }}
  >
    {children}
  </Card>
);
