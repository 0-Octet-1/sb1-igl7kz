import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Formations', href: '/formations' },
  { name: 'Guides', href: '/guides' },
  { name: 'Blog', href: '/blog' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 bg-background/80 backdrop-blur-sm z-50">
      <nav className="max-w-content mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo-aiglons.png" alt="Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-accent">
              Les Aiglons de Coureau
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="hover:text-accent transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <button className="btn">
              Connexion
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block py-2 hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button className="btn w-full mt-4">
              Connexion
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}