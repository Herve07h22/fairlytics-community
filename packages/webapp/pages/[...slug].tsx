import React from "react";
import { Layout } from "antd";
import { NextPage } from "next";
import Analytics from "components/dashboard/Analytics";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NoData from "components/dashboard/card/NoData";

export const queryClient = new QueryClient();

const PageNotFound: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Layout>

          <NoData initialLoading={false} suggestedRoute={`/dashboard/${slug}`} /> 
        
          <Layout.Footer style={{ textAlign: "center" }}>
            Fairlytics 2023 - Powered by{" "}
            <a href="https://camilab.co">Camilab</a> - v2.0.1
          </Layout.Footer>
        </Layout>
      </QueryClientProvider>
    </div>
  );
};

export default PageNotFound;
