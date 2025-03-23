import {createI18n} from 'vue-i18n';

import en from './en.json';
import id from './id.json';

export const i18n = createI18n({
    locale: 'id',
    messages: {en, id},
    fallbackLocale: 'id',
    legacy: false
});

export default i18n;
