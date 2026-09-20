import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE ERROR:', msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('UNCAUGHT PAGE ERROR:', error.message);
    console.log(error.stack);
  });

  console.log('Navigating to http://localhost:3000/admin...');
  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle2' });

  console.log('Clicking deploy button...');
  await page.click('#deploy-contract-btn');

  console.log('Waiting for a bit...');
  await new Promise(r => setTimeout(r, 2000));

  await browser.close();
})();
