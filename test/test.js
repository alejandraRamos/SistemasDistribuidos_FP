const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const expect = chai.expect;

describe('Api Test', () => {
  const query = {
    name: 'John'
  };

  //Get Front
  it('Consume GET Front Service', async () => {
    const response = await agent.get('http://localhost:8080/');
    
    expect(response.status).to.equal(statusCode.OK);
    expect(response.type).to.equal('text/html');
  });
  
  //Post 
  it('Consume POST Back Service with query parameters', async () => {
    const response = await agent.post('http://localhost:3000/add')
    .query(query);

    expect(response.status).to.equal(statusCode.OK);
  });
  
  //GET Back  
  it('Consume GET Back Service', async () => {
    const response = await agent.get('http://localhost:3000/');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.not.equal('');
    expect(response.body[0].name).to.equal(query.name);
  });
});
