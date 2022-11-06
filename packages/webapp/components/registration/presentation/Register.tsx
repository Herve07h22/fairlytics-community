import { useRegister } from "../hooks/useRegister";
import { CopyableText } from "./CopyableKey";

export const Register: React.FC<{}> = ({}) => {
  const { getKeys, keys, isLoading, error } = useRegister();

  if (error) {
    return <p>Oups, ça ne s&apos;est pas passé comme prévu. {error}</p>;
  }
  if (keys === null) {
    return (
      <button disabled={isLoading} onClick={() => getKeys()} className="button button-primary button-block">
        Générer mes clés d&apos;accès
      </button>
    );
  }
  const fairlyticsUrl = process.env.NEXT_PUBLIC_FAIRLYTICS_URL || "http://localhost"
  const scriptToAdd = `<script defer id="fairlytics-id-ajcu6jd9k7ysd6" fairlyticskey="${keys.publicKey}" src="${fairlyticsUrl}/tag/tag.js"></script>`

  return (
    <>
      <h1>Voici vos clés d&apos;accès !</h1>
      <p><b>⚠️ Attention ! Ces informations ne sont visibles qu&apos;une seule fois. Pensez à les copier/coller dans votre coffre fort !</b></p>
      <ul>
        <li>
          Votre clé privée, pour accéder à votre tableau de bord :{" "}
          <CopyableText text={keys.privateKey} />
        </li>
        <li>
          Votre clé publique, pour configurer le site dont vous voulez mesurer
          l&apos;audience : <CopyableText text={keys.publicKey} />
        </li>
      </ul>
      <p>Et maintenant ?</p>
      <p>Vous allez insérer cette ligne de code sur votre site pour le connecter à Fairlytics : </p>
      <p><CopyableText text={scriptToAdd} /></p>
      
      <p>
        Pour accéder à votre tableau de bord et connaître l&apos;audience de votre site, il faut utiliser cette url :
        <div className="has-top-divider text-center has-bottom-divider p-24">
        <a
          href={`${fairlyticsUrl}/dashboard/${keys.privateKey}`}
          target="blank"
        >
         {fairlyticsUrl}/dashboard/{keys.privateKey}
        </a>
        </div>
      </p>
      <p>Cette adresse n&apos;est pas restreinte à un mot de passe. 
        Elle est facile à partager avec les personnes que vous souhaitez autoriser à consulter l&apos;audience du site.
      </p>
    </>
  );
};
