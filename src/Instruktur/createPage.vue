<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Tambah Instruktur</h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Instruktur</label>
                                <input type="text" class="form-control" v-model="instruktur.nama_instruktur" placeholder="Masukkan nama Instruktur">         
                                
                                <!-- validation -->
                                <div v-if="validation.nama_instruktur" class="mt-2 alert alert-danger">
                                    {{ validation.nama_instruktur[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Alamat Instruktur</label>
                                <input class="form-control" v-model="instruktur.alamat_instruktur" placeholder="Masukkan alamat Insruktur">
                                
                                <!-- validation -->
                                <div v-if="validation.alamat_instruktur" class="mt-2 alert alert-danger">
                                    {{ validation.alamat_instruktur[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">No Telepon</label>
                                <input class="form-control" type="number" v-model="instruktur.no_telepon" placeholder="Masukkan jumlah pegawai">
                            
                                <!-- validation -->
                                <div v-if="validation.no_telepon" class="mt-2 alert alert-danger">
                                    {{ validation.no_telepon[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                <input class="form-control" v-model="instruktur.tanggal_lahir" placeholder="Masukkan Tanggal Lahir">
                            
                                <!-- validation -->
                                <div v-if="validation.tanggal_lahir" class="mt-2 alert alert-danger">
                                    {{ validation.tanggal_lahir[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Username</label>
                                <input class="form-control" v-model="instruktur.username" placeholder="Masukkan Username">
                            
                                <!-- validation -->
                                <div v-if="validation.username" class="mt-2 alert alert-danger">
                                    {{ validation.username[0] }}
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
    //state instruktur
        const instruktur = reactive({
            nama_instruktur: '',
            alamat_instruktur: '',
            no_telepon: '',
            tanggal_lahir:'',
            username:'',
        })
    //state validation
    const validation = ref([])
    //vue router
    const router = useRouter()
    //method store
    function store() {
        let nama_instruktur = instruktur. nama_instruktur
        let alamat_instruktur = instruktur.alamat_instruktur
        let no_telepon = instruktur.no_telepon
        let tanggal_lahir = instruktur. tanggal_lahir
        let username = instruktur.username
      
        axios.post('https://api.henri.krisnarata13.my.id/api/instruktur', {
            nama_instruktur: nama_instruktur,
            alamat_instruktur: alamat_instruktur,
            no_telepon: no_telepon,
            tanggal_lahir: tanggal_lahir,
            username: username
        }).then(() => {
        //redirect ke post index
        router.push({
            name: 'instruktur.index'
        })

        }).catch(error => {
            //assign state validation with error
            validation.value = error.response.data
        })
    }

        //return
        return {
            instruktur,
            validation,
            router,
            store
        }
    }
}

</script>

<style>
</style>


