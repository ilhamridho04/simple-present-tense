import {defineComponent} from 'vue';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '@/firebase';
import {useRoute} from 'vue-router';

export default defineComponent({
    data() {
        return {
            question: {
                question: '',
                choices: [],
                correct_answer: '',
                level: 1,
                point: 10,
                type: 'mcq'
            }
        };
    },
    async mounted() {
        const route = useRoute();
        await this.fetchQuestion(route.params.id as string);
    },
    methods: {
        async fetchQuestion(questionId: string) {
            const docRef = doc(db, 'questions', questionId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                this.question = docSnap.data() as any;
            } else {
                alert('Soal tidak ditemukan!');
            }
        }
    }
});
