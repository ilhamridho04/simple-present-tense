import {defineComponent} from 'vue';
import {collection, doc, setDoc, serverTimestamp} from 'firebase/firestore';
import {db} from '@/firebase';

export default defineComponent({
    data() {
        return {
            newUser: {
                nis: '',
                password: '',
                role: ''
            },
            newProfile: {
                fullname: '',
                class: '',
                village: '',
                district: '',
                regency: '',
                province: '',
                image: '', // Simpan gambar dalam format Base64
                bio: ''
            },
            selectedFile: null as File | null,
            localImageUrl: ''
        };
    },
    methods: {
        handleFileUpload(event: Event) {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                this.selectedFile = target.files[0];
                this.saveImageToIndexedDB(this.selectedFile);
            }
        },

        async saveImageToIndexedDB(file: File) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    this.localImageUrl = event.target.result as string;
                    this.newProfile.image = this.localImageUrl;
                    localStorage.setItem(
                        'userProfileImage',
                        this.localImageUrl
                    );
                }
            };
            reader.readAsDataURL(file);
        },

        loadImageFromIndexedDB() {
            const savedImage = localStorage.getItem('userProfileImage');
            if (savedImage) {
                this.localImageUrl = savedImage;
                this.newProfile.image = savedImage;
            }
        },

        async addUser() {
            try {
                // Generate user ID secara manual
                const userDocRef = doc(collection(db, 'users'));
                const userId = userDocRef.id; // Ambil ID user

                // Simpan user ke Firestore
                await setDoc(userDocRef, {
                    nis: this.newUser.nis,
                    password: this.newUser.password, // Sebaiknya gunakan hashing di backend
                    role: this.newUser.role,
                    created_at: serverTimestamp(),
                    last_login: serverTimestamp()
                });

                // Simpan profile dengan ID yang sama dengan user
                await setDoc(doc(db, 'profile', userId), {
                    nis: this.newUser.nis,
                    fullname: this.newProfile.fullname,
                    class: this.newProfile.class,
                    village: this.newProfile.village,
                    district: this.newProfile.district,
                    regency: this.newProfile.regency,
                    province: this.newProfile.province,
                    image: this.newProfile.image, // Simpan gambar Base64
                    bio: this.newProfile.bio
                });

                // Simpan game stats dengan ID yang sama dengan user
                await setDoc(doc(db, 'game_stats', userId), {
                    levels_unlocked: 1,
                    total_answered: 0,
                    correct_answers: 0,
                    points: 0,
                    avg_points: 0,
                    last_played: serverTimestamp()
                });

                alert(
                    'User dan Profile berhasil ditambahkan dengan ID yang sama!'
                );
                this.resetForm();
            } catch (error) {
                console.error('Error adding user:', error);
                alert('Gagal menambahkan user!');
            }
        },

        resetForm() {
            this.newUser = {nis: '', password: '', role: ''};
            this.newProfile = {
                fullname: '',
                class: '',
                village: '',
                district: '',
                regency: '',
                province: '',
                image: '',
                bio: ''
            };
            this.selectedFile = null;
            this.localImageUrl = '';

            // Hapus gambar dari Local Storage
            localStorage.removeItem('userProfileImage');
        }
    },
    mounted() {
        this.loadImageFromIndexedDB();
    }
});
