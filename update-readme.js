import * as fetch from 'node:node-fetch';
import * as fs from 'node:fs';

const repoOwner = 'thedev132';
const repoName = 'thedev132';
const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/stargazers`;

(async () => {
  try {
    const response = await fetch(apiUrl);
    const starGazers = await response.json();

    const avatarUrls = starGazers.map(gazer => `<img src="${gazer.avatar_url}" alt="Description" width="32" height="32">`);
    
    const readmePath = './README.md';
    const readmeContent = fs.readFileSync(readmePath, 'utf-8');
    
    const insertionPoint = readmeContent.indexOf('<!-- STAR_GAZERS_AVATARS -->');
    
    if (insertionPoint !== -1) {
      const updatedReadme = `${readmeContent.slice(0, insertionPoint)}\n${avatarUrls.join('\n')}\n${readmeContent.slice(insertionPoint)}`;
      
      fs.writeFileSync(readmePath, updatedReadme);
    } else {
      console.log("Insertion point not found in README");
    }
  } catch (error) {
    console.error("Error:", error);
  }
})();
