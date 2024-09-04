import { BusinessRuleException } from 'src/filtros/business-rule-exception';

export const fieldIsValid = (field: any, message: string) => {
  if (field === undefined) {
    throw new BusinessRuleException(message);
  }

  if (typeof field === 'number' && field < 0) {
    throw new BusinessRuleException(message);
  }

  if (typeof field === 'string' && field === '') {
    throw new BusinessRuleException(message);
  }

  if (Array.isArray(field) && field.length < 1) {
    throw new BusinessRuleException(message);
  }
};

export const emailIsValid = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const copyFields = (origin, target) => {
  console.log(target, Object.keys(target));
  Object.keys(target).forEach((chave) => {
    console.log(chave);
    if (origin.hasOwnProperty(chave)) {
      target[chave] = origin[chave];
    }
  });
};

export const timeInMinutes = (begin, end) => {
  const diferencaEmMilissegundos = Math.abs(end - begin);

  const minutos = Math.floor(diferencaEmMilissegundos / (1000 * 60));

  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;

  let resultado = '';
  if (horas > 0) {
    resultado += `${horas} hora(s) `;
  }
  resultado += `${minutosRestantes} minuto(s)`;

  return resultado;
};
