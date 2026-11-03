function PlanCard({ activePlan }) {
  return (
    <section className="plan-card" aria-labelledby="plan-card-title">
      <div className="plan-card-copy">
        <div className="plan-card-label">
          <span className="plan-card-indicator" />
          Plano atual
        </div>
        <h2 id="plan-card-title">
          {activePlan ? activePlan.name : 'Nenhum plano ativo'}
        </h2>
        <p>
          {activePlan
            ? activePlan.description
            : 'Seu plano aparecerá aqui assim que você concluir a contratação.'}
        </p>
      </div>
      <div className="plan-card-art" aria-hidden="true">
        <svg viewBox="0 0 132 132">
          <circle cx="66" cy="66" r="58" />
          <path d="M39 69.5 57 87l37-42" />
          <path d="M99 23v17m-8.5-8.5h17M25 42v12m-6-6h12" />
        </svg>
      </div>
    </section>
  );
}

export default PlanCard;
