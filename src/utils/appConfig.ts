class AppConfig {

    // URL for accessing Nadlan government data
    public readonly nadlanGovUrl = 'https://www.nadlan.gov.il/';

    // User-Agent string to mimic a browser during web scraping
    public readonly userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    
    // Path to the JSON file containing city names
    public readonly citiesFilePath = 'C:/Programming for Job Hunt/06 - AI - Real Estate/02 - AI Model/01 - data collections/01 - cities names/cities_names_data.json';
    
    // Directory where selling data will be downloaded
    public readonly downloadPath = 'C:/Programming for Job Hunt/06 - AI - Real Estate/02 - AI Model/01 - data collections/02 - selling data';
    
    // Path to Chrome executable, required for automated browsing or scraping
    public readonly chromeExecutablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
}

// Exporting an instance of AppConfig for easy configuration access throughout the application
export const appConfig = new AppConfig();