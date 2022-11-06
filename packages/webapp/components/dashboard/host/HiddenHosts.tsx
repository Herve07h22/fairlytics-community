import React from "react";
import { Alert } from "antd";
import { HostStats } from "domain/analytics/models/HostStats";

const HiddenHosts: React.FC<{ data: HostStats[] }> = ({ data }) => {
  const listeDesNoms = (
    <div>
      Les mesures d&apos;audience des sites suivants sont masquées car ils
      comportent moins d&apos;une visite par jour :
      <ul>
        {data.map((host) => (
          <li key={host.hostname}>{host.hostname}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <Alert
      message="Pourquoi je ne vois pas tous mes sites ?"
      description={listeDesNoms}
      type="info"
      showIcon
    />
  );
};

export default HiddenHosts;
