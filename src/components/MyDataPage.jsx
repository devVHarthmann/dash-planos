import { useEffect, useState } from 'react';
import FormField from './FormField';
import ImageUploadField from './ImageUploadField';
import {
  maskCep,
  maskCnpj,
  maskCpf,
  maskCreci,
  maskPhone,
} from '../utils/myDataMasks';
import { initialMyData, loadMyData, saveMyData } from '../utils/myDataStorage';
import { validateMyData } from '../utils/myDataValidation';
import '../styles/MyData.css';

const fieldGroups = {
  managerName: {
    label: 'Nome do gestor',
    placeholder: 'Nome completo',
    autoComplete: 'name',
  },
  cpf: {
    label: 'CPF',
    placeholder: '000.000.000-00',
    inputMode: 'numeric',
    format: maskCpf,
  },
  cep: {
    label: 'CEP',
    placeholder: '00000-000',
    inputMode: 'numeric',
    format: maskCep,
  },
  phone: {
    label: 'Fone',
    placeholder: '(00) 00000-0000',
    type: 'tel',
    inputMode: 'tel',
    autoComplete: 'tel',
    format: maskPhone,
  },
  email: {
    label: 'E-mail',
    placeholder: 'voce@empresa.com.br',
    type: 'email',
    autoComplete: 'email',
  },
  creci: {
    label: 'CRECI',
    placeholder: 'Ex.: 12345-F',
    format: maskCreci,
  },
  legalName: {
    label: 'Razão social',
    placeholder: 'Razão social da empresa',
    autoComplete: 'organization',
  },
  tradeName: {
    label: 'Nome fantasia',
    placeholder: 'Nome fantasia',
    autoComplete: 'organization',
  },
  cnpj: {
    label: 'CNPJ',
    placeholder: '00.000.000/0000-00',
    inputMode: 'numeric',
    format: maskCnpj,
  },
  stateRegistration: {
    label: 'Inscrição estadual',
    placeholder: 'Inscrição estadual',
  },
  companyPhone: {
    label: 'Fone',
    placeholder: '(00) 00000-0000',
    type: 'tel',
    inputMode: 'tel',
    format: maskPhone,
  },
  companyEmail: {
    label: 'E-mail',
    placeholder: 'contato@empresa.com.br',
    type: 'email',
  },
  companyCreci: {
    label: 'CRECI da empresa',
    placeholder: 'Ex.: 12345-J',
    format: maskCreci,
  },
};

function MyDataPage() {
  const [profile, setProfile] = useState(initialMyData);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [imageError, setImageError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    try {
      setProfile(loadMyData());
    } catch (error) {
      setFeedback({ type: 'error', message: error.message });
    } finally {
      setIsLoading(false);
    }
  }, []);

  function updateField(name, value) {
    setProfile((currentProfile) => ({ ...currentProfile, [name]: value }));
    if (fieldErrors[name]) {
      const currentError = validateMyData({ ...profile, [name]: value })[name];
      setFieldErrors((currentErrors) => {
        const nextErrors = { ...currentErrors };
        if (currentError) {
          nextErrors[name] = currentError;
        } else {
          delete nextErrors[name];
        }
        return nextErrors;
      });
    }
    setFeedback(null);
  }

  function renderField(name) {
    const config = fieldGroups[name];
    return (
      <FormField
        key={name}
        id={name}
        {...config}
        value={profile[name]}
        error={fieldErrors[name]}
        onBlur={() => {
          const error = validateMyData(profile)[name];
          setFieldErrors((currentErrors) => {
            const nextErrors = { ...currentErrors };
            if (error) {
              nextErrors[name] = error;
            } else {
              delete nextErrors[name];
            }
            return nextErrors;
          });
        }}
        onChange={(event) => {
          const value = config.format
            ? config.format(event.target.value)
            : event.target.value;
          updateField(name, value);
        }}
      />
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validateMyData(profile);
    setFieldErrors(errors);
    const invalidField = Object.keys(errors)[0];
    if (invalidField) {
      setFeedback({
        type: 'error',
        message: 'Revise os campos destacados antes de salvar.',
      });
      document.getElementById(invalidField)?.focus();
      return;
    }

    try {
      saveMyData(profile);
      setFeedback({
        type: 'success',
        message: 'Seus dados foram salvos com sucesso.',
      });
    } catch {
      setFeedback({
        type: 'error',
        message: 'O navegador não conseguiu salvar os dados. Verifique as permissões e o espaço disponível e tente novamente.',
      });
    }
  }

  return (
    <section className="my-data-page" aria-labelledby="my-data-title">
      <header className="my-data-heading">
        <div>
          <span className="dashboard-eyebrow">PAINEL DO CLIENTE</span>
          <h1 id="my-data-title">Meus Dados</h1>
          <p>Gerencie seus dados pessoais e as informações da sua empresa.</p>
        </div>
      </header>

      {isLoading ? (
        <p className="my-data-loading" role="status">
          Carregando seus dados...
        </p>
      ) : (
        <form className="my-data-form" onSubmit={handleSubmit} noValidate>
          <div className="my-data-columns">
            <section className="my-data-column" aria-labelledby="personal-title">
              <h2 id="personal-title">Dados do gestor</h2>
              <div className="my-data-fields">
                <div className="my-data-field--wide">{renderField('managerName')}</div>
                {renderField('cpf')}
                {renderField('cep')}
                <ImageUploadField
                  id="photo"
                  label="Foto"
                  image={profile.photo}
                  onChange={(image) => updateField('photo', image)}
                  onError={setImageError}
                />
                {renderField('phone')}
                {renderField('email')}
                {renderField('creci')}
              </div>
            </section>

            <section className="my-data-column" aria-labelledby="company-title">
              <h2 id="company-title">Dados da empresa</h2>
              <div className="my-data-fields">
                {renderField('legalName')}
                {renderField('tradeName')}
                {renderField('cnpj')}
                {renderField('stateRegistration')}
                <ImageUploadField
                  id="logo"
                  label="Logotipo"
                  image={profile.logo}
                  onChange={(image) => updateField('logo', image)}
                  onError={setImageError}
                />
                {renderField('companyPhone')}
                {renderField('companyEmail')}
                <div className="my-data-field--wide">
                  {renderField('companyCreci')}
                </div>
              </div>
            </section>
          </div>

          <footer className="my-data-form-footer">
            <div className="my-data-messages" aria-live="polite">
              {imageError && (
                <p className="my-data-feedback my-data-feedback--error">
                  {imageError}
                </p>
              )}
              {feedback && (
                <p
                  className={`my-data-feedback my-data-feedback--${feedback.type}`}
                  role={feedback.type === 'error' ? 'alert' : 'status'}
                >
                  {feedback.message}
                </p>
              )}
            </div>
            <button className="my-data-save-button" type="submit">
              Salvar alterações
            </button>
          </footer>
        </form>
      )}
    </section>
  );
}

export default MyDataPage;
