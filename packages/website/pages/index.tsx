import { CallToInstall } from "components/cta/CallToInstall";
import { Feature } from "components/features/Feature";
import { LeafIcon } from "components/icons/LeafIcon";
import { MobileIcon } from "components/icons/MobileIcon";
import { EnhanceIcon } from "components/icons/EnhanceIcon";
import { TodolistIcon } from "components/icons/TodolistIcon";
import { FeaturesContainer } from "components/features/FeaturesContainer";
import { Footer } from "components/layout/Footer";
import { Header } from "components/layout/Header";
import { HeroIllustration } from "components/icons/HeroIllustration";
import { Testimonial } from "components/testimonial/Testimonial";
import { TestimonialContainer } from "components/testimonial/TestimonialContainer";
import type { NextPage } from "next";
import Image from "next/image";

import screenshotPic from "../public/images/screenshot.png";
import { Register } from "../components/registration/presentation/Register";
import { SEO } from "components/layout/SEO";

const Home: NextPage = () => {
  return (
    <div className="body-wrap boxed-container">
      <SEO />
      <Header displayCta={false} />
      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-copy">
                <h1 className="hero-title mt-0">
                  La mesure d&apos;audience sans cookie.
                </h1>
                <p className="hero-paragraph">
                  Obtenez les statistiques de fréquentation de votre site
                  Internet en respectant la vie privée de vos visiteurs. Pas de
                  cookie. Pas de traceur.
                </p>

                <Register />
              </div>
              <HeroIllustration />
            </div>
          </div>
        </section>

        <FeaturesContainer
          title="Voici Fairlytics"
          subtitle="Un outil simple qui rend votre site Internet plus agréable à consulter."
        >
          <Feature
            icon={<LeafIcon />}
            title="Fluide"
            content={
              <span>
                Fairlytics n&apos;installe <strong>rien</strong> sur
                l&apos;ordinateur ou le smartphone de vos visiteurs. Donc plus
                besoin d&apos;ajouter une pop-up énervante qui demande
                d&apos;accepter les cookies.
              </span>
            }
          />
          <Feature
            icon={<MobileIcon />}
            title="Facile"
            content={
              <span>
                <strong>Une</strong> ligne de code suffit pour que la mesure
                d&apos;audience de votre site soit immédiatement opérationnelle.
              </span>
            }
          />
          <Feature
            icon={<EnhanceIcon />}
            title="Rapide"
            content="Fairlytics ne ralentit pas votre site. Il s'exécute en arrière plan, toujours après le chargement de vos textes et vos images."
          />
          <Feature
            icon={<TodolistIcon />}
            title="Intuitif"
            content="Analysez facilement les données anonymes pour améliorer votre site : nombre de visites, pages les plus consultées, provenance des visiteurs, etc ..."
          />
        </FeaturesContainer>

        <FeaturesContainer
          title="Vos données, en une page"
          subtitle="Traffic journalier, pages les plus vues, chemin privilégié par vos visiteurs, sources et horaire des visites, matériel utilisé : tout y est, sauf la complexité."
        >
          <Image src={screenshotPic} alt="Fairlytics screenshot" />
        </FeaturesContainer>

        <TestimonialContainer>
          <Testimonial
            happyUser="M. Zuckerberg"
            image="testimonial-04.jpg"
            comment="C'est scandaleux de se priver d'installer des traceurs alors qu'ils permettent de vendre des publicités à prix d'or."
          />
          <Testimonial
            happyUser="M. Zuckerberg"
            image="testimonial-04.jpg"
            comment="C'est scandaleux de se priver d'installer des traceurs alors qu'ils permettent de vendre des publicités à prix d'or."
          />
          <Testimonial
            happyUser="M. Zuckerberg"
            image="testimonial-04.jpg"
            comment="C'est scandaleux de se priver d'installer des traceurs alors qu'ils permettent de vendre des publicités à prix d'or."
          />
        </TestimonialContainer>
        <CallToInstall />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
