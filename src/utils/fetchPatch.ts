type FetchConfig = RequestInit & {
    headers?: Record<string, string>;
};

export function patchFetchToNormalizeHeaders(): void {
    if (typeof window === 'undefined') return;
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (
        input: RequestInfo | URL,
        init: FetchConfig = {}
    ): Promise<Response> => {
        try {
            let url: RequestInfo | URL = input;
            let config: FetchConfig = init || {};
            if (input instanceof Request) {
                const reqHeaders: Record<string, string> = {};
                input.headers.forEach((v, k) => {
                    reqHeaders[k] = v;
                });

                config = {
                    method: input.method,
                    headers: { ...reqHeaders, ...(init.headers || {}) },
                    body: init.body ?? input.body,
                    mode: init.mode ?? input.mode,
                    credentials: init.credentials ?? input.credentials,
                    cache: init.cache ?? input.cache,
                    redirect: init.redirect ?? input.redirect,
                    referrer: init.referrer ?? input.referrer,
                };
                url = input.url;
            }

            const headers: Record<string, string> = {
                ...(config.headers || {}),
            };

            if (headers.workspace_id && !headers['workspace-id']) {
                headers['workspace-id'] = headers.workspace_id;
                delete headers.workspace_id;
            }

            const storedUser = localStorage.getItem('user');
            let user: { _id?: string; workspace_id?: string } = {};
            if (storedUser) {
                try {
                    user = JSON.parse(storedUser);
                } catch {
                    user = {};
                }
            }
            if (!headers.Authorization && !headers.authorization && user?._id) {
                headers.Authorization = user._id;
            }
            if (!headers['workspace-id'] && user?.workspace_id) {
                headers['workspace-id'] = user.workspace_id;
            }
            config.headers = headers;
            return await originalFetch(url, config);
        } catch (error) {
            console.error('[fetchPatch] Error:', error);
            return await originalFetch(input, init);
        }
    };
}
