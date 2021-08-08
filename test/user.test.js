const request = require('supertest');
const app = require('../app');

describe('Testing E2E flow of CRUD', () => {
    let server;
    let userTestId;

    before(() => {
        server = app.listen(5000);
    });

    it('Creating user with POST -> /api/userCreate', async () => {
        const payload = {
            name: 'TEST',
            location: 'USER',
        };

        const res = await request(app).post('/api/userCreate').send(payload);
        userTestId = res.body.id;
    });

    it('Fetching user with GET -> /api/user', async () => {
        const params = {
            id: userTestId,
        };

        const res = await request(app).get('/api/user').query(params);
    });

    it('Updating user with PUT -> /api/user', async () => {
        const payload = {
            name: 'USER',
            location: 'TEST',
        };

        const params = {
            id: userTestId,
        };

        const res = await request(app)
            .put('/api/user')
            .query(params)
            .send(payload);
    });

    it('Deleting user with DELETE -> /api/user', async () => {
        const params = {
            id: userTestId,
        };

        const res = await request(app).delete('/api/user').query(params);
    });

    after(() => {
        server.close();
    });
});
