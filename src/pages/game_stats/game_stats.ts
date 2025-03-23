import { defineComponent, nextTick } from 'vue';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
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
            gameStats: [] as any[],
            loading: true,
            error: null as string | null
        };
    },

    async mounted() {
        await this.fetchGameStats();
        await nextTick(); // Tunggu hingga DOM siap
        this.initDataTable();
    },

    methods: {
        async fetchGameStats() {
            try {
                const querySnapshot = await getDocs(collection(db, 'game_stats'));
                this.gameStats = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
            } catch (err) {
                console.error("Error fetching game stats:", err);
                this.error = "Gagal mengambil data statistik game.";
            } finally {
                this.loading = false;
            }
        },

        initDataTable() {
            this.$nextTick(() => {
                $("#gameReportTable").DataTable({
                    responsive: true,
                    autoWidth: false,
                    destroy: true,
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
                }).buttons().container().appendTo('#gameReportTable_wrapper .col-md-6:eq(0)');
            });
        }
    }
});
