<template>
    <div class="d-flex justify-content-between flex-wrap flex-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Instruktur Page</h1>

        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2"  v-model ="datapencarian.cari" type="search" placeholder="Search" aria-label="Search">
        </form>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'instruktur.create'}" class="btn btn-md btn-success">TAMBAH Instruktur</router-link>
                        
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nama Instruktur</th>
                                    <th scope="col">Alamat Instruktur</th>
                                    <th scope="col">No Telepon</th>
                                    <th scope="col">Tanggal Lahir</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Menu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(instruktur, id) in datasearch" :key="id">
                                    <td>{{ instruktur.nama_instruktur }}</td>
                                    <td>{{ instruktur.alamat_instruktur }}</td>
                                    <td>{{ instruktur.no_telepon }}</td>
                                    <td>{{ instruktur.tanggal_lahir }}</td>
                                    <td>{{ instruktur.email }}</td>
                                    <td>{{ instruktur.username }}</td>
                                    <td class="text-center"> 
                                        <router-link :to="{ name: 'instruktur.update', params: { id: instruktur.id } }" class="btn btn-sm btn-primary mr-1"> EDIT</router-link>
                                            
                                        <button @click.prevent="Delete(instruktur.id)" style="margin-left: 10px;" class="btn btn-sm btn-danger ml1">DELETE</button>
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
import swal from 'sweetalert';
import { onMounted, reactive, ref } from "vue";
export default {
    setup() {
        //reactive state
        let instruktur = ref([]);
        
        const datapencarian = reactive({
            cari: '',
        })
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get("http://127.0.0.1:8000/api/instruktur")
                .then((response) => {
                    //assign state posts with response data
                    instruktur.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
            });
            
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
                        axios.delete(`http://127.0.0.1:8000/api/instruktur/${id}`)
                        .then(() => {
                        //assign state posts with response data
                            instruktur.value.splice(this.instruktur.findIndex(index=>index.id == id), 1);
                        })
                        .catch((error) => {
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
            instruktur,
            datapencarian,
            Delete,
        };
    },
    methods:{

    },

    computed:{
        datasearch(){
            // console.log(this.datapencarian.cari);
            return this.instruktur.filter((item) => {
                return item.nama_instruktur.toLowerCase().includes(this.datapencarian.cari.toLowerCase());
            });
        }
    },
};
</script>
<style>

</style>