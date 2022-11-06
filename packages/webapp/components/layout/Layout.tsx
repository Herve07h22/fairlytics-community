import { CallToInstall } from "components/cta/CallToInstall";
import { Footer } from "components/layout/Footer";
import { Header } from "components/layout/Header";
import { ReactNode } from "react";

export const Layout: React.FC<{
  children: ReactNode;
  title: string;
  thumbnail: string;
  displayCta?:boolean;
}> = ({ children, title, thumbnail, displayCta=true }) => (
  <div className="body-wrap boxed-container">
    <Header displayCta={displayCta}/>
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-copy">
              <h1 className="hero-title mt-0">{title}</h1>
            </div>

            <div className="hero-side-image">
              <img src={`/images/${thumbnail}`} />
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-48">{children}</section>

{ displayCta && <CallToInstall />}


    </main>
    <Footer />
  </div>
);
