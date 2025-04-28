import type { Data } from '../common/types';

export const getIP = async (): Promise<string | undefined> => {
    const url = 'https://api.ipify.org?format=json';
    try {
        const response: Response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const { ip }: { ip: string } = await response.json();
        return ip;
    } catch (error: unknown) {
        console.error('Error fetching IP:', error);
        throw new Error(
            'Unable to get IP address. Please check your connection.'
        );
    }
};

export const getTimeAndLocationData = async (
    ipAddress: string
): Promise<Data | undefined> => {
    try {
        const url = `https://api.ipgeolocation.io/v2/timezone?apiKey=${import.meta.env.VITE_API_KEY}&ip=${ipAddress}`;
        const response: Response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error: unknown) {
        console.error('Error fetching time info:', error);
        throw new Error(
            'Unable to get time info from the API. Please check your connection.'
        );
    }
};
