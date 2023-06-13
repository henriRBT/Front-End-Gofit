<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nama Instruktur</th>
                                    <th scope="col">Tanggal Kelas </th>
                                    <th scope="col">Keterangan</th>
                                    <th scope="col">Tanggal Pembuatan Izin</th>
                                    <th scope="col">Status</th> 
                                    <th scope="col">Menu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(izin, id) in izin" :key="id" >
                                    <td>{{ izin.instruktur.nama_instruktur }}</td>
                                    <td>{{ izin.jadwal_harian.tanggal }}</td>
                                    <td>{{ izin.keterangan }}</td>
                                    <td>{{ izin.tanggal_buat }}</td>
                                    <td class="text-center"> 
                                        <router-link :to="{ name: 'izin.update', params: { id: izin.id } }" 
                                        v-if="izin.tanggal_konfirmasi == '0000-00-00 00:00:00'"
                                        class="btn btn-primary mr-1"> EDIT
                                        </router-link>

                                        <button v-if="izin.tanggal_konfirmasi != '0000-00-00 00:00:00'"  
                                        class="btn btn-outline-success">Success
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { onMounted,  ref } from "vue";
export default {
    setup() {
        let izin = ref([]);
        const validation = ref([]);
        onMounted(() => {
            
            axios.get("https://api.henri.krisnarata13.my.id/api/izin")
                .then((response) => {
                    //assign state posts with response data
                    izin.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });
        
        return {
            izin,
            validation,
        };
    },

};
</script>


