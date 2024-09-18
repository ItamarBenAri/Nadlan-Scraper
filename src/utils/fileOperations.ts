import fs from 'fs';
import path from 'path';
import { CityModel } from '../models/cityModel';
import { appConfig } from './appConfig';

export function saveDataToFile(cityName: string, data: CityModel[]): void {
    const downloadPath = appConfig.downloadPath;

    // Replace spaces with underscores in the city name
    const sanitizedCityName = cityName.replace(/ /g, "_");
    const cityFilePath = path.join(downloadPath, sanitizedCityName + ".json");

    // Convert the data to a string
    const jsonData = JSON.stringify(data, null, 2);

    // Write JSON data to the file
    fs.writeFileSync(cityFilePath, jsonData, 'utf-8');

    // Log the current time in HH:MM format
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    console.log(`Saved data for ${cityName} at ${hours}:${minutes}`);
};

export function loadCities(filePath: string): CityModel[] {
    // Read and parse JSON file content
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};