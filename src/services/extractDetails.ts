import { Page } from "puppeteer-core";

export class ExtractDetailsService {

    public extractDetails(page: Page) {
        return page.evaluate(() => {
            const details = [];
            const buttons = Array.from(document.querySelectorAll('.rbutton')); // Collect all buttons

            // Extracting and checking the last row date
            const lastButton = buttons[buttons.length - 1];
            const lastButtonDateText = lastButton?.querySelector('.tableCol')?.textContent?.trim();
            const lastButtonDate = lastButtonDateText ? new Date(lastButtonDateText.split('.').reverse().join('-')) : null;

            // Stop if last date is after January 1, 2013
            if (lastButtonDate && lastButtonDate > new Date("2013-01-01")) {
                return { details, stop: false };
            }

            
            // Iterate through buttons and extract property data
            for (const button of buttons) {
                const tableCols = Array.from(button.querySelectorAll('.tableCol'));

                const dateText = tableCols[0]?.textContent?.trim();
                const date = dateText ? new Date(dateText.split('.').reverse().join('-')) : null;
                if (date && date < new Date("2013-01-01")) {
                    return { details, stop: true }; // Stop if date is before January 1, 2013
                }

                // Extract property details
                const address = tableCols[1]?.textContent?.trim() || null;
                const subParcel = tableCols[2]?.textContent?.trim() || null;
                const propertyType = tableCols[3]?.textContent?.trim() || null;
                const rooms = parseInt(tableCols[4]?.textContent?.trim()) || null;
                const floor = tableCols[5]?.textContent?.trim() || null;
                const squareMeters = parseInt(tableCols[6]?.textContent?.trim()) || null;
                const price = tableCols[7]?.textContent?.trim() || null;
                const priceTrend = tableCols[8]?.textContent?.trim() || null;

                details.push({
                    date: date ? date.toISOString().split('T')[0] : null, // Save date in "YYYY-MM-DD" format
                    address,
                    subParcel,
                    propertyType,
                    rooms,
                    floor,
                    squareMeters,
                    price,
                    priceTrend
                });
            }

            return { details, stop: false }; // Continue scrolling
        });
    };

    // Duplicate function because page.evaluate() does not accept external values (such as the date)
    // and does not allow access to external functions. This requires us to implement the logic twice,
    // once for when scrolling is still needed and once for when scrolling is complete.
    public extractDetailsNoMoreScrolling(page: Page) {
        return page.evaluate(() => {
            const details = [];
            const buttons = Array.from(document.querySelectorAll('.rbutton'));

            for (const button of buttons) {
                const tableCols = Array.from(button.querySelectorAll('.tableCol'));

                const dateText = tableCols[0]?.textContent?.trim();
                const date = dateText ? new Date(dateText.split('.').reverse().join('-')) : null; // Convert date format
                if (date && date < new Date("2013-01-01")) {
                    return { details, stop: true };
                };

                // Extract property details
                const address = tableCols[1]?.textContent?.trim() || null;
                const subParcel = tableCols[2]?.textContent?.trim() || null;
                const propertyType = tableCols[3]?.textContent?.trim() || null;
                const rooms = parseInt(tableCols[4]?.textContent?.trim()) || null;
                const floor = tableCols[5]?.textContent?.trim() || null;
                const squareMeters = parseInt(tableCols[6]?.textContent?.trim()) || null;
                const price = tableCols[7]?.textContent?.trim() || null;
                const priceTrend = tableCols[8]?.textContent?.trim() || null;

                details.push({
                    date: date ? date.toISOString().split('T')[0] : null,
                    address,
                    subParcel,
                    propertyType,
                    rooms,
                    floor,
                    squareMeters,
                    price,
                    priceTrend
                });
            }

            return { details, stop: false };
        });
    };
}

export const extractDetailsService = new ExtractDetailsService();