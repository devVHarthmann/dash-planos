import '../styles/Dashboard.css';
import PlanCard from './PlanCard';
import SetupJourney from './SetupJourney';

function Dashboard({ activePlan = null, activeStage = 'cadastro' }) {
  return (
    <div className="dashboard">
      <div className="dashboard-heading">
        <span className="dashboard-eyebrow">PAINEL DO CLIENTE</span>
        <h1>Bem-vindo ao GI360</h1>
        <p>Acompanhe seu plano e veja o que falta para começar.</p>
      </div>

      <PlanCard activePlan={activePlan} />
      <SetupJourney activeStage={activeStage} />
    </div>
  );
}

export default Dashboard;