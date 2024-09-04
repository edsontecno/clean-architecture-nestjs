import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // Número de usuários virtuais
  duration: '5s', // Duração total do teste
};

export default function () {
  const res = http.get('http://192.168.1.195:3000/category/2');

  check(res, {
    'status was 200': (r) => r.status === 200,
    'response time was <= 200ms': (r) => r.timings.duration <= 200,
  });

  sleep(1); // Pausa de 1 segundo entre as requisições
}
