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
                                        <button @click.prevent="printStruk(member.id)" style="margin-left: 10px;" class="btn btn-sm btn-danger ml1">Cetak</button> 
                                        <button @click.prevent="reset(member.id)" style="margin-left: 10px;" class="btn btn-sm btn-success ml1">Reset Password</button> 
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
import { createToaster } from "@meforma/vue-toaster";
export default {
    setup() {
        //reactive state
        let member = ref([]);
        const toaster = createToaster({});
        //mounted
        onMounted(() => {
            axios.get("https://api.henri.krisnarata13.my.id/api/member")
                .then((response) => {
                    //assign state posts with response data
                    member.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
            });
        
        function reset(id){
            axios.get(`https://api.henri.krisnarata13.my.id/api/reset/${id}`)
                .then(() => {
                    toaster.success(`Reset Password Berhasil`);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
        return {
            member,
            reset,
        };
    },
    
    methods:{
        printStruk(id) {
            axios.get(`https://api.henri.krisnarata13.my.id/api/cetakMember/${id}`)
                    .then((response) => {
                        //assign state posts with response data
                        document.write( 
                            `<div class="element-to-convert">
                                <strong>GoFit</strong>
                                <p>Jl. CentralPark No. 10 Yogyakarta<p>
                                <br>
                                <strong>Member Card</strong>
                                <p> Member Id   : ${response.data.data[0].id_member}<p>
                                <p> Nama    : ${response.data.data[0].nama_member} <br> <p>
                                <p> Alamat  : ${response.data.data[0].alamat_member} <p>
                                <p> Telepon : ${response.data.data[0].no_telepon_member} <p>
                            </div>
                            <style>
                            .element-to-convert {
                                box-sizing: border-box;
                                position: center;
                                width: 300px;
                                height: 260px;
                                padding: 10px;
                                background: #FFFFFF;
                                border: 1px solid #000000;
                            }
                            </style>`

                        );response.data.data;
                        console.log(response.data.data)
                        window.print();
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                    });
                }
            }
};
</script>
<style>

</style>