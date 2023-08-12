import fetch from 'node-fetch';
import fs from 'fs';
const repoOwner = 'thedev132';
const repoName = 'thedev132';
const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/stargazers`;

(async () => {
  try {
    const response = await fetch(apiUrl);
    const starGazers = await response.json();

    const avatarTags = starGazers.map(gazer => `<img src="${gazer.avatar_url}" alt="${gazer.login}" width="50" height="50" style="display:inline-block; margin: 0 10px;" />`).join(' ');
    const avatarLine = avatarTags;

    const readmePath = './README.md';
    let readmeContent = fs.readFileSync(readmePath, 'utf-8');
    
    const insertionPoint = readmeContent.indexOf('<!-- STAR_GAZERS_AVATARS -->');
    
    if (insertionPoint !== -1) {
      // Construct the content to be inserted
      const insertionContent = `${avatarLine}\n\n---`;
      
      // Insert the content after the insertion point
      const updatedReadme = `${readmeContent.slice(0, insertionPoint)}<!-- STAR_GAZERS_AVATARS -->\n\n${insertionContent}\n\n${readmeContent.slice(insertionPoint)}`;
      
      fs.writeFileSync(readmePath, updatedReadme);
    } else {
      console.log("Insertion point not found in README");
    }
  } catch (error) {
    console.error("Error:", error);
  }
})();
