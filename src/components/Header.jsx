import { useEffect, useRef, useState } from 'react';
import '../styles/Header.css';

function ChevronIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="profile-chevron">
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="menu-icon">
      <circle cx="10" cy="6.5" r="3" />
      <path d="M4.5 17v-1.5a5.5 5.5 0 0 1 11 0V17z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="menu-icon">
      <path d="M10 7.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" />
      <path d="m16.2 11.6 1.1.9-1.5 2.6-1.4-.5a6.9 6.9 0 0 1-1.6.9l-.3 1.5h-3l-.3-1.5a6.9 6.9 0 0 1-1.6-.9l-1.4.5-1.5-2.6 1.1-.9a6 6 0 0 1 0-1.8l-1.1-.9 1.5-2.6 1.4.5a6.9 6.9 0 0 1 1.6-.9l.3-1.5h3l.3 1.5a6.9 6.9 0 0 1 1.6.9l1.4-.5 1.5 2.6-1.1.9a6 6 0 0 1 0 1.8Z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="menu-icon">
      <path d="M8 3H4.5A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17H8" />
      <path d="M11 13.5 14.5 10 11 6.5M7 10h7.5" />
    </svg>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    function handlePointerDown(event) {
      if (!profileRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="GI360 — página inicial">
        <svg
          className="brand-mark"
          viewBox="0 0 205 48"
          role="img"
          aria-label="GI360"
        >
          <path
            d="M25 42H5V18L25 3l20 15v24H32V27H18v15"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <text
            x="50"
            y="41"
            fill="currentColor"
            fontFamily="Arial, sans-serif"
            fontSize="39"
            fontWeight="700"
            letterSpacing="-2"
          >
            GI360°
          </text>
        </svg>
      </a>

      <div className="profile" ref={profileRef}>
        <button
          className="profile-trigger"
          type="button"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          aria-controls="profile-menu"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          ref={triggerRef}
        >
          <img className="profile-avatar" src="/avatar-placeholder.svg" alt="" />
          <span className="profile-label">Minha conta</span>
          <ChevronIcon />
        </button>

        {isMenuOpen && (
          <div className="profile-menu" id="profile-menu" role="menu">
            <div className="profile-summary">
              <img
                className="profile-avatar profile-avatar--menu"
                src="/avatar-placeholder.svg"
                alt=""
              />
              <span className="profile-details">
                <strong>Usuário GI360</strong>
                <span>Acesso administrativo</span>
              </span>
            </div>

            <div className="profile-menu-divider" />

            <button
              className="profile-menu-item"
              type="button"
              role="menuitem"
              onClick={closeMenu}
            >
              <ProfileIcon />
              Meu perfil
            </button>
            <button
              className="profile-menu-item"
              type="button"
              role="menuitem"
              onClick={closeMenu}
            >
              <SettingsIcon />
              Configurações
            </button>

            <div className="profile-menu-divider" />

            <button
              className="profile-menu-item profile-menu-item--logout"
              type="button"
              role="menuitem"
              onClick={closeMenu}
            >
              <LogoutIcon />
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;