<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Deposit Uang</h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <select v-model="deposit_uang.id_member" class="form-control" id="">
                                    <option value="" disabled>Pilih</option>
                                    <option v-for="member in member" :key="member.id" :value="member.id"> {{ member.nama_member}}</option>
                                </select>
                                 <!-- validation -->
                                <div v-if="validation.id_member" class="mt-2 alert alert-danger">
                                    {{ validation.id_member[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Nama Pegawai</label>
                                <select v-model="deposit_uang.id_pegawai" class="form-control" id="">
                                    <option value="" disabled>Pilih</option>
                                    <option v-for="pegawai in pegawai" :key="pegawai.id" :value="pegawai.id"> {{ pegawai.nama_pegawai}}</option>
                                </select>
                                 <!-- validation -->
                                <div v-if="validation.id_pegawai" class="mt-2 alert alert-danger">
                                    {{ validation.id_pegawai[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jumlah Deposit</label>
                                <input class="form-control"  v-model="deposit_uang.jumlah_bayar" placeholder="Masukkan Jumlah Bayar">
                            
                                <!-- validation -->
                                <div v-if="validation.jumlah_bayar" class="mt-2 alert alert-danger">
                                    {{ validation.jjumlah_bayar[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Promo</label>
                                <select v-model="deposit_uang.id_promo" class="form-control" id="">
                                    <option value="" disabled>Pilih</option>
                                    <option v-for="promo in promo" :key="promo.id" :value="promo.id"> {{ promo.nama_promo}}</option>
                                </select>
                                 <!-- validation -->
                                <div v-if="validation.id_promo" class="mt-2 alert alert-danger">
                                    {{ validation.id_promo[0] }}
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
        const deposit_uang = reactive({
            id_member: '',
            id_pegawai: '',
            id_promo: '',
            jumlah_bayar : '',
        })

    const member = ref([]);
    const pegawai = ref('');
    const promo = ref([]);
    //state validation
    const validation = ref([]);
    //vue router
    const router = useRouter();
    
    onMounted(() => {
     
            axios.get('http://127.0.0.1:8000/api/member')
            .then(response => {
                member.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get('http://127.0.0.1:8000/api/pegawai')
            .then(response => {
                pegawai.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get('http://127.0.0.1:8000/api/promo')
            .then(response => {
                promo.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })
    
    //method store
    function store() {
        let id_member = deposit_uang.id_member
        let id_pegawai = deposit_uang.id_pegawai
        let id_promo = deposit_uang.id_promo
        let jumlah_bayar = deposit_uang.jumlah_bayar

        axios.post('http://127.0.0.1:8000/api/uang', {
            id_member: id_member,
            id_pegawai:id_pegawai,
            id_promo: id_promo,
            jumlah_bayar :jumlah_bayar
                    
        }).then(() => {
                //redirect ke post index
            router.push({
                name: 'depositUang.index'
        })

        }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
            })
        }
        
        //return
        return {
            pegawai,
            member,
            promo,
            deposit_uang,
            validation,
            router,
            store
        }
    }
}

</script>



