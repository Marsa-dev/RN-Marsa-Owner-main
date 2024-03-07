import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import englishStrings from "./English"
import arabicStrings from "./Arabic"

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en', // if you're using a language detector, do not define the lng option
    // debug: true,
    resources: {
        en: {
            translation: englishStrings,
        },
        ar: {
            translation: arabicStrings,
        },
    },
    react: {
        useSuspense: false
    }
},
    //   function(err, t) {
    //     // initialized and ready to go!
    //     document.getElementById('output').innerHTML = i18next.t('key');
    //   }
);

export default i18next;
