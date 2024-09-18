import { gatherCityData } from './gatherCityData';
import { Page } from 'puppeteer-core';
import { CityModel } from '../models/cityModel';
import { delay } from '../utils/delay';
import { appConfig } from '../utils/appConfig';
import { saveDataToFile } from '../utils/fileOperations';

export async function processCity(page: Page, city: CityModel): Promise<void> {
    // Navigate to the city search page with the city's Hebrew name
    await page.goto(`${appConfig.nadlanGovUrl}?search=${city.heName}`, { waitUntil: 'domcontentloaded', timeout: 120000 });

    // Wait for 20 seconds to allow the page to load completely
    await delay(20000);
    const hasResults = await page.evaluate(() => {
        return document.querySelectorAll('.rbutton').length > 0;
    });

    // Check if there are search results by evaluating the presence of elements with the '.rbutton' class
    if (!hasResults) {
        console.log("No result for " + city.enName); // Log if no results are found
        return;
    };
    
    // Gather city details from the page
    const detailsArray = await gatherCityData(page);  
      
    // If city details are available, save them to a file
    if (detailsArray.length) {        
        saveDataToFile(city.enName, detailsArray);
    };
};