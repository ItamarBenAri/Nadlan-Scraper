import puppeteer from 'puppeteer-core';
import { appConfig } from './appConfig';

// Function to initialize Puppeteer with custom settings
export async function setupPuppeteer() {
    return puppeteer.launch({
        headless: false, // Runs browser in non-headless mode for full GUI
        executablePath: appConfig.chromeExecutablePath, // Path to Chrome browser from appConfig
        args: [
            '--no-sandbox',                    // Disable sandbox security for performance
            '--disable-setuid-sandbox',        // Avoid issues with sandbox permissions
            '--disable-dev-shm-usage',         // Fix potential memory-related crashes
            '--disable-accelerated-2d-canvas', // Improves stability by disabling GPU 2D canvas
            '--disable-gpu',                   // Run without GPU acceleration
            '--window-size=1920x1080',         // Set window size to 1080p resolution
            '--start-maximized'                // Start browser maximized
        ],
        defaultViewport: null, // Uses default window size, not constrained to a smaller viewport
    });
};