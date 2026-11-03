import { useEffect, useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MyDataPage from './components/MyDataPage';
import PagePlaceholder from './components/PagePlaceholder';
import Sidebar from './components/Sidebar';
import './styles/App.css';

const pages = {
  dashboard: {
    title: 'Dashboard',
  },
  'meus-dados': {
    title: 'Meus Dados',
  },
  produtos: {
    title: 'Produtos',
  },
  'meus-contratos': {
    title: 'Meus Contratos',
  },
};

function getCurrentPage() {
  const page = window.location.hash.slice(1);
  return Object.prototype.hasOwnProperty.call(pages, page) ? page : 'dashboard';
}

function App() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage);

  useEffect(() => {
    function handleHashChange() {
      setCurrentPage(getCurrentPage());
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="app-layout">
        <Sidebar activePage={currentPage} />
        <main className="app-content">
          {currentPage === 'dashboard' ? (
            <Dashboard />
          ) : currentPage === 'meus-dados' ? (
            <MyDataPage />
          ) : (
            <PagePlaceholder title={pages[currentPage].title} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
