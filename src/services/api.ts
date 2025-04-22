import type { TimeData, LocationData } from '../common/types';

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

export const getTimeData = async (
    ipAddress: string
): Promise<TimeData | undefined> => {
    try {
        const url = `https://timeapi.io/api/time/current/ip?ipAddress=${ipAddress}`;
        const response: Response = await fetch(url, { cache: 'force-cache' });
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

export const getLocationData = async (
    ipAddress: string
): Promise<LocationData | undefined> => {
    try {
        const url = `https://api.ipbase.com/v2/info?ip=${ipAddress}`;
        const response: Response = await fetch(url, {
            headers: {
                'X-API-KEY': import.meta.env.VITE_API_KEY as string
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.location;
    } catch (error: unknown) {
        console.error('Error fetching location:', error);
        throw new Error(
            'Unable to get location info from the API. Please check your connection.'
        );
    }
};
