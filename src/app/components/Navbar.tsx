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
    const timeoutRef = useRef<NodeJS.Timeout>();

    // Debounced toggle для предотвращения множественных кликов
    const toggleMenu = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setIsMenuOpen((prev) => !prev);
        }, 50); // Небольшая задержка для debouncing
    }, []);

    const closeMenu = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsMenuOpen(false);
    }, []);

    // Очистка timeout при размонтировании
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Пассивные слушатели событий для лучшей производительности
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

        // Используем пассивные слушатели
        document.addEventListener('mousedown', handleClickOutside, { passive: true });
        document.addEventListener('keydown', handleEscape, { passive: true });

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isMenuOpen, closeMenu]);

    // Закрытие меню при изменении маршрута
    useEffect(() => {
        closeMenu();
    }, [pathname, closeMenu]);

    const NavLink = useCallback(({ href, children, className = '', onClick }: {
        href: string;
        children: React.ReactNode;
        className?: string;
        onClick?: () => void;
    }) => {
        const isActive = pathname === href;

        return (
            <Link
                href={href}
                className={`nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'} ${className}`}
                onClick={onClick}
                aria-current={isActive ? 'page' : undefined}
                prefetch={false} // Отключаем prefetch для улучшения производительности
            >
                {children}
            </Link>
        );
    }, [pathname]);

    return (
        <nav
            className="bg-blue-600 text-white p-4 relative"
            role="navigation"
            aria-label="Главная навигация"
            style={{ contain: 'layout style paint' }} // CSS containment
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">
                    <NavLink href="/">Экскурсии</NavLink>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-4" role="menubar">
                    {menuItems.map((item) => (
                        <NavLink key={item.href} href={item.href}>
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    ref={buttonRef}
                    className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded p-2 touch-manipulation"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                    aria-haspopup="true"
                    style={{
                        minHeight: '44px',
                        minWidth: '44px',
                        WebkitTapHighlightColor: 'transparent'
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
                            d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div
                    ref={menuRef}
                    id="mobile-menu"
                    className="md:hidden mt-2 space-y-2 animate-fade-in"
                    role="menu"
                    aria-labelledby="mobile-menu-button"
                    style={{ contain: 'layout style paint' }}
                >
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            className="block py-3 px-2"
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
