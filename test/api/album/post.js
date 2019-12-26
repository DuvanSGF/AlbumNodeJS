process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server.js');
const conn = require('../../../db/index.js');

describe('POST /album', () => {
  before((done) => {
    conn.connect()
    .then(() => done ())
    .catch((err) => done(err));
  })

  after((done) => {
    conn.close()
    .then(() => done())
    .catch((err) => done(err));
  })

  it('Ok, Creando una nueva entrada', (done) => {
    request(app).post('/album')
    .send({ name: 'Otro trago', artist:"Sech"})
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('_id');
      expect(body).to.contain.property('name');
      expect(body).to.contain.property('artist');
      done();
    })
    .catch((err) => done(err));
});

/*it('Fallo, Entrada require Nombre Artista', (done) => {
  request(app).post('/album')
    .send({ name: 'sola' })
    .then((res) => {
      const body = res.body;
      expect(body.errors.text.name)
        .to.equal('ValidatorError')
      done();
    })
    .catch((err) => done(err));
});*/
})
