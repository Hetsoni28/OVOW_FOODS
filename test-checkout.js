const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', exception => {
    console.log('BROWSER EXCEPTION:', exception);
  });

  try {
    console.log('Navigating to menu...');
    await page.goto('http://localhost:3000/menu');
    
    console.log('Adding item to cart...');
    await page.waitForSelector('button:has-text("Add to Cart")');
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes("Add to Cart")) {
        await btn.click();
        break;
      }
    }
    
    await new Promise(r => setTimeout(r, 1000));
    
    console.log('Navigating to checkout...');
    await page.goto('http://localhost:3000/checkout');
    
    await new Promise(r => setTimeout(r, 2000));
    
    const errorText = await page.evaluate(() => {
      const err = document.querySelector('.bg-red-50');
      return err ? err.textContent : null;
    });
    
    if (errorText) {
      console.log('EXTRACTED ERROR BOUNDARY TEXT:', errorText);
    } else {
      console.log('No error boundary found on page.');
    }
  } catch (err) {
    console.log('PUPPETEER ERROR:', err);
  } finally {
    await browser.close();
  }
})();
