import { setupPuppeteer } from './utils/puppeteerConfig';
import { loadCities } from './utils/fileOperations';
import { processCity } from './services/cityProcessing';
import { appConfig } from './utils/appConfig';
import { citiesService } from './services/citiesService';

async function main(cityIdStart: number, cityIdEnd: number, chunkNum: number) {
    try {
        // Validate that the start city ID is smaller than the end city ID
        if(cityIdEnd < cityIdStart) throw new Error("cityIdStart need to be smallest from cityIdEnd");

        // Initialize a Puppeteer browser instance
        const browser = await setupPuppeteer();
        const page = await browser.newPage();
        
        // Set a custom User-Agent for the browser session
        await page.setUserAgent(appConfig.userAgent);

        // Load the list of cities from the file
        const cities = loadCities(appConfig.citiesFilePath);
        
        // Filter cities based on the provided ID range
        const filteredCities = citiesService.filteringCities(cities, cityIdStart, cityIdEnd);
        
        // Process each filtered city in sequence
        for (const city of filteredCities) {            
            await processCity(page, city);
        }
        
        console.log(`---------------------------- Finished for chunk number ${chunkNum} ----------------------------`);
        
        // Uncomment to close the browser after processing (optional)
        // await browser.close();
    }
    catch(err: any) {
        console.log(err);
    }
}

// Call the main function with different ranges of city IDs
main(333, 350, 1);
main(451, 500, 2);
main(501, 550, 3);
main(551, 600, 4);
main(601, 650, 5);