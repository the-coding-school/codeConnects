export function getQueryStringParameter(param: string): string | undefined {
    const url = window.location.href;
    const name = param.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) return;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function getLocale(): string {
    return getQueryStringParameter('locale') || 'en-us';
}
