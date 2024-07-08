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
export async function getCachedData(key): Promise<any | null> {
    console.log(
        '🚀 ~ file: catchStorage.ts:13 ~ getCachedData ~ getCachedData:',
        getCachedData
    );
    try {
        const cacheStorage = await caches.open('workspaceData');
        const cachedResponse = await cacheStorage.match('workspaceData');
        console.log(
            '🚀 ~ file: catchStorage.ts:17 ~ getCachedData ~ cachedResponse:',
            cachedResponse
        );

        if (!cachedResponse || !cachedResponse.ok) {
            return null;
        }

        const data = await cachedResponse.json();
        console.log(
            '🚀 ~ file: catchStorage.ts:24 ~ getCachedData ~ data:',
            data
        );
        return data;
    } catch (error) {
        console.error('Error retrieving cached data:', error);
        return null;
    }
}
