document.addEventListener('DOMContentLoaded', function () {
    const profileForm = document.getElementById('profileForm');
    const profileUrlsInput = document.getElementById('profileUrls');
    const scrapeProfilesBtn = document.getElementById('scrapeProfilesBtn');
    const profileInfoDiv = document.getElementById('profileInfo');
    let profileUrls = [];
  
    profileForm.addEventListener('submit', function (event) {
      event.preventDefault();
      profileUrls = profileUrlsInput.value.split('\n');
      profileInfoDiv.innerHTML = ''; // Clear previous results
    });
  
    scrapeProfilesBtn.addEventListener('click', async function () {
      profileInfoDiv.innerHTML = ''; // Clear previous results
  
      // Loop through each profile URL
      for (const url of profileUrls) {
        // Open the profile link in a new tab
        const tab = await chrome.tabs.create({ url: url });
  
        // Wait for the page to load
        await new Promise(resolve => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
              return document.readyState === 'complete';
            }
          }, () => {
            resolve();
          });
        });
  
        // Scrape profile information
        const profileInfo = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: () => {
            const name = document.querySelector('.inline.t-24.t-black.t-normal.break-words').textContent.trim();
            const location = document.querySelector('.t-16.t-black.t-normal.inline-block').textContent.trim();
            const about = document.querySelector('.pv-about__summary-text').textContent.trim();
            // Add more scraping logic as needed
            return { name, location, about };
          }
        });
  
        // Display the scraped information
        const profileDiv = document.createElement('div');
        profileDiv.innerHTML = `
          <h2>${profileInfo.result.name}</h2>
          <p><strong>Location:</strong> ${profileInfo.result.location}</p>
          <p><strong>About:</strong> ${profileInfo.result.about}</p>
          <hr>
        `;
        profileInfoDiv.appendChild(profileDiv);
  
        // Close the tab
        chrome.tabs.remove(tab.id);
      }
    });
  });
  