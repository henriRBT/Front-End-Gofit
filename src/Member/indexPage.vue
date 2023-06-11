<template>
    <div class="d-flex justify-content-between flex-wrap flex-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Member</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'member.create'}" class="btn btn-md btn-success">Tambah Member</router-link>
                        
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">No Telepon</th>
                                    <th scope="col">Alamat</th>
                                    <th scope="col">Tanggal Masa Aktif</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Menu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(member, id) in member" :key="id">
                                    <td>{{ member.nama_member}}</td>
                                    <td>{{ member.no_telepon_member }}</td>
                                    <td>{{ member.alamat_member }}</td>
                                    <td>{{ member.tanggal_masa_aktif }}</td>
                                    <td v-if="member.status=='1'">Aktif</td>
                                    <td v-if="member.status=='0'">Tidak Aktif</td>
                                    <td>{{ member.username }}</td>
                                    <td class="text-center"> 
                                        <router-link :to="{ name: 'member.update', params: { id: member.id } }" class="btn btn-sm btn-primary mr-1"> EDIT</router-link>
                                        <button @click.prevent="Delete(member.id)"  v-if="member.status == '1'" style="margin-left: 10px;" class="btn btn-sm btn-danger ml1">Delete</button> 
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
import { createToaster } from "@meforma/vue-toaster";
import { onMounted,  ref } from "vue";
export default {
    setup() {
        //reactive state
        let member = ref([]);
        const toaster = createToaster({});
        //mounted
        onMounted(() => {
           
            axios.get("http://127.0.0.1:8000/api/member")
                .then((response) => {
                    member.value = response.data.data;
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
                        axios.get(`http://127.0.0.1:8000/api/hapus/${id}`)
                        .then(() => {
                            window.location.reload();
                            toaster.success(`Data Berhasil di reset`);
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
        return {
            member,
            Delete,
        };
    },
    
};
</script>
<style>

</style>