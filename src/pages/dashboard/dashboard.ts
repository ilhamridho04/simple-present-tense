import {Component, Vue} from 'vue-facing-decorator';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '@/firebase';

@Component({})
export default class Dashboard extends Vue {
    private totalUsers: number = 0;
    private totalQuestions: number = 0;

    async fetchUserCount() {
        const querySnapshot = await getDocs(collection(db, 'users'));
        this.totalUsers = querySnapshot.size; // Jumlah total user
    }

    async fetchQuestionCount() {
        const querySnapshot = await getDocs(collection(db, 'questions'));
        this.totalQuestions = querySnapshot.size; // Jumlah total user
    }

    async mounted() {
        await this.fetchUserCount();
        await this.fetchQuestionCount();
    }
}
