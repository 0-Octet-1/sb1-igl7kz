import { Link } from 'react-router-dom';

const footerLinks = {
  formation: [
    { name: 'Parcours', href: '/parcours' },
    { name: 'Modules', href: '/modules' },
    { name: 'Certification', href: '/certification' },
  ],
  ressources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Guides', href: '/guides' },
    { name: 'FAQ', href: '/faq' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Confidentialité', href: '/confidentialite' },
    { name: 'CGU', href: '/cgu' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-accent capitalize mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-primary/80 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-primary/10 text-center">
          <p className="text-primary/80">
            © {new Date().getFullYear()} Les Aiglons de Coureau - Formation DCS M2000C
          </p>
          <p className="text-sm text-primary/60 mt-2">
            Développé avec passion par <span className="text-accent">Le Terte Grégory</span>
          </p>
        </div>
      </div>
    </footer>
  );
}