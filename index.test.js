const request = require("supertest");
const app = require('./server');

describe('Test my app server', () => {
    it('Get main page', async () => {
        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(200);
    })

    it('Send a empty request', async () => {
        const res = await request(app)
        .post('/calculateRate')
        .type('form')
        .send({
            origem: '', 
            destino: '', 
            tempo_ligacao: '', 
            plano: ''
        })
        expect(res.statusCode).toEqual(400);
        expect(res._body).toHaveProperty('error');
    })

    it('Send a complete request', async () => {
        const res = await request(app)
        .post('/calculateRate')
        .type('form')
        .send({
            origem: '011', 
            destino: '016', 
            tempo_ligacao: '10', 
            plano: '30'
        })
        expect(res.statusCode).toEqual(200);
        expect(res._body).toHaveProperty('result');
    })
})