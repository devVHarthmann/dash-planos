function digitsOnly(value, limit) {
  return value.replace(/\D/g, '').slice(0, limit);
}

export function maskCpf(value) {
  const digits = digitsOnly(value, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function maskCnpj(value) {
  const digits = digitsOnly(value, 14);
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

export function maskCep(value) {
  return digitsOnly(value, 8).replace(/(\d{5})(\d)/, '$1-$2');
}

export function maskPhone(value) {
  const digits = digitsOnly(value, 11);
  if (digits.length < 3) return digits ? `(${digits}` : '';

  const areaCode = digits.slice(0, 2);
  const subscriber = digits.slice(2);
  if (digits.length <= 10) {
    return `(${areaCode}) ${subscriber.replace(/(\d{4})(\d)/, '$1-$2')}`;
  }
  return `(${areaCode}) ${subscriber.replace(/(\d{5})(\d)/, '$1-$2')}`;
}

export function maskCreci(value) {
  return value.toLocaleUpperCase('pt-BR').replace(/[^A-Z0-9./-]/g, '').slice(0, 24);
}
