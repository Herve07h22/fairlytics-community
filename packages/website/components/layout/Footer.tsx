import Link from "next/link";

export const Footer: React.FC<{}> = ({}) => (
  <footer className="site-footer">
    <div className="container">
      <div className="site-footer-inner has-top-divider">
      <div className="footer-copyright">
          &copy; 2023 Fairlytics, fabriqué en Normandie
        </div>
       
        <ul className="footer-links list-reset">
          <li>
            <Link href="/">Installer</Link>
          </li>
          <li>
            <Link href="/doc/gratuit">Pourquoi est-ce gratuit ?</Link>
          </li>
          <li>
            <Link href="/doc/fonctionnement">Comment ça marche ?</Link>
          </li>
        </ul>

        <ul className="footer-links list-reset">
          <li>
            <Link href="https://www.camilab.co/contact/">Nous contacter</Link>
          </li>
          <li>
            <Link href="/doc/cgu">CGU</Link>
          </li>
          <li>
            <Link href="https://github.com/Herve07h22/fairlytics-community">Github</Link>
          </li>
        </ul>
    
        
        
      </div>
    </div>
  </footer>
);
