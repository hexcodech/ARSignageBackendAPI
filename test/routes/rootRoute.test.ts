import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /', () => {
    it('should return json', () => {
        return chai.request(app).get('/')
            .then((res) => {
                expect(res.type).to.eql('application/json');
            });
    });

    it('should return a message property containing "Hello World"', () => {
        return chai.request(app).get('/')
            .then((res) => {
                expect(res.body.message).to.eql('Hello World');
            });
    });
});
