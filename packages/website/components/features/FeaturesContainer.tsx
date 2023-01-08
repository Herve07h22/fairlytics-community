export const FeaturesContainer: React.FC<{
  children: React.ReactNode;
  title: string;
  subtitle: string;
}> = ({ children, title, subtitle }) => (
  <section className="features section">
    <div className="container">
      <div className="features-inner section-inner">
        <div className="features-header text-center">
          <div className="container-sm">
            <h2 className="section-title mt-0">{title}</h2>
            <p className="section-paragraph">{subtitle}</p>
          </div>
        </div>
        <div className="features-wrap">{children}</div>
      </div>
    </div>
  </section>
);
