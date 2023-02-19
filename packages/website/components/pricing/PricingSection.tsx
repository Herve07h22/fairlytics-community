import { PricingItem } from "./PricingItem";

export const PricingSection: React.FC<{title:string}> = ({title}) => (
  <section id="pricing" className="pricing section">
    <div className="section-square"></div>
    <div className="container">
      <div className="pricing-inner section-inner has-top-divider">
        <h2 className="section-title mt-0 text-center">
          {title}
        </h2>
        <div className="pricing-tables-wrap">
          <PricingItem
            label="Gratuit"
            price={0}
            ctaLabel="Mais pourquoi ?"
            ctaLink="/doc/gratuit"
            features={[
              "Multi-sites",
              "Dashboard partageable",
              "Hébergé en France",
              "Communautaire",
              "Installable chez vous",
            ]}
          />
        </div>
      </div>
    </div>
  </section>
);
