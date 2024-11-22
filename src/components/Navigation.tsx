import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Cockpit', href: '/cockpit' },
  { name: 'Systèmes', href: '/systems' },
  { name: 'Procédures', href: '/procedures' },
  { name: 'Formations', href: '/courses' },
];

export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    <Disclosure as="nav" className="fixed w-full z-50 bg-surface/95 backdrop-blur-sm border-b border-accent/20">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4">
            <div className="relative flex h-16 items-center justify-between">
              {/* Logo et Navigation Mobile */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link to="/" className="flex items-center space-x-2">
                    <motion.span 
                      className="tech-text font-display text-xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      DCS M2000C
                    </motion.span>
                  </Link>
                </div>

                {/* Menu Mobile */}
                <div className="sm:hidden ml-4">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-accent hover:bg-accent/10 transition-colors">
                    <span className="sr-only">Menu principal</span>
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>

              {/* Navigation Desktop */}
              <div className="hidden sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `font-mono tracking-wider px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? 'text-accent border-b-2 border-accent'
                          : 'text-primary/70 hover:text-accent hover:border-b-2 hover:border-accent/50'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              {/* Authentification */}
              <div className="hidden sm:flex items-center space-x-4">
                {user ? (
                  <>
                    {user.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        className="tech-text hover:text-accent-hover transition-colors"
                      >
                        Administration
                      </Link>
                    )}
                    <Link 
                      to="/dashboard" 
                      className="tech-text hover:text-accent-hover transition-colors"
                    >
                      {user.displayName}
                    </Link>
                    <button
                      onClick={logout}
                      className="px-4 py-2 rounded-lg border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/auth/login"
                      className="px-4 py-2 rounded-lg border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200"
                    >
                      Connexion
                    </Link>
                    <Link 
                      to="/auth/register"
                      className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors shadow-glow"
                    >
                      Inscription
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Menu Mobile */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `block px-3 py-2 text-base font-mono ${
                      isActive
                        ? 'text-accent bg-accent/10'
                        : 'text-primary/70 hover:text-accent hover:bg-accent/5'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              {!user && (
                <div className="mt-4 space-y-2 px-3">
                  <Link 
                    to="/auth/login"
                    className="block w-full text-center px-4 py-2 rounded-lg border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200"
                  >
                    Connexion
                  </Link>
                  <Link 
                    to="/auth/register"
                    className="block w-full text-center px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors shadow-glow"
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}