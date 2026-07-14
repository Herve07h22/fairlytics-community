import React from "react";
// Le dashboard est la seule page à afficher des dates : moment et la locale antd
// restent dans son bundle plutôt que dans _app, qui est chargé par toutes les pages.
import "moment/locale/fr";
import { ConfigProvider, Layout } from "antd";
import frFR from "antd/lib/locale/fr_FR";
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
      <ConfigProvider locale={frFR}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Analytics fairlyticsKey={pkey} />
            <Layout.Footer style={{ textAlign: "center" }}>
              Fairlytics 2026 - Powered by{" "}
              <a href="https://camilab.co">Camilab</a> - v2.0.2
            </Layout.Footer>
          </Layout>
        </QueryClientProvider>
      </ConfigProvider>
    </div>
  );
};

export default Dashboard;
