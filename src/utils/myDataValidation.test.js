import { initialMyData } from './myDataStorage';
import { validateMyData } from './myDataValidation';

function completeProfile() {
  return {
    ...initialMyData,
    managerName: 'Ana Silva',
    cpf: '529.982.247-25',
    cep: '01310-100',
    phone: '(11) 98765-4321',
    email: 'ana@example.com',
    creci: '12345-F',
    legalName: 'Imobiliária Exemplo Ltda',
    tradeName: 'Imobiliária Exemplo',
    cnpj: '11.222.333/0001-81',
    stateRegistration: 'ISENTO',
    companyPhone: '(11) 2345-6789',
    companyEmail: 'contato@example.com',
    companyCreci: '67890-J',
  };
}

describe('validateMyData', () => {
  test('accepts a complete profile with valid Brazilian document check digits', () => {
    expect(validateMyData(completeProfile())).toEqual({});
  });

  test('rejects invalid CPF and CNPJ check digits', () => {
    const errors = validateMyData({
      ...completeProfile(),
      cpf: '111.111.111-11',
      cnpj: '11.222.333/0001-80',
    });

    expect(errors.cpf).toBe('Informe um CPF com 11 dígitos.');
    expect(errors.cnpj).toBe('O CNPJ informado não é válido.');
  });

  test('rejects invalid CEP, phone, email and CRECI formats', () => {
    const errors = validateMyData({
      ...completeProfile(),
      cep: '1234',
      phone: '(00) 00000-0000',
      email: 'endereco-invalido',
      creci: 'abc',
    });

    expect(errors.cep).toBe('Informe um CEP com 8 dígitos.');
    expect(errors.phone).toBe('Informe um telefone com DDD e 8 ou 9 dígitos.');
    expect(errors.email).toBe('Informe um e-mail válido.');
    expect(errors.creci).toMatch(/número do CRECI/);
  });

  test('requires business registration or an exempt status', () => {
    const errors = validateMyData({
      ...completeProfile(),
      stateRegistration: '',
    });

    expect(errors.stateRegistration).toBe(
      'Informe uma inscrição estadual válida ou use “ISENTO”.',
    );
  });
});
