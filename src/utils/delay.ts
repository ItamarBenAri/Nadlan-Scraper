// Creates a promise that resolves after a specified delay
export function delay(time: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time));
};