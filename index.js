const express = require('express')
var bodyParser = require('body-parser')
const Profile = require('./models/profiles')
var userCtrl = require("./controllers/profileController")


const app = express()
require('./models/index')

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/add',userCtrl.addProfile);
app.get('/profiles',userCtrl.getProfiles)
app.post('/profiles',userCtrl.postProfiles)

Profile.sync({force: false});

app.listen(3000,()=>{
    console.log('App will run on: http://localhost:3000')
})











//app.use(bodyParser.urlencoded({ extended: true }));

// // POST API endpoint to scrape LinkedIn profile and create a new profile
// app.post('/profiles', async (req, res) => {
//   try {
//     const { profileUrl } = req.body;

//     // Launch Puppeteer
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     // Navigate to the LinkedIn profile URL
//     await page.goto("www.linkedin.com/in/harshit-anand-367b28251", { waitUntil: 'networkidle2' });

//     // Scrape profile details
//     const name = await page.$eval('.inline.t-24.t-black.t-normal.break-words', element => element.textContent.trim());
//     const url = profileUrl;
//     const about = await page.$eval('.pv-about__summary-text', element => element.textContent.trim());
//     const bio = await page.$eval('.pv-about__summary-text.mt4', element => element.textContent.trim());
//     const location = await page.$eval('.t-16.t-black.t-normal.inline-block', element => element.textContent.trim());
//     const followerCount = await page.$eval('.t-16.t-black.t-normal', element => element.textContent.trim());
//     const connectionCount = await page.$eval('.t-16.t-black.t-normal', element => element.textContent.trim());
//     // Add more fields as needed
//     console.log("name is");

//     // Close Puppeteer
//     await browser.close();

//     // Create a new profile using Sequelize
//     const profile = await Profile.create({
//       name,
//       url,
//       about,
//       bio,
//       location,
//       followerCount,
//       connectionCount,
//       // Add other fields as needed
//     });
//     res.status(201).json(profile);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });