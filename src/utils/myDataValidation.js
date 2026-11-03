function digitsOnly(value) {
  return value.replace(/\D/g, '');
}

function isRepeatedDigits(value) {
  return /^(\d)\1+$/.test(value);
}

function hasValidCpfCheckDigits(digits) {
  const firstDigit = (digits.slice(0, 9).split('').reduce(
    (sum, digit, index) => sum + Number(digit) * (10 - index),
    0,
  ) * 10) % 11;
  const expectedFirst = firstDigit === 10 ? 0 : firstDigit;

  const secondDigit = (digits.slice(0, 10).split('').reduce(
    (sum, digit, index) => sum + Number(digit) * (11 - index),
    0,
  ) * 10) % 11;
  const expectedSecond = secondDigit === 10 ? 0 : secondDigit;

  return (
    Number(digits[9]) === expectedFirst &&
    Number(digits[10]) === expectedSecond
  );
}

function hasValidCnpjCheckDigits(digits) {
  const calculateDigit = (value, weights) => {
    const sum = value.split('').reduce(
      (total, digit, index) => total + Number(digit) * weights[index],
      0,
    );
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calculateDigit(
    digits.slice(0, 12),
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );
  const secondDigit = calculateDigit(
    digits.slice(0, 12) + firstDigit,
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );

  return (
    Number(digits[12]) === firstDigit &&
    Number(digits[13]) === secondDigit
  );
}

function validateRequiredText(value, label) {
  return value.trim().length >= 2
    ? ''
    : `Informe ${label.toLocaleLowerCase('pt-BR')} (mínimo de 2 caracteres).`;
}

function validateCpf(value) {
  const digits = digitsOnly(value);
  if (digits.length !== 11 || isRepeatedDigits(digits)) {
    return 'Informe um CPF com 11 dígitos.';
  }
  return hasValidCpfCheckDigits(digits) ? '' : 'O CPF informado não é válido.';
}

function validateCnpj(value) {
  const digits = digitsOnly(value);
  if (digits.length !== 14 || isRepeatedDigits(digits)) {
    return 'Informe um CNPJ com 14 dígitos.';
  }
  return hasValidCnpjCheckDigits(digits) ? '' : 'O CNPJ informado não é válido.';
}

function validateCep(value) {
  const digits = digitsOnly(value);
  if (digits.length !== 8 || isRepeatedDigits(digits)) {
    return 'Informe um CEP com 8 dígitos.';
  }
  return '';
}

function validatePhone(value) {
  const digits = digitsOnly(value);
  if (![10, 11].includes(digits.length) || isRepeatedDigits(digits)) {
    return 'Informe um telefone com DDD e 8 ou 9 dígitos.';
  }

  const areaCode = Number(digits.slice(0, 2));
  const subscriber = digits.slice(2);
  const isMobile = subscriber.length === 9 && subscriber.startsWith('9');
  const isLandline = subscriber.length === 8 && /^[2-5]/.test(subscriber);

  if (areaCode < 11 || areaCode > 99 || (!isMobile && !isLandline)) {
    return 'Confira o DDD e o número do telefone.';
  }
  return '';
}

function validateEmail(value) {
  const email = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
    ? ''
    : 'Informe um e-mail válido.';
}

function validateCreci(value) {
  const creci = value.trim();
  return /^\d{1,8}(?:[-/.]?[A-Z]{1,3})?$/i.test(creci)
    ? ''
    : 'Informe o número do CRECI, com sufixo opcional (ex.: 12345-F).';
}

function validateStateRegistration(value) {
  const registration = value.trim();
  if (/^isento$/i.test(registration)) return '';
  return /^[A-Z0-9][A-Z0-9./-]{2,19}$/i.test(registration)
    ? ''
    : 'Informe uma inscrição estadual válida ou use “ISENTO”.';
}

const validators = {
  managerName: (value) => validateRequiredText(value, 'seu nome'),
  cpf: validateCpf,
  cep: validateCep,
  phone: validatePhone,
  email: validateEmail,
  creci: validateCreci,
  legalName: (value) => validateRequiredText(value, 'a razão social'),
  tradeName: (value) => validateRequiredText(value, 'o nome fantasia'),
  cnpj: validateCnpj,
  stateRegistration: validateStateRegistration,
  companyPhone: validatePhone,
  companyEmail: validateEmail,
  companyCreci: validateCreci,
};

export function validateMyData(profile) {
  return Object.entries(validators).reduce((errors, [field, validator]) => {
    const error = validator(profile[field] || '');
    if (error) errors[field] = error;
    return errors;
  }, {});
}
