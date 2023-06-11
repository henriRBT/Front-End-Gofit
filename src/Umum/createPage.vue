<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>
                            <router-link :to="{ name: 'umum.index' }"  style="margin-right: 20px;"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" 
                                class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
                                </svg> 
                            </router-link>
                            Tambah Jadwal
                        </h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Hari</label>
                                <select v-model="jadwal_umum.hari" class="form-control" id="">
                                    <option value="" disabled>Pilih Hari</option>
                                    <option>Monday</option>
                                    <option>Tuesday</option>
                                    <option>Wednesday</option>
                                    <option>Thursday</option>
                                    <option>Friday</option>
                                    <option>Saturday</option>
                                    <option>Sunday</option>
                                </select>
                                
                                 <!-- validation -->
                                <div v-if="validation.hari" class="mt-2 alert alert-danger">
                                    {{ validation.hari[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Sesi</label>
                                <input class="form-control" type="time" v-model="jadwal_umum.sesi_kelas" placeholder="Masukkan jumlah pegawai">
                            
                                <!-- validation -->
                                <div v-if="validation.sesi_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.sesi_kelas[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Kelas</label>
                                <select v-model="jadwal_umum.id_kelas" class="form-control" id="">
                                    <option value="" disabled>Pilih Kelas</option>
                                        <option v-for="kelas in kelas" :key="kelas.id" :value="kelas.id"> {{ kelas.nama_kelas}}</option>
                                </select>
                                
                                <!-- validation -->
                                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.id_kelas[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Instruktur</label>
                                <select v-model="jadwal_umum.id_instruktur" class="form-control" id="">
                                    <option value="" disabled>Pilih Instruktur</option>
                                        <option v-for="instruktur in instruktur" :key="instruktur.id" :value="instruktur.id"> {{ instruktur.nama_instruktur}}</option>
                                </select>
                            
                                <!-- validation -->
                                <div v-if="validation.id_instruktur" class="mt-2 alert alert-danger">
                                    {{ validation.id_instruktur[0] }}
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
    //state departemen
        const jadwal_umum = reactive({
            hari: '',
            sesi_kelas: '',
            id_kelas: '',
            id_instruktur:''
        })

    const kelas = ref([])
    const instruktur = ref([])
    //state validation
    const validation = ref([])
    //vue router
    const router = useRouter()
    
    onMounted(() => {
            axios.get('http://127.0.0.1:8000/api/instruktur')
            .then(response => {
                console.log('instruktur',response);
                    instruktur.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get('http://127.0.0.1:8000/api/kelas')
            .then(response => {
                console.log('kelas',response);
                    kelas.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })
    
    //method store
    function store() {
        let hari = jadwal_umum.hari
        let sesi_kelas = jadwal_umum.sesi_kelas
        let id_kelas = jadwal_umum.id_kelas
        let id_instruktur = jadwal_umum.id_instruktur
       

        axios.post('http://127.0.0.1:8000/api/jadwal', {
            hari:hari,
            sesi_kelas: sesi_kelas,
            id_kelas: id_kelas,
            id_instruktur: id_instruktur
                    
        }).then(() => {
                //redirect ke post index
            router.push({
                name: 'umum.index'
        })

        }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
            })
        }
        
        //return
        return {
            kelas,
            instruktur,
            jadwal_umum,
            validation,
            router,
            store
        }
    }
}

</script>



