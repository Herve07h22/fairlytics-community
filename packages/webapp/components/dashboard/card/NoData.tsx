import React from "react";
import { Button, Result, Spin } from "antd";
import Link from "next/link";

const NoData: React.FC<{
  initialLoading?: boolean;
  suggestedRoute?: string;
}> = ({ initialLoading, suggestedRoute }) => {
  if (initialLoading) {
    return (
      <Result
        icon={<Spin />}
        title="Nous recherchons les données de votre site ..."
        subTitle="Ca ve va prendre que quelques secondes. Peut-être un peu plus si nos serveurs sont trop sollicités. cette opération ne ralentit pas votre site."
      />
    );
  } else {
    return suggestedRoute ? (
      <Result
        status="warning"
        title="Mettez à jour votre raccourci !"
        subTitle={
          <span>
            L&apos;adresse de la page permettant d&apos;accéder aux statistiques
            a été modifiée. La page se trouve désormais{" "}
            <a href={suggestedRoute}>ici</a>
          </span>
        }
        extra={
          <Link href={suggestedRoute}>
            <Button type="primary">Voir les statistiques de mes sites</Button>
          </Link>
        }
      />
    ) : (
      <Result
        status="404"
        title="Aucune donnée"
        subTitle="Désolé, nous n'avons pas encore de données pour votre site. Avez-vous bien ajouté la petite ligne de code mentionnée dans la page d'installation ? "
      />
    );
  }
};

export default NoData;
