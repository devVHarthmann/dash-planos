import { useState } from 'react';
import '../styles/Sidebar.css';

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    id: 'meus-dados',
    label: 'Meus Dados',
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
  },
  {
    id: 'produtos',
    label: 'Produtos',
    icon: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
  },
  {
    id: 'meus-contratos',
    label: 'Meus Contratos',
    icon: (
      <>
        <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M14 3v5h5m-9 4h5m-5 4h5" />
      </>
    ),
  },
];

function Sidebar({ activePage }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function closeSidebar() {
    setIsExpanded(false);
  }

  return (
    <>
      {isExpanded && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Fechar menu"
          onClick={closeSidebar}
        />
      )}
      <aside
        className={`sidebar${isExpanded ? ' sidebar--expanded' : ''}`}
        aria-label="Navegação principal"
      >
        <button
          className="sidebar-toggle"
          type="button"
          aria-label={isExpanded ? 'Recolher menu' : 'Expandir menu'}
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="m8 4 6 6-6 6" />
          </svg>
        </button>
        <nav className="sidebar-nav">
          {navigationItems.map((item) => {
            const isActive = activePage === item.id;

            return (
              <a
                className={`sidebar-link${isActive ? ' sidebar-link--active' : ''}`}
                href={`#${item.id}`}
                key={item.id}
                aria-current={isActive ? 'page' : undefined}
                title={!isExpanded ? item.label : undefined}
                onClick={closeSidebar}
              >
                <svg className="sidebar-icon" viewBox="0 0 24 24" aria-hidden="true">
                  {item.icon}
                </svg>
                <span className="sidebar-link-label">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;