import {defineComponent} from 'vue';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import {db} from '@/firebase';

export default defineComponent({
    data() {
        return {
            newQuestion: {
                question: '',
                choices: ['', '', '', ''], // Pilihan jawaban sebagai array
                correct_answer: '',
                level: 1,
                point: 10,
                type: 'mcq',
                created_at: null
            }
        };
    },
    methods: {
        async addQuestion() {
            try {
                this.newQuestion.created_at = serverTimestamp();

                await addDoc(collection(db, 'questions'), this.newQuestion);

                alert('Soal berhasil ditambahkan!');
                this.resetForm();
            } catch (error) {
                console.error('Error adding question:', error);
                alert('Gagal menambahkan soal!');
            }
        },
        resetForm() {
            this.newQuestion = {
                question: '',
                choices: ['', '', '', ''],
                correct_answer: '',
                level: 1,
                point: 10,
                type: 'mcq',
                created_at: null
            };
        }
    }
});
