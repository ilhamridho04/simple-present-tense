import {Component, Vue} from 'vue-facing-decorator';
import {version} from '../../../../package.json';
import {DateTime} from 'luxon';

let storedDarkMode = localStorage.getItem('darkMode');

@Component({})
export default class Footer extends Vue {
    private version: string = version;
    private currentYear: string = DateTime.now().toFormat('y');
    private darkModeSelected: boolean =
        storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;
}
