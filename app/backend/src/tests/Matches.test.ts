import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import modelMatched from '../database/models/Matches';

import Matches from './mock/matche';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testar a rota de Matcher', function () {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(modelMatched, "findAll")
        .resolves(Matches as unknown as modelMatched[]);    
    });
  
    after(()=>{
      (modelMatched.findAll as sinon.SinonStub).restore();
    })
  
    it('Testar o retorno da classificação', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
  
      expect(chaiHttpResponse.body).to.length(40);  
    });
  
  });