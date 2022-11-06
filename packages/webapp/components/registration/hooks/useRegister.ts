import { FairlyticsKey } from "domain/sites/models/FairlyticsKey";
import { Result } from "domain/helpers/Result";
import { useState } from "react";

export const useRegister = () => {
  const [keys, setKeys] = useState<FairlyticsKey | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getKeys = () => {
    setLoading(true);
    fetch("/api/register")
      .then((res) => res.json())
      .then((result: Result<FairlyticsKey>) => {
        if (result.error) {
          setError(result.error);
        } else {
          setKeys(result.value || null);
        }
      })
      .catch((e) =>
        setError("L'inscription n'est pas possible pour le moment.")
      )
      .finally(() => setLoading(false));
  };

  return { getKeys, keys, isLoading, error };
};
