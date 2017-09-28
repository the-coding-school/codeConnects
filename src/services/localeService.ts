import { getLocale } from 'services/configService';
import EnglishLocale from 'strings/en-us';

interface Locale_t {
    [key: string]: string
}

const loadedLocale: {[key:string]: Locale_t} = {
    'en-us': EnglishLocale
};

const locale = getLocale();

export function loadLocale(key: string) {
    if (loadedLocale[key]) return Promise.resolve(loadedLocale[key]);

    const newLocale: Locale_t = require(`strings/${key}`).default;
    loadedLocale[key] = newLocale;

    return Promise.resolve(loadedLocale[key])
}

export function t(key: string) {
    return loadLocale(locale).then((strings) => {
        return strings[key] || key;
    });
}
