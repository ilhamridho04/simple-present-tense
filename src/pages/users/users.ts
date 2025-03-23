import {Modal} from 'bootstrap';
import {
    collection,
    getDocs,
    doc,
    deleteDoc,
    getDoc,
    Timestamp
} from 'firebase/firestore';
import {db} from '@/firebase';
import {Component, Vue} from 'vue-facing-decorator';
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

@Component({})
export default class Users extends Vue {
    private users: Array<any> = [];
    private selectedUser: any = {};
    private selectedProfile: any = {};
    private modalInstance: Modal | null = null; // Simpan instance modal

    async mounted() {
        await this.getUsers();
        this.initDataTable();
    }

    async getUsers() {
        const querySnapshot = await getDocs(collection(db, 'users'));
        this.users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    initDataTable() {
        this.$nextTick(() => {
            $('#usersTable').DataTable({
                responsive: true,
                destroy: true // Hapus DataTable sebelum inisialisasi ulang
            });
        });
    }

    async deleteUser(userId: string) {
        await deleteDoc(doc(db, 'users', userId));
        await deleteDoc(doc(db, 'profile', userId));
        this.getUsers();
    }

    async viewUserDetail(userId: string) {
        const userDoc = await getDoc(doc(db, 'users', userId));
        const profileDoc = await getDoc(doc(db, 'profile', userId));

        if (userDoc.exists()) {
            const userData = userDoc.data();
            this.selectedUser = {
                ...userData,
                created_at: userData.created_at
                    ? formatTimestamp(userData.created_at)
                    : 'N/A',
                last_login: userData.last_login
                    ? formatTimestamp(userData.last_login)
                    : 'N/A'
            };
        } else {
            this.selectedUser = {};
        }

        if (profileDoc.exists()) {
            this.selectedProfile = profileDoc.data();
        } else {
            this.selectedProfile = {};
        }

        // **Buka modal dengan Bootstrap API**
        const modalElement = document.getElementById('userDetailModal');
        if (modalElement) {
            this.modalInstance = new Modal(modalElement);
            this.modalInstance.show();
        }
    }

    closeModal() {
        if (this.modalInstance) {
            this.modalInstance.hide();
        }
    }
}

function formatTimestamp(timestamp: Timestamp | null): string {
    if (!timestamp) return 'N/A'; // Jika timestamp kosong
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(date);
}
