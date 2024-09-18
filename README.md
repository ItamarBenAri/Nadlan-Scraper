# Nadlan Scraper Project

## Overview

This project is a Node.js-based application that uses Puppeteer for web scraping real estate data from [nadlan.gov.il](https://www.nadlan.gov.il/). It automates data extraction for cities and their respective properties, processing the results and saving them into structured JSON files for further use. The data collection spans 10 years, from the beginning of 2013 to the middle of 2024.

This project is part of a larger **AI initiative** aimed at analyzing the rise in housing prices across different regions in Israel over the past decade. Ultimately, the model will predict future property values for the next 1, 2, or even up to 10 years, providing insights into real estate trends and price forecasts.

## Features
- **City Data Filtering**: The service allows you to filter cities by their ID range.
- **Web Scraping**: Puppeteer is used to scrape property details from the government site.
- **Data Processing and Storage**: The project processes city and property details and stores them in neatly formatted JSON files.
- **Error Handling**: Robust error handling and retry mechanisms for stable scraping sessions.

## Project Structure

```
/src
  ├── models/
  │   └── cityModel.ts        # Defines the CityModel class for structured data handling
  ├── services/
  │   ├── citiesService.ts    # City filtering logic by ID range
  │   ├── cityProcessing.ts   # Handles the processing and scraping of city data
  │   ├── extractDetails.ts   # Service to extract property details from the page
  │   ├── gatherCityData.ts   # Logic for gathering city data from the page
  │   ├── scrollHandler.ts    # Manages page scrolling and data loading during scraping
  ├── utils/
  │   ├── puppeteerConfig.ts  # Configuration for Puppeteer browser settings
  │   ├── fileOperations.ts   # Functions to save and load data from files
  │   ├── appConfig.ts        # Global configuration file for file paths, URLs, and Puppeteer settings
  └── app.ts                  # Main entry point for executing the scraping process
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Google Chrome (Path set in `appConfig.ts`)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ItamarBenAri/Nadlan-Scraper.git
   ```
2. Navigate into the project folder:
   ```bash
   cd nadlan-scraper
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To start the application, use the following command:
```bash
npm start
```
The project will launch Puppeteer in a non-headless mode, navigate to the real estate website, and start scraping data for a range of cities based on their IDs. Each chunk of data is saved in a `.json` file.

Here's the explanation to add to your README regarding the custom start script:

### Custom Start Script

The project includes a custom start script in the `package.json`:

```json
"scripts": {
  "start": "set NODE_OPTIONS=--max-old-space-size=8192 && nodemon --exec ts-node src/app.ts --quiet"
}
```
- **Increases Memory Limit**: The `NODE_OPTIONS=--max-old-space-size=8192` option increases the maximum memory allocation for Node.js to **8GB**. This is necessary for handling large data sets during the scraping and processing phases.

### Command Breakdown

- **City Range**: Each city ID range is specified in the `main` function inside `app.ts`. You can adjust these ranges to scrape different city data sets.
- **Script Execution**: The script runs multiple `main` functions with different city ID ranges to process and store data in chunks.

### Configuration

All configuration settings can be found in `src/utils/appConfig.ts`. The following settings are available:
- `nadlanGovUrl`: Base URL for real estate data scraping.
- `chromeExecutablePath`: Path to the Chrome executable.
- `citiesFilePath`: Path to the JSON file containing city names.
- `downloadPath`: Directory where scraped data will be saved.

### Example Output

Processed data is saved in the `cities_names_data.json` format, structured like this:
```json
{
  "date": "YYYY-MM-DD",
  "address": "Property Address",
  "subParcel": "12345",
  "propertyType": "Apartment",
  "rooms": 4,
  "floor": "2",
  "squareMeters": 120,
  "price": "1,500,000",
  "priceTrend": "עלייה של 3% בשנתיים האחרונות"
}
```

## Scripts

- **start**: Launches the scraping process with the Puppeteer configuration and memory settings for large-scale data processing.

## Dependencies

- **Express**: Web server framework for potential future extensions (API routes for data access).
- **Puppeteer-Core**: Used for browser automation and scraping.
- **@types/express**: Type definitions for Express.
- **@types/node**: Type definitions for Node.js.

## Author

**Itamar Ben Ari**
- GitHub: [Itamar Ben Ari](https://github.com/ItamarBenAri)
- LinkedIn: [Itamar Ben Ari](https://www.linkedin.com/in/itamar-ben-ari-69678b28b/)

Feel free to explore the projects and contact me at [etamar234@gmail.com](mailto:etamar234@gmail.com) if you have any questions or collaboration ideas!

---

Enjoy scraping real estate data efficiently with this automation tool! 👨‍💻
