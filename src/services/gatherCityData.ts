import { extractDetailsService } from './extractDetails';
import { handleScrolling } from './scrollHandler';
import { Page } from 'puppeteer-core';

export async function gatherCityData(page: Page): Promise<any[]> {
    let detailsArray = [];
    let previousHeight = 0;
    let retries = 0;

    while (true) {
        // Wait until the '.rbutton' selector becomes visible, with a timeout of 2 minutes
        await page.waitForSelector('.rbutton', { visible: true, timeout: 120000 });

        // Extract details from the current page and check for the stopping condition
        const { details, stop } = await extractDetailsService.extractDetails(page);
        
        if (stop) {
            // If stopping condition met (reached desired date), break the loop
            detailsArray.push(...details);            
            console.log("Breaking loop due to date condition.");
            break;
        };

        // Handle scrolling logic to load more data        
        const scrolled = await handleScrolling(page, previousHeight, retries);
        previousHeight = scrolled.currentHeight;
        retries = scrolled.retries;
        
        if (scrolled.noMoreDataTimeout) {
            // If no more data to scroll, attempt one last extraction before exiting
            const { details } = await extractDetailsService.extractDetailsNoMoreScrolling(page);
            detailsArray.push(...details);
            console.log("No more data available. Stopping data collection.");
            break;
        }
    };

    return detailsArray;
};
