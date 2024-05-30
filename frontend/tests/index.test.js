const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('HTML page has login tool', () => {
  test('login link exists', () => {
  const htmlFilePath = path.resolve(__dirname, '../index.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const dom = new JSDOM(htmlContent, { url: 'http://localhost' });
  const { document } = dom.window;

  expect(document.querySelector('#game_description')).not.toBeNull()  
  expect(document.querySelector('#get_login_form')).not.toBeNull() 
}) 
  test('game description renders on webpage', () => {
  const htmlFilePath = path.resolve(__dirname, '../index.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const dom = new JSDOM(htmlContent, { url: 'http://localhost' });
  const { document } = dom.window;
  const learn_yoruba = document.querySelector('#learn_yoruba')
  expect(learn_yoruba.textContent).toBe(`Yoruba`)  
  
}) 
  });