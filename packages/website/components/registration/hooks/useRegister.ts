import { useState } from "react";

export const useRegister = () => {
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState<"ok" | "error" | "not set">("not set");

  const getKeys = (email: string) => {
    if (!process.env.NEXT_PUBLIC_FAIRLYTICS_REGISTER_URL) {
      console.error("NEXT_PUBLIC_FAIRLYTICS_REGISTER_URL is not set");
      return;
    }

    setLoading(true);
    fetch(process.env.NEXT_PUBLIC_FAIRLYTICS_REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then(() => setStatus("ok"))
      .catch((e) => setStatus("error"))
      .finally(() => setLoading(false));
  };

  return { getKeys, isLoading, status };
};
