import { Page } from "puppeteer-core";
import { delay } from "../utils/delay";

export async function handleScrolling(page: Page, previousHeight: number, retries: number) {
    // Scroll to the bottom of the page
    await page.evaluate(() => window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" }));

    // Wait to allow content to load (accounting for slow page load)
    await delay(5000);

    // Get the new height after scrolling
    const currentHeight = await page.evaluate('document.body.scrollHeight') as number;

    // Compare the new height with the previous height to detect page loading progress
    if (currentHeight === previousHeight) {
        retries++;
        if (retries >= 5) { 
            // After 5 failed attempts, scroll up slightly and use exponential backoff to wait longer
            await page.evaluate(() => window.scrollBy(0, -300));
            await delay(retries * 2000);
        };
        // Stop after 20 retries (~7 minutes)
        if (retries > 20) {
            return { currentHeight, retries, noMoreDataTimeout: true };
        };
    } else {
        retries = 0; // Reset retry count if content is still loading
    };

    return { currentHeight, retries, noMoreDataTimeout: false };
};