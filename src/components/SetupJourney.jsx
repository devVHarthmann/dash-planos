const stages = [
  {
    id: 'cadastro',
    title: 'Cadastro de dados',
    description: 'Conte um pouco sobre você e sua empresa.',
  },
  {
    id: 'plano',
    title: 'Escolha do plano',
    description: 'Veja as opções e escolha a que faz mais sentido.',
  },
  {
    id: 'pagamento',
    title: 'Pagamento',
    description: 'Confirme seus dados para concluir a contratação.',
  },
  {
    id: 'administrar',
    title: 'Administrar',
    description: 'Acesse seu painel e acompanhe tudo em um só lugar.',
  },
];

function JourneyStep({ stage, index, isComplete, isCurrent }) {
  const className = [
    'journey-step',
    isComplete && 'journey-step--complete',
    isCurrent && 'journey-step--current',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li
      className={className}
      aria-current={isCurrent ? 'step' : undefined}
    >
      <span className="journey-step-marker" aria-hidden="true">
        {isComplete ? (
          <svg viewBox="0 0 16 16">
            <path d="m3.5 8 3 3 6-6" />
          </svg>
        ) : (
          index + 1
        )}
      </span>
      <span className="journey-step-copy">
        <span className="journey-step-title">{stage.title}</span>
        <span className="journey-step-description">{stage.description}</span>
      </span>
      {isCurrent && (
        <span className="journey-step-status">Comece aqui</span>
      )}
    </li>
  );
}

function SetupJourney({ activeStage }) {
  const foundStageIndex = stages.findIndex((stage) => stage.id === activeStage);
  const currentStageIndex = foundStageIndex === -1 ? 0 : foundStageIndex;
  const hasReachedAdministration = currentStageIndex === stages.length - 1;
  const visibleStages = hasReachedAdministration
    ? stages.slice(0, -1)
    : stages;

  return (
    <section className="journey-card" aria-labelledby="journey-title">
      <div className="journey-heading">
        <div>
          <h2 id="journey-title">
            {hasReachedAdministration
              ? 'Tudo pronto para começar'
              : 'Para começar'}
          </h2>
          <p>
            {hasReachedAdministration
              ? 'Sua conta está configurada. Bom trabalho!'
              : 'Complete estas etapas no seu ritmo. Estamos aqui para ajudar.'}
          </p>
        </div>
        <span className="journey-count">
          {hasReachedAdministration
            ? 'Tudo concluído'
            : `${currentStageIndex + 1} de ${stages.length} etapas`}
        </span>
      </div>

      <ol
        className="journey-steps"
        style={{ '--step-count': visibleStages.length }}
      >
        {visibleStages.map((stage, index) => (
          <JourneyStep
            key={stage.id}
            stage={stage}
            index={index}
            isComplete={
              hasReachedAdministration || index < currentStageIndex
            }
            isCurrent={
              !hasReachedAdministration && index === currentStageIndex
            }
          />
        ))}
      </ol>
    </section>
  );
}

export default SetupJourney;
