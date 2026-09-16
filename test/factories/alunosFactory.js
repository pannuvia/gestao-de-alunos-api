import { faker } from '@faker-js/faker';

export function gerarAluno() {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    matricula: faker.string.uuid(),
    senha: faker.internet.password({ length: 10, memorable: false, pattern: /[A-Za-z0-9!@#$%^&*]/ }),
  };
}