<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>
                            <router-link :to="{ name: 'member.index' }"  style="margin-right: 20px;"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" 
                                class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
                                </svg> 
                            </router-link>
                            Update Member</h4>
                        <hr>

                        <form @submit.prevent="update">
                           
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <input type="text" class="form-control" v-model="member.nama_member" placeholder="Masukkan nama Member">         
                                 <!-- validation -->
                                <div v-if="validation.nama_member" class="mt-2 alert alert-danger">
                                    {{ validation.nama_member[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">No Telepon</label>
                                <input class="form-control" type="number" v-model="member.no_telepon_member" placeholder="Masukkan jumlah pegawai">
                            
                                <!-- validation -->
                                <div v-if="validation.no_telepon_member" class="mt-2 alert alert-danger">
                                    {{ validation.no_telepon_member[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Alamat </label>
                                <input class="form-control" v-model="member.alamat_member" placeholder="Masukkan alamat Member">
                                
                                <!-- validation -->
                                <div v-if="validation.alamat_member" class="mt-2 alert alert-danger">
                                    {{ validation.alamat_member[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                <input class="form-control" type="date" v-model="member.tanggal_lahir_member" placeholder="Masukkan Tanggal Lahir">
                            
                                <!-- validation -->
                                <div v-if="validation.tanggal_lahir_member" class="mt-2 alert alert-danger">
                                    {{ validation.tanggal_lahir_member[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Email</label>
                                <input class="form-control" type="email" v-model="member.email_member" placeholder="Masukkan Email">
                            
                                <!-- validation -->
                                <div v-if="validation.email_member" class="mt-2 alert alert-danger">
                                    {{ validation.email_member[0] }}
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
        const member = reactive({
            nama_member: '',
            no_telepon_member: '',
            alamat_member: '',
            tanggal_lahir_member:'',
            email_member:'',
        })
    //state validation
     const validation = ref([])
    //vue router
    const router = useRouter()
    const route = useRoute();
    
    onMounted(() => {
    axios.get(`https://api.henri.krisnarata13.my.id/api/member/${route.params.id}`) 
        .then(response => {
            member.nama_member= response.data.data.nama_member,
            member.no_telepon_member= response.data.data.no_telepon_member,
            member.alamat_member = response.data.data.alamat_member,
            member.tanggal_lahir_member = response.data.data.tanggal_lahir_member,
            member.email_member = response.data.data.email_member
        }).catch(error => {
                validation.value = error.response.data;
        });
    });

    //method update
    function update() {
        let nama_member = member.nama_member
        let no_telepon_member = member.no_telepon_member
        let alamat_member = member.alamat_member
        let tanggal_lahir_member = member.tanggal_lahir_member
        let email_member = member.email_member

        axios.put(`https://api.henri.krisnarata13.my.id/api/member/${route.params.id}`, {
            nama_member: nama_member,
            no_telepon_member: no_telepon_member,
            alamat_member: alamat_member,
            tanggal_lahir_member: tanggal_lahir_member,
            email_member:email_member,
           

        }).then(() => {
        //redirect ke post index
        router.push({
            name: 'member.index'
        })

        }).catch(error => {
            //assign state validation with error
            validation.value = error.response.data
        })
    }

        //return
        return {
            member,
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


