import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from './server';

describe('Server Express - Tests d\'intégration', () => {
  
  test('GET / devrait retourner "Server is up and running!"', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    expect(response.text).toBe('Server is up and running!');
  });

  test('POST /average devrait retourner la moyenne des nombres fournis', async () => {
    const response = await request(app)
        .post('/average')
        .send({ numbers: [1, 2, 3, 4, 5] });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ average: 3 });
  });

});
