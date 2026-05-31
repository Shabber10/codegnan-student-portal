const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function capture() {
  const edgePathDefault = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePathDefault = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  
  let executablePath = '';
  
  if (fs.existsSync(edgePathDefault)) {
    executablePath = edgePathDefault;
    console.log(`Using Microsoft Edge at: ${executablePath}`);
  } else if (fs.existsSync(chromePathDefault)) {
    executablePath = chromePathDefault;
    console.log(`Using Google Chrome at: ${executablePath}`);
  } else {
    console.error('Could not find Microsoft Edge or Google Chrome. Please configure executablePath manually.');
    process.exit(1);
  }

  try {
    const browser = await puppeteer.launch({
      executablePath,
      headless: true,
      defaultViewport: { width: 1440, height: 960 }
    });

    const page = await browser.newPage();
    
    // Visit Home Page
    console.log('Navigating to http://localhost:3000 ...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    // Wait for animation rendering and calendar grids loading
    console.log('Waiting for calendar grids & streaks animation...');
    await new Promise(r => setTimeout(r, 4000));
    
    const screenshotDir = 'C:\\Users\\SHABBER HUSSAIN\\Desktop\\codegnan';
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    
    const pathHome = path.join(screenshotDir, 'Replicated_Home_Portal.png');
    console.log(`Taking dashboard screenshot to: ${pathHome}`);
    await page.screenshot({ path: pathHome, fullPage: false });
    
    // Switch page to Curriculum
    console.log('Navigating to Curriculum Page...');
    await page.evaluate(() => {
      // Access navigation triggers inside client
      document.querySelector('[data-page="curriculum"]').click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    const pathCurriculum = path.join(screenshotDir, 'Replicated_Curriculum_Portal.png');
    console.log(`Taking curriculum screenshot to: ${pathCurriculum}`);
    await page.screenshot({ path: pathCurriculum, fullPage: false });

    // Switch page to Profile
    console.log('Navigating to Profile Page...');
    await page.evaluate(() => {
      document.querySelector('[data-page="profile"]').click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    const pathProfile = path.join(screenshotDir, 'Replicated_Profile_Portal.png');
    console.log(`Taking profile screenshot to: ${pathProfile}`);
    await page.screenshot({ path: pathProfile, fullPage: false });
    
    await browser.close();
    console.log('Comparison screenshots taken successfully! Check your desktop/codegnan folder! ✅');
  } catch (error) {
    console.error('An error occurred during screenshot rendering:', error);
    process.exit(1);
  }
}

capture();
