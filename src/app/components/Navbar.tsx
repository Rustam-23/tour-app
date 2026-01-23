'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/', label: 'Экскурсии' },
  { href: '/reviews', label: 'Отзывы' },
  { href: '/about', label: 'Обо мне' },
  { href: '/contacts', label: 'Контакты' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const toggleMenu = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen((prev) => !prev);
    }, 50);
  }, []);

  const closeMenu = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside, {
      passive: true,
    });
    document.addEventListener('keydown', handleEscape, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const NavLink = useCallback(
    ({
      href,
      children,
      className = '',
      onClick,
    }: {
      href: string;
      children: React.ReactNode;
      className?: string;
      onClick?: () => void;
    }) => {
      const isActive = pathname === href;

      return (
        <Link
          href={href}
          className={`nav-link relative px-3 py-1.5 rounded-md text-gray-900 font-medium 
                              ${isActive && href !== '/' ? 'border-2 border-white' : ''}
                              transition-all duration-300 ease-in-out 
                              transform hover:scale-105 active:scale-95
                              focus:outline-none focus:ring-0 ${className}`}
          onClick={onClick}
          aria-current={isActive ? 'page' : undefined}
          prefetch={false}
        >
          {children}
        </Link>
      );
    },
    [pathname],
  );

  return (
    <nav
      className="sticky top-0 z-50 bg-cyan-600 text-gray-900 py-2 px-4 shadow-lg"
      role="navigation"
      aria-label="Главная навигация"
      style={{ contain: 'layout style paint' }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex items-center space-x-4 transition-transform hover:scale-[1.02]"
            aria-label="На главную страницу"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="/images/logo.png"
                alt="Klio Travel Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-xl md:text-2xl font-extrabold leading-none">
              Klio Travel
            </span>
          </Link>
          {/*</NavLink>*/}
        </div>

        <div className="hidden md:flex space-x-4" role="menubar">
          {menuItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          ref={buttonRef}
          className="md:hidden text-gray-900 p-1.5 rounded-md hover:bg-cyan-700 
                        transition-all duration-300 ease-in-out transform hover:scale-110 
                        active:scale-95 focus:outline-none focus:ring-0"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-haspopup="true"
          style={{
            minHeight: '44px',
            minWidth: '44px',
            WebkitTapHighlightColor: 'transparent',
            outline: 'none',
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ pointerEvents: 'none' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
              }
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="md:hidden mt-2 space-y-2 animate-fade-in bg-cyan-600 rounded-md shadow-md"
          role="menu"
          aria-labelledby="mobile-menu-button"
          style={{ contain: 'layout style paint' }}
        >
          {menuItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="block py-3 px-4 hover:bg-cyan-700 rounded-md 
                                transition-all duration-300 ease-in-out transform hover:scale-105
                                focus:outline-none focus:ring-0"
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
