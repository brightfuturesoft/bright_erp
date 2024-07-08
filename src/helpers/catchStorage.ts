/* eslint-disable @typescript-eslint/no-explicit-any */
export async function storeCacheData(keyName: string, data: any) {
    try {
        const cacheStorage = await caches.open(keyName);
        const response = new Response(JSON.stringify(data));
        await cacheStorage.put(keyName, response);
        return response;
    } catch (error) {
        console.error('Error caching data:', error);
    }
}

export async function getCachedData(keyName: string): Promise<any | null> {
    try {
        const cacheStorage = await caches.open(keyName);
        const cachedResponse = await cacheStorage.match(keyName);

        if (!cachedResponse || !cachedResponse.ok) {
            return null;
        }

        const data = await cachedResponse.json();
        return data;
    } catch (error) {
        console.error('Error retrieving cached data:', error);
        return null;
    }
}
