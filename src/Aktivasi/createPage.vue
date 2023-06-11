<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Aktivasi Tahunan</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <select v-model="aktivasi.id_member" class="form-control" id="">
                                    <option value="" disabled>Pilih</option>
                                    <option v-for="member in member" :key="member.id" :value="member.id"> {{ member.nama_member}}</option>
                                </select>
                                 <!-- validation -->
                                <div v-if="validation.id_member" class="mt-2 alert alert-danger">
                                    {{ validation.id_member[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jumlah Bayar</label>
                                <input class="form-control"  v-model="aktivasi.jumlah_bayar" placeholder="Masukkan Jumlah Harga">
                            
                                <!-- validation -->
                                <div v-if="validation.jumlah_bayar" class="mt-2 alert alert-danger">
                                    {{ validation.jumlah_bayar[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Nama Pegawai</label>
                                <select v-model="aktivasi.id_pegawai" class="form-control" id="">
                                    <option value="" disabled>Pilih</option>
                                    <option v-for="pegawai in pegawai" :key="pegawai.id" :value="pegawai.id"> {{ pegawai.nama_pegawai}}</option>
                                </select>
                                 <!-- validation -->
                                <div v-if="validation.id_pegawai" class="mt-2 alert alert-danger">
                                    {{ validation.id_pegawai[0] }}
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
        const aktivasi = reactive({
            id_member: '',
            tanggal_transaksi: '',
            jumlah_bayar: '',
            id_pegawai: '',
        })

   
    const member = ref([]);
    const pegawai = ref([]);
    //state validation
    const validation = ref([]);
    //vue router
    const router = useRouter();
    
    onMounted(() => {
     
            axios.get('http://127.0.0.1:8000/api/member')
            .then(response => {
                member.value = response.data.data
                console.log(member.value);
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get('http://127.0.0.1:8000/api/pegawai')
            .then(response => {
                pegawai.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })
    
    //method store
    function store() {
        // let id_pegawai = deposit_uang.id_pegawai
        let id_member = aktivasi.id_member
        let tanggal_transaksi = aktivasi.tanggal_transaksi
        let jumlah_bayar = aktivasi.jumlah_bayar
        let id_pegawai = aktivasi.id_pegawai
        console.log(id_member)
        console.log(id_pegawai)
        axios.post('http://127.0.0.1:8000/api/aktivasi', {
            // id_pegawai:id_pegawai,
            id_member: id_member,
            tanggal_transaksi: tanggal_transaksi,
            jumlah_bayar: jumlah_bayar,
            id_pegawai: id_pegawai     
        }).then(() => {
                //redirect ke post index
            router.push({
                name: 'aktivasi.index'
        })

        }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
            })
        }
        
        //return
        return {
            member,
            pegawai,
            aktivasi,
            validation,
            router,
            store
        }
    }
}

</script>



