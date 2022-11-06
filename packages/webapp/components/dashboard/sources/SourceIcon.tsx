import React from "react";
import {
  TwitterOutlined,
  GoogleOutlined,
  MediumOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  PlayCircleOutlined,
  LinkOutlined,
} from "@ant-design/icons";

const SourceIcon:React.FC<{label:string}> = ({ label }) => {
  if (label.indexOf(".google.") >= 0) return <GoogleOutlined />;
  if (label.indexOf("t.co/") >= 0) return <TwitterOutlined />;
  if (label.indexOf("medium.com/") >= 0) return <MediumOutlined />;
  if (label.indexOf("facebook.com/") >= 0) return <FacebookOutlined />;
  if (label.indexOf("linkedin.") >= 0) return <LinkedinOutlined />;
  if (label.indexOf("instagram.") >= 0) return <InstagramOutlined />;
  if (label === "") return <PlayCircleOutlined />;
  return <LinkOutlined />;
};

export default SourceIcon;
