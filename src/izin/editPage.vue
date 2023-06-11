<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>
                            <router-link :to="{ name: 'izin.index' }"  style="margin-right: 20px;"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" 
                                class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
                                </svg> 
                            </router-link>
                            Update  
                        </h4>
                        
                        <hr>
                        <form @submit.prevent="update">
                            
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Kelas</label>
                                <select v-model="izin.id_jadwal_harian" class="form-control" id="">
                                    <option value="" disabled>Tanggal Kelas</option>
                                        <option v-for="jadwal_harian in jadwal_harian" :key="jadwal_harian.id" :value="jadwal_harian.id"> {{ jadwal_harian.tanggal}}</option>
                                </select>
                               
                                <div v-if="validation.id_jadwal_harian" class="mt-2 alert alert-danger">
                                    {{ validation.id_jadwal_harian[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Status</label>
                                <input class="form-control" v-model="izin.status" placeholder="Status">
                               
                                <div v-if="validation.status" class="mt-2 alert alert-danger">
                                    {{ validation.status[0] }}
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
   
    const izin = reactive({
        id_jadwal_harian:'',
        status:''
    })

    const jadwal_harian = ref([])
    const validation = ref([])
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
        
            axios.get('http://127.0.0.1:8000/api/harian')
            .then(response => {
                jadwal_harian.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get(`http://127.0.0.1:8000/api/izin/${route.params.id}`) 
                .then(response => {
                    izin.id_jadwal_harian= response.data.data.id_jadwal_harian
                }).catch(error => {
                        validation.value = error.response.data;
            });

        })

    //method update
    function update() {
        let id_jadwal_harian = izin.id_jadwal_harian
        let status = izin.status 
        
        axios.put(`http://127.0.0.1:8000/api/izin/${route.params.id}`, {
            id_jadwal_harian:id_jadwal_harian,
            status: status 
            
        }).then(() => {
            router.push({
                name: 'izin.index'
            })

        }).catch(error => {
            validation.value = error.response.data
        })
    }

        //return
        return {
            jadwal_harian,
            izin,
            validation,
            router,
            update
        }
    }
}

</script>


