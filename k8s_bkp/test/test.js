import http from 'k6/http';
import { sleep } from 'k6';

// Configura o teste para 50 usuários simultâneos durante 5 minutos
export const options = {
  stages: [
    { duration: '1m', target: 20 }, // Sobe até 20 usuários simultâneos em 1 minuto
    { duration: '3m', target: 50 }, // Mantém 50 usuários por 3 minutos
    { duration: '1m', target: 0 },  // Gradualmente desce para 0 usuários
  ],
};

export default function () {
  // Substitua a URL abaixo pela URL de sua aplicação
  const res = http.get('http://localhost:3000/category/1');
  sleep(1);  // Simula 1 segundo de espera entre as requisições
}
