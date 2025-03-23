import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    Timestamp,
    serverTimestamp
} from 'firebase/firestore';
import {db} from '@/firebase';
import {defineComponent} from 'vue';

export default defineComponent({
    data() {
        return {
            newUser: {
                nis: '',
                password: '',
                role: '',
                created_at: '',
                last_login: ''
            }
        };
    },
    methods: {
        async addUser() {
            if (
                this.newUser.nis &&
                this.newUser.password &&
                this.newUser.role
            ) {
                await addDoc(collection(db, 'users'), {
                    nis: this.newUser.nis,
                    password: this.newUser.password, // Harus di-hash jika digunakan untuk login
                    role: this.newUser.role,
                    created_at: serverTimestamp(),
                    last_login: serverTimestamp()
                });

                // Reset form setelah tambah user
                this.newUser = {
                    nis: '',
                    password: '',
                    role: '',
                    created_at: '',
                    last_login: ''
                };
                alert('Pengguna berhasil ditambahkan!');
            }
        }
    }
});
