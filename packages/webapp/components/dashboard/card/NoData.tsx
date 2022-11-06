import React from 'react';
import { Result, Spin } from 'antd';

const NoData:React.FC<{initialLoading?:boolean}> = ({initialLoading}) => {
    if (initialLoading ) {
        return <Result
        icon={<Spin />}
        title="Nous recherchons les données de votre site ..."
        subTitle="Ca ve va prendre que quelques secondes. Peut-être un peu plus si nos serveurs sont trop sollicités. cette opération ne ralentit pas votre site."
        />
    } else {
        return <Result
            status="404"
            title="Aucune donnée"
            subTitle="Désolé, nous n'avons pas encore de données pour votre site. Avez-vous bien ajouté la petite ligne de code mentionnée dans la page d'installation ? "
        />
    }
}


export default NoData
