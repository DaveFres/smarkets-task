import config from "../configs/index";

export const fetchData = (url: string, errorCallback?: (e: any) => void) => {
    const { apiBase, corsUrl } = config;

    return fetch(`${corsUrl}${apiBase}${url}`)
        .then((res) => {
            return res.json();
        })
        .catch((e) => {
            console.log(e);
            errorCallback && errorCallback(e);
        });
};
