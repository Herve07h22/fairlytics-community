import Link from "next/link";

export const PricingItem: React.FC<{
  label: string;
  features: string[];
  price: number;
  ctaLabel: string;
  ctaLink: string;
}> = ({ label, features, price, ctaLink, ctaLabel }) => (
  <div className="pricing-table">
    <div className="pricing-table-inner">
      <div className="pricing-table-main">
        <div className="pricing-table-header">
          <div className="pricing-table-title mt-12 mb-8">{label}</div>
          <div className="pricing-table-price mb-32 pb-24">
            <span className="pricing-table-price-currency h4">€</span>
            <span className="pricing-table-price-amount h2">{price}</span>/mois
          </div>
        </div>
        <ul className="pricing-table-features list-reset text-xs mt-24 mb-56">
          {features.map((feature) => (
            <li key={feature}>
              <span className="list-icon">
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="#5FFAD0"
                    fill-rule="nonzero"
                    d="M5.6 8.4L1.6 6 0 7.6 5.6 14 16 3.6 14.4 2z"
                  ></path>
                </svg>
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="pricing-table-cta">
        <Link
          className="button button-primary button-shadow button-block"
          href={ctaLink}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  </div>
);
