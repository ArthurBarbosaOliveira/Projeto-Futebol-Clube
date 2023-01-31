import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import Users from '../database/models/User';
import { app } from '../app';

import * as test from '../services/jwtServicer';
import { loginValidation, Token, CheckValidation, User } from './mock/login';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('test da rota "/login"', () => {

  let chaiRes: Response;
  before(async () => {
    sinon.stub(Users, "findOne").resolves(User as Users);
  });

  after(() => {
    (Users.findOne as sinon.SinonStub).restore();
    sinon.restore();
  })

  it('Test se cadastra um novo User', async () => {
    sinon.stub(test, 'createToken').returns(Token.token)
    chaiRes = await chai.request(app).post('/login/').send(loginValidation);
    expect(chaiRes.status).to.be.equal(200);
    expect(chaiRes.body.token).to.be.equal(Token.token);
  });

  it('Test se efetua login sem o campo ', async () => {
    chaiRes = await chai.request(app).post('/login/').send({ password: loginValidation.password });
    expect(chaiRes.status).to.be.equal(400);
    expect(chaiRes.body.message).to.be.equal('All fields must be filled');
  })

  it('Test se efetua login com User inexistente', async () => {
    chaiRes = await chai.request(app).post('/login/').send(CheckValidation);
    expect(chaiRes.status).to.be.equal(401);
    expect(chaiRes.body.message).to.be.equal('Incorrect email or password');
  });

});
