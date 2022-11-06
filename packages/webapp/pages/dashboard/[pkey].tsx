import React from "react";
import "../../styles/Dashboard.module.css";
import { Layout } from "antd";
import { NextPage } from "next";
import Analytics from "components/dashboard/Analytics";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { pkey } = router.query;

  const isValidKey = pkey && !Array.isArray(pkey);

  if (!isValidKey) return null;

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Analytics fairlyticsKey={pkey} />
          <Layout.Footer style={{ textAlign: "center" }}>
            Fairlytics 2022 - Powered by{" "}
            <a href="https://camilab.co">Camilab</a> - v2.0.1
          </Layout.Footer>
        </Layout>
      </QueryClientProvider>
    </div>
  );
};

export default Dashboard;
