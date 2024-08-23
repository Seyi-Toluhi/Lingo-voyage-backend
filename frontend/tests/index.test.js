const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { fireEvent, getByText } = require('@testing-library/dom');

// testing that landing page has required buttons, links and text

describe('Landing page has required buttons and text', () => {
  test('profile link exists', () => {
  const htmlFilePath = path.resolve(__dirname, '../index.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const dom = new JSDOM(htmlContent, { url: 'http://localhost' });
  const { document } = dom.window;
  const profileLink = document.querySelector('.user_profile') 

  expect(document.querySelector('.user_profile')).not.toBeNull()  
  expect(profileLink.textContent).not.toBe("Profil") 
  expect(profileLink.textContent).toBe("Profile") 
}) 

  test('learn button exists', () => {
  const htmlFilePath = path.resolve(__dirname, '../index.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const dom = new JSDOM(htmlContent, { url: 'http://localhost' });
  const { document } = dom.window;
  const learnButton = document.querySelector('.dropdown button')
 
  expect(learnButton).not.toBeNull()  
  expect(learnButton.textContent).toContain("Learn")  
}) 

  test('login link exists', () => {
  const htmlFilePath = path.resolve(__dirname, '../index.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const dom = new JSDOM(htmlContent, { url: 'http://localhost' });
  const { document } = dom.window;

  expect(document.querySelector('#get_login_form')).not.toBeNull() 
  expect(document.querySelector('#get_login_form a').textContent).toBe("Log in")
}) 

  test('signup link exists', () => {
    const htmlFilePath = path.resolve(__dirname, '../index.html');
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
    const dom = new JSDOM(htmlContent, { url: 'http://localhost' });
    const { document } = dom.window;

    expect(document.querySelector('#get_sign_up_form')).not.toBeNull() 
    expect(document.querySelector('#get_sign_up_form a').textContent).toBe("Sign up")
  }) 

  test('app name renders on webpage', () => {
  const htmlFilePath = path.resolve(__dirname, '../index.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const dom = new JSDOM(htmlContent, { url: 'http://localhost' });
  const { document } = dom.window;

  const appName = document.querySelector("header")
  expect(appName.textContent).toBe("Lingo Voyage")  
  
}) 
  test('game description renders on webpage', () => {
  const htmlFilePath = path.resolve(__dirname, '../index.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const dom = new JSDOM(htmlContent, { url: 'http://localhost' });
  const { document } = dom.window;

  const textCenter = document.querySelector('.text-center')
  expect(textCenter.textContent).not.toBeNull 
  
}) 
  });

// testing that buttons on landing page fetch required form and pages

// describe('testing that buttons on landing page fetch required form and pages', () => {

//   test('Profile button fetches profile page', () => {
//   const htmlFilePath = path.resolve(__dirname, '../index.html');
//   const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
//   const dom = new JSDOM(htmlContent, { url: 'http://localhost' });
//   const { document } = dom.window;
//   const profileLink = document.querySelector('.user_profile')
//   fireEvent.click(profileLink)

//   const generatedpage = document.querySelector("#profile_content")
//   console.log(generatedpage)

//   expect(generatedpage).not.toBeNull() 
// }) 
//   });

//try using Playwright to simulate the webpage