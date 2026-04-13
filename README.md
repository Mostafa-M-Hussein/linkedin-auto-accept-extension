# LinkedIn Auto-Accept Extension

Chrome extension to automatically accept LinkedIn connection requests with intelligent filtering based on job title, company, skills, and mutual connections.

## Features

✅ **Auto-Accept All Connections** - Automatically accept pending invitations
✅ **Smart Filtering** - Filter by job title, company, skills, and keywords
✅ **Exclude Keywords** - Reject profiles containing unwanted keywords (Recruiters, Sales, etc.)
✅ **Minimum Connections** - Only accept if minimum mutual connections threshold is met
✅ **Auto-Scroll** - Automatically load all invitations on the page
✅ **Real-time Stats** - Track accepted, rejected, and processed invitations
✅ **Easy to Use** - Simple popup UI with one-click operation

## Installation

### Step 1: Clone or Download
```bash
git clone https://github.com/Mostafa-M-Hussein/linkedin-auto-accept-extension.git
cd linkedin-auto-accept-extension
```

### Step 2: Open Chrome Extensions Page
1. Go to `chrome://extensions/`
2. 2. Enable **"Developer mode"** (toggle at top right)
   3. 3. Click **"Load unpacked"**
      4. 4. Select the extension folder
        
         5. ### Step 3: Add to LinkedIn
         6. 1. Go to [LinkedIn Invitation Manager](https://www.linkedin.com/mynetwork/invitation-manager/received/)
            2. 2. Click the extension icon in the top-right
               3. 3. Configure your filters
                  4. 4. Click **"Start Auto-Accept"**
                    
                     5. ## Files Included
                    
                     6. - `manifest.json` - Extension configuration
                        - - `popup.html` - Extension popup UI
                          - - `popup.js` - Popup logic and controls
                            - - `content.js` - Main automation script
                              - - `background.js` - Background service worker
                               
                                - ## Configuration Options
                               
                                - ### Smart Filtering
                                - - **Enable Smart Filtering** - Toggle to activate/disable filters
                                  - - **Include Keywords** - Only accept profiles containing these keywords (comma-separated)
                                    -   - Example: `Engineer, Data Scientist, AI, ML`
                                        - - **Exclude Keywords** - Reject profiles containing these keywords (comma-separated)
                                          -   - Example: `Recruiter, Sales, Marketing`
                                              - - **Minimum Mutual Connections** - Only accept if they have at least X mutual connections
                                               
                                                - ### Page Options
                                                - - **Auto-scroll** - Automatically scroll through the page to load all invitations
                                                 
                                                  - ## Usage
                                                 
                                                  - 1. Configure your filters in the popup
                                                    2. 2. Click "Start Auto-Accept"
                                                       3. 3. The extension will:
                                                          4.    - Scroll through the page to load all invitations
                                                                -    - Filter each invitation based on your criteria
                                                                     -    - Accept matching profiles with 700ms delays between each
                                                                          -    - Update statistics in real-time
                                                                               -    - Continue until all invitations are processed
                                                                                
                                                                                    - ## Safety Features
                                                                                
                                                                                    - ⚠️ **Delays Between Actions** - 700ms between each accept to avoid rate limiting
                                                                                    - ⚠️ **Manual Confirmation** - No automatic installation or execution
                                                                                    - ⚠️ **Transparent Filtering** - See exactly which profiles are accepted/rejected
                                                                                    - ⚠️ **Statistics Tracking** - Monitor your activity in real-time
                                                                                
                                                                                    - ## Troubleshooting
                                                                                
                                                                                    - **Extension not showing?**
                                                                                    - - Make sure you're on the LinkedIn invitation manager page
                                                                                      - - Refresh the page and try again
                                                                                       
                                                                                        - **Not accepting connections?**
                                                                                        - - Check that "Enable Smart Filtering" is toggled correctly
                                                                                          - - Verify your filter keywords are appropriate
                                                                                            - - Check the browser console for errors
                                                                                             
                                                                                              - **Too slow/fast?**
                                                                                              - - Edit `content.js` and change the delay value (default: 700ms)
                                                                                                - - Longer delays are safer for LinkedIn's servers
                                                                                                 
                                                                                                  - ## License
                                                                                                 
                                                                                                  - MIT License - Feel free to modify and use!
                                                                                                 
                                                                                                  - ## Support
                                                                                                 
                                                                                                  - If you find this useful, star the repo! ⭐
                                                                                                 
                                                                                                  - ---

                                                                                                  **Made by:** Mostafa M. Hussein
                                                                                                  **GitHub:** https://github.com/Mostafa-M-Hussein
