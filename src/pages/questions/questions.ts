import { defineComponent } from 'vue';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import 'datatables.net-bs4';
import 'datatables.net-responsive-bs4';
import 'datatables.net-buttons-bs4';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';
import 'datatables.net-select-bs4';
import 'datatables.net-select';
import $ from 'jquery';

export default defineComponent({
    data() {
        return {
            questions: [] as any[]
        };
    },
    async mounted() {
        await this.fetchQuestions();
        this.initDataTable();
    },
    methods: {
        async fetchQuestions() {
            const querySnapshot = await getDocs(collection(db, 'questions'));
            this.questions = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        },
        initDataTable() {
            this.$nextTick(() => {
                $('#questionsTable').DataTable({
                    responsive: true,
                    destroy: true, // Hapus DataTable sebelum inisialisasi ulang
                    lengthMenu: [10, 25, 50, 100],
                    buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'colvis'],
                    language: {
                        search: "Cari:",
                        lengthMenu: "Tampilkan _MENU_ data",
                        info: "Menampilkan _START_ hingga _END_ dari _TOTAL_ data",
                        paginate: {
                            first: "Awal",
                            last: "Akhir",
                            next: "›",
                            previous: "‹",
                        },
                    },
                }).buttons().container().appendTo('#questionsTable_wrapper .col-md-6:eq(0)');
            });
        },
        viewQuestionDetail(questionId: string) {
            this.$router.push({
                name: 'question-detail',
                params: { id: questionId }
            });
        },
        async deleteQuestion(questionId: string) {
            if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
                try {
                    await deleteDoc(doc(db, 'questions', questionId));
                    alert('Soal berhasil dihapus!');
                    this.questions = this.questions.filter(
                        (q) => q.id !== questionId
                    );
                } catch (error) {
                    console.error('Error deleting question:', error);
                    alert('Gagal menghapus soal!');
                }
            }
        }
    }
});
