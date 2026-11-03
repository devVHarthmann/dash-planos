const STORAGE_KEY = 'gi360.meus-dados.v1';

export const initialMyData = {
  managerName: '',
  cpf: '',
  cep: '',
  photo: null,
  phone: '',
  email: '',
  creci: '',
  legalName: '',
  tradeName: '',
  cnpj: '',
  stateRegistration: '',
  logo: null,
  companyPhone: '',
  companyEmail: '',
  companyCreci: '',
};

function isImage(value) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.dataUrl === 'string' &&
    value.dataUrl.startsWith('data:image/') &&
    typeof value.name === 'string'
  );
}

function normalizeProfile(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Os dados salvos possuem um formato inválido.');
  }

  const profile = { ...initialMyData };
  Object.keys(initialMyData).forEach((key) => {
    if (key === 'photo' || key === 'logo') {
      profile[key] = isImage(value[key]) ? value[key] : null;
    } else if (typeof value[key] === 'string') {
      profile[key] = value[key];
    }
  });
  return profile;
}

export function loadMyData() {
  const storedValue = window.localStorage.getItem(STORAGE_KEY);
  if (!storedValue) return { ...initialMyData };

  try {
    return normalizeProfile(JSON.parse(storedValue));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Não foi possível ler os dados salvos. Revise ou substitua o cadastro antes de salvar.');
    }
    throw error;
  }
}

export function saveMyData(profile) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
