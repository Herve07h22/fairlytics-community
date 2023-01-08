import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

export const Register: React.FC<{}> = ({}) => {
  const { getKeys, isLoading, status } = useRegister();
  const [email, setEmail] = useState("");

  if (status === "error") {
    return (
      <p>
        Oups, ça ne s&apos;est pas passé comme prévu. L&apos;inscription
        n&apos;est pas possible pour le moment
      </p>
    );
  }

  if (status === "ok") {
    return (
      <div id="thank-you" className="hero-form">
        <h4>Merci pour votre inscription !</h4>
        <p className="text-xs">
          Nous préparons votre tableau de bord, et nous vous envoyons un mail
          pour vous indiquer comment équiper votre site.
        </p>
        <p className="text-xs">
          Chez nous, il n&apos;y a pas de mot de passe à noter (on les perd tout
          le temps). Alors dans le mail, vous trouverez un lien pour accéder à
          votre tableau de bord. C&apos;est une bonne idée de l&apos;ajouter à
          vos liens favoris.
        </p>
        <p className="text-xs">
          Et pour toute question, c&apos;est ici :{" "}
          <a href="mailto:fairlytics@camilab.co">fairlytics@camilab.co</a>
        </p>
      </div>
    );
  }

  return (
    <div className="hero-form field field-grouped ">
      <div className="control control-expanded">
        <input
          className="input"
          type="email"
          placeholder="Votre adresse mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="control">
        <button
          className="button button-primary button-block button-full-width"
          onClick={() => getKeys(email)}
          disabled={isLoading}
        >
          {isLoading ? "Inscription en cours..." : "Installer en 2 minutes"}
        </button>
      </div>
    </div>
  );
};
