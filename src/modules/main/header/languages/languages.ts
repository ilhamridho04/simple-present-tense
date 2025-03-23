import {Component, Vue} from 'vue-facing-decorator';
import {Dropdown} from '@profabric/vue-components';

@Component({
    name: 'languages-dropdown',
    components: {
        'pf-dropdown': Dropdown
    }
})
export default class Languages extends Vue {
    public selectedLanguage: string = null;
    public languages: any = [
        {
            key: 'en',
            flag: 'flag-icon-us',
            label: 'languages.english'
        },
        {
            key: 'id',
            flag: 'flag-icon-id',
            label: 'languages.indonesian'
        }
    ];

    public mounted() {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        this.selectedLanguage = savedLanguage || this.$i18n.locale;
        if (savedLanguage) {
            this.$i18n.locale = savedLanguage;
        }
    }

    get flagIcon() {
        if (this.selectedLanguage === 'id') {
            return 'flag-icon-id';
        }
        return 'flag-icon-us';
    }

    public changeLanguage(langCode: string) {
        if (this.$i18n.locale !== langCode) {
            this.$i18n.locale = langCode;
            this.selectedLanguage = langCode;
            localStorage.setItem('selectedLanguage', langCode);
        }
    }
}
