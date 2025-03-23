import {Component, Vue} from 'vue-facing-decorator';
import MenuItem from '@/components/menu-item/menu-item.vue';
import {Image} from '@profabric/vue-components';
import SidebarSearch from '@/components/sidebar-search/sidebar-search.vue';
import {i18n} from '@/translation';
import {IUser} from '@/types/user';
import {toRaw} from 'vue';
import {icon} from '@fortawesome/fontawesome-svg-core';

@Component({
    name: 'app-menu-sidebar',
    components: {
        'app-menu-item': MenuItem,
        'app-sidebar-search': SidebarSearch,
        'pf-image': Image
    }
})
export default class MenuSidebar extends Vue {
    menu = MENU;

    get currentUser(): IUser | undefined {
        const user = this.$store.getters['auth/currentUser'];
        return user;
    }

    get sidebarSkin() {
        return this.$store.getters['ui/sidebarSkin'];
    }
}

export const MENU = [
    {
        name: i18n.global.t('labels.dashboard'),
        icon: 'fa-tachometer-alt',
        path: '/'
    },
    {
        name: i18n.global.t('labels.users'),
        icon: 'fa-users',
        children: [
            {
                name: i18n.global.t('labels.userList'),
                path: '/users'
            },
            {
                name: i18n.global.t('labels.userAdd'),
                path: '/user-add'
            }
        ]
    },
    {
        name: i18n.global.t('labels.questions'),
        icon: 'fa-book-open',
        children: [
            {
                name: i18n.global.t('labels.questionList'),
                path: '/questions'
            },

            {
                name: i18n.global.t('labels.questionAdd'),
                path: '/question-add'
            }
        ]
    },
    {
        name: i18n.global.t('labels.game'),
        icon: 'fa-gamepad',
        children: [
            {
                name: i18n.global.t('labels.gameReportList'),
                path: '/game-stats'
            }
        ]
    }
];
