/* eslint-disable @typescript-eslint/no-explicit-any */
export async function storeCacheData(keyName, data) {
    try {
        const cacheStorage = await caches.open(keyName);
        const response = new Response(JSON.stringify(data));
        await cacheStorage.put(keyName, response);
        return response;
    } catch (error) {
        console.error('Error caching data:', error);
    }
}
// @ts-ignore
export async function getCachedData(key) {
    try {
        const cacheStorage = await caches.open('workspaceData');
        const cachedResponse = await cacheStorage.match('workspaceData');
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
