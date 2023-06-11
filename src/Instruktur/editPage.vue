<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>
                            <router-link :to="{ name: 'instruktur.index' }"  style="margin-right: 20px;"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" 
                                class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
                                </svg> 
                            </router-link>
                            
                            Update Instruktur
                        </h4>
                        <hr>
                        <form @submit.prevent="update">
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
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
    //state departemen
        const instruktur = reactive({
            id:'',
            nama_instruktur: '',
            alamat_instruktur: '',
            no_telepon: '',
            tanggal_lahir:''
           
        })
    //state validation
    const validation = ref([])
    //vue router
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
    axios.get(`https://api.henri.krisnarata13.my.id/api/instruktur/${route.params.id}`) 
        .then(response => {
            instruktur.id = response.data.data.id,
            instruktur.nama_instruktur = response.data.data.nama_instruktur,
            instruktur.alamat_instruktur= response.data.data.alamat_instruktur,
            instruktur.no_telepon = response.data.data.no_telepon,
            instruktur.tanggal_lahir = response.data.data.tanggal_lahir
       
        }).catch(error => {
            //assign state validation with error
            validation.value = error.response.data
        });
    });

    function update() {
        let nama_instruktur = instruktur. nama_instruktur
        let alamat_instruktur = instruktur.alamat_instruktur
        let no_telepon = instruktur.no_telepon
        let tanggal_lahir = instruktur. tanggal_lahir

        axios.put(`https://api.henri.krisnarata13.my.id/api/instruktur/${route.params.id}`, {
            nama_instruktur: nama_instruktur,
            alamat_instruktur: alamat_instruktur,
            no_telepon: no_telepon,
            tanggal_lahir: tanggal_lahir
         
        })
            .then(() => {
            router.push({
                    name: 'instruktur.index'
                });
            }).catch(error => {
                validation.value = error.response.data;
            });
    }

        return {
            instruktur,
            validation,
            router,
            route,
            update
        }
    }
}

</script>

<style>
</style>