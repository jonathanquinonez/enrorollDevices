export function setCookie(cname: string, cvalue: string): void {
    window.document.cookie = `${cname}=${cvalue}`;
}

export function getCookie(cookieName: string) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el: string) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

export function hasCookie(cookieName: string) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el: string) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie.hasOwnProperty(cookieName);
}