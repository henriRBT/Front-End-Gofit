<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'aktivasi.create'}" class="btn btn-md btn-success">Tambah</router-link>
                        
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID transaksi</th>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">Jumlah Aktivasi</th>
                                    <th scope="col">Menu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(aktivasi, no_struk_aktivasi) in aktivasi" :key="no_struk_aktivasi" :id="'row-' + aktivasi.no_struk_aktivasi">
                                    <td>{{ aktivasi.no_struk_aktivasi }}</td>
                                    <td>{{ aktivasi.member.nama_member }}</td>
                                    <td>{{ aktivasi.jumlah_bayar }}</td>
                                    <td class="text-center"> 
                                        <button @click.prevent="printStruk(aktivasi.no_struk_aktivasi)" style="margin-left: 10px;" class="btn btn-sm btn-danger ml1">Cetak</button> 
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
import { useRouter } from 'vue-router'
export default {
    setup() {
        //reactive state
        let aktivasi = ref([]);
        //state validation
        const validation = ref([]);
        const router = useRouter();
        //vue router
       
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get("http://127.0.0.1:8000/api/aktivasi")
                .then((response) => {
                    //assign state posts with response data
                    aktivasi.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
            });

        //return
        return {
            aktivasi,
            validation,
            router,
            
        };
    },

    methods:{
        printStruk(no_struk_aktivasi) {
            
            // Mendapatkan tanggal hari ini
            const today = new Date(); 
            // Format tanggal sesuai dengan format yang diinginkan
            const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`; 
            
            // Format jam sesuai dengan format yang diinginkan
            const formattedTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`; 

            axios.get(`http://127.0.0.1:8000/api/cetakAktivasi/${no_struk_aktivasi}`)
                    .then((response) => {
                        //assign state posts with response data
                        document.write( 
                            `<div class="element-to-convert">
                                <div id="header"> 
                                    <h1>GoFit</h1>
                                    <p>No Struk : ${response.data.data[0].no_struk_aktivasi}</p>
                                </div>

                                <div id="container"> 
                                    <p>Jl. CentralPark No. 10 Yogyakarta</p>
                                    <p>Tanggal     :${formattedDate}  ${formattedTime} </p>
                                </div>
                                    <p> <strong>Member</strong>     : ${response.data.data[0].id_member} / ${response.data.data[0].nama_member}</p>
                                    <p> Aktivasi Tahunan    : Rp${response.data.data[0].jumlah_bayar},- <p>
                                    <p> Masa Aktif Member: ${response.data.data[0].tanggal_berlaku} <p>
                                <div class="kasir"> 
                                    <p>Kasir    :P0${response.data.data[0].id_pegawai} / ${response.data.data[0].nama_pegawai}</p>
                                </div>
                            </div>
                            <style>
                            .element-to-convert {
                                box-sizing: border-box;
                                position: center;
                                width: 100%;
                                height: 260px;
                                padding: 10px;
                                background: #FFFFFF;
                                border: 1px solid #000000;
                                border-radius: 1px;
                            }
                            h1{
                                font-size: 20px;
                            }
                            
                            #header{
                                display: flex;
                            }
                            #header p{
                                padding-left: 420px;
                            }
                            #container{
                                display: flex;
                            }
                            #container p ~ p {
                                padding-left: 250px;
                            }
                            .kasir{
                                padding-left: 475px;
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
    },
};
</script>


