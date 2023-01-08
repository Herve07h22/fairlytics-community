import Link from "next/link";

export const CallToInstall:React.FC<{}> = () => (
    <section
    id="inline-subscription-form"
    className="newsletter section text-light"
  >
    <div className="container-sm">
      <div className="newsletter-inner section-inner">
        <div className="newsletter-header text-center">
          <h2 className="section-title mt-0">
            Libérez vos utilisateurs des cookies !
          </h2>
          <p className="section-paragraph">
            Essayez gratuitement Fairlytics sur vos sites Internet.
          </p>
        </div>

        <div className="footer-form newsletter-form field field-grouped ">
          <div className="control">
            <Link href="/">
              <button className="button button-primary button-full-width">
                Installer en 2 minutes
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
)