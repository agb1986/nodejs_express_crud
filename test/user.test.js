const assert = require('chai').assert;
const expect = require('chai').expect;
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
        assert.equal(res.statusCode, 200);
        assert.isNotEmpty(res.body);
        assert.equal(res.body.name, payload.name);
        assert.equal(res.body.location, payload.location);
        userTestId = res.body.id;
    });

    it('Fetching user with GET -> /api/user', async () => {
        const params = {
            id: userTestId,
        };

        const res = await request(app).get('/api/user').query(params);
        assert.equal(res.statusCode, 200);
        assert.isNotEmpty(res.body);
        assert.equal(res.body.id, userTestId);
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
        assert.equal(res.statusCode, 200);
        expect(res.text).to.include(`User Updated: ${userTestId}`);
    });

    it('Deleting user with DELETE -> /api/user', async () => {
        const params = {
            id: userTestId,
        };

        let res = await request(app).delete('/api/user').query(params);
        assert.equal(res.statusCode, 200);
        expect(res.text).to.include(`User Deleted: ${userTestId}`);
    });

    after(() => {
        server.close();
    });
});

describe('Negative test of CRUD functions', () => {
    let server;
    let userTestId = 'NEGATIVE_TEST_ID';

    before(() => {
        server = app.listen(5000);
    });

    it('Testing 404 of GET -> /api/user', async () => {
        const params = {
            id: userTestId,
        };

        const res = await request(app).get('/api/user').query(params);
        assert.equal(res.statusCode, 404);
        assert.equal(res.text, 'Not Found');
    });

    it('Testing 404 of PUT -> /api/user', async () => {
        const params = {
            id: userTestId,
        };

        const res = await request(app).put('/api/user').query(params);
        assert.equal(res.statusCode, 404);
        assert.equal(res.text, 'Not Found');
    });

    it('Testing 404 of DELETE -> /api/user', async () => {
        const params = {
            id: userTestId,
        };

        const res = await request(app).delete('/api/user').query(params);
        assert.equal(res.statusCode, 404);
        assert.equal(res.text, 'Not Found');
    });

    after(() => {
        server.close();
    });
});
