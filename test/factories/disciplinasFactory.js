import { faker } from '@faker-js/faker';

export function gerarDisciplina() {
  return {
    nome: faker.hacker.noun(),
    codigo: faker.string.uuid(),
    cargaHoraria: faker.number.int({ min: 30, max: 120 }),
  };
}