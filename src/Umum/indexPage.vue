<template>
    <div class="d-flex justify-content-between flex-wrap flex-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Jadwal Umum</h1>

    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'umum.create'}" class="btn btn-md btn-success">Tambah Jadwal</router-link>
                        
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Hari</th>
                                    <th scope="col">Sesi</th>
                                    <th scope="col">Nama Kelas</th>
                                    <th scope="col">Nama Instruktur</th>
                                    <th scope="col">Menu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(jadwal_umum, id) in displayedItems" :key="id">
                                    <td>{{ jadwal_umum.hari}}</td>
                                    <td>{{ jadwal_umum.sesi_kelas}}</td>
                                    <td>{{ jadwal_umum.kelas.nama_kelas }}</td>
                                    <td>{{ jadwal_umum.instruktur.nama_instruktur }}</td>
                                    <td class="text-center"> 
                                        <router-link :to="{ name: 'umum.update', params: { id: jadwal_umum.id } }" 
                                        class="btn btn-sm btn-primary mr-1"> EDIT</router-link>
                                            
                                        <button @click.prevent="Delete(jadwal_umum.id)" style="margin-left: 10px;" class="btn btn-sm btn-danger ml1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="d-flex justify-content-center mt-4">
                            <nav>
                                <ul class="pagination">
                                    <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                                        <a class="page-link" @click="changePage(page)">{{ page }}</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import swal from 'sweetalert';
import { onMounted,  ref, computed } from "vue";
export default {
    setup() {
        //reactive state
        let jadwal_umum = ref([]);
        
        // Deklarasikan variabel pagination

         // Halaman saat ini
        let currentPage = ref(1);

        // Jumlah item per halaman
        let perPage = ref(10); 
        let totalItems = computed(() => jadwal_umum.value.length); // Total jumlah item

        // Hitung total halaman
        let totalPages = computed(() => Math.ceil(totalItems.value / perPage.value));

        // Menghitung item yang ditampilkan pada halaman saat ini
        let displayedItems = computed(() => {
            let start = (currentPage.value - 1) * perPage.value;
            let end = start + perPage.value;
            return jadwal_umum.value.slice(start, end);
        });


        //mounted
        onMounted(() => {
            axios.get("http://127.0.0.1:8000/api/jadwal")
                .then((response) => {
                    //assign state posts with response data
                   
                    jadwal_umum.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        function changePage(page) {
            currentPage.value = page;
        } 

        function Delete(id){
            swal({
                title: "Apakah Anda yakin?",
                text: "Data akan dihapus!",
                icon: "warning",
                buttons: ["Tidak","Ya" ],
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://127.0.0.1:8000/api/jadwal/${id}`)
                    .then(response => {
                        //assign state posts with response data
                        console.log(response.data.message);
                        // bagian ini untuk menampilkan data member yang masih ada
                        jadwal_umum.value.splice(this.jadwal_umum.findIndex(index=>index.id == id), 1);
                    }).catch((error) => {
                        console.log(error.response.data);
                    });
                    swal("Data telah dihapus!", {
                        icon: "success",
                    });
                } else {
                    swal("Data tidak dihapus!");
                }
            });
        }

        //return
        return {
            jadwal_umum,
            totalPages,
            displayedItems,
            Delete,
            changePage,
        };
    },
   
};
</script>
<style>

</style>