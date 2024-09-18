import { CityModel } from "../models/cityModel";

class CitiesService {

    // Filters cities within the specified ID range
    public filteringCities(cities: CityModel[], startId: number, endId: number): CityModel[] {
        const filteredCities = [];

        // Get the starting index based on startId
        const startIdx = this.getStartIdx(cities, startId, endId);

        // Get the ending index based on endId
        let endIdx = this.getEndIdx(cities, startIdx, endId);

        // Loop to add cities between the start and end indices
        for (let i = startIdx; i <= endIdx; i++) {
            filteredCities.push(cities[i]);
        };

        return filteredCities;
    };

    // Finds the index of the city with startId or increments if not found
    private getStartIdx(cities: CityModel[], startId: number, endId: number): number {
        let startIdx = cities.findIndex(city => city.id === startId);

        // Increment startId until a valid index is found or startId exceeds endId
        while (startIdx === -1 && startId <= endId) {
            startId++;
            startIdx = cities.findIndex(city => city.id === startId);
        };
        return startIdx;
    };

    // Finds the index of the city with endId or decrements if not found
    private getEndIdx(cities: CityModel[], startId: number, endId: number): number {
        let endIdx = cities.findIndex(city => city.id === endId);

        // Decrement endId until a valid index is found or endId is less than startId
        while (endIdx === -1 && endId >= startId) {
            endId--;
            endIdx = cities.findIndex(city => city.id === endId);
        }
        return endIdx;
    }
}

export const citiesService = new CitiesService();