const request = require('supertest');
const app = require('../server');
const { connectDB, closeDB } = require('../server');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});

describe('Testes de API', () => {
  test('Login com credenciais válidas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'teste@ecotrade.com', password: 'senhaSegura123' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Registro de novo usuário', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Novo Usuário',
        email: `teste${Date.now()}@ecotrade.com`,
        password: 'senhaSegura123',
        location: 'Brasília'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Acesso a endpoint administrativo sem autorização', async () => {
    const res = await request(app).get('/admin/users');
    expect(res.statusCode).toEqual(403);
  });
});