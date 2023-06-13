<template>
 
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'depositUang.create'}" class="btn btn-md btn-success">Tambah Uang</router-link>
                        
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">Tanggal Transaksi</th>
                                    <th scope="col">Total Deposit</th>
                                    <th scope="col">Bonus</th>
                                    <th scope="col">Menu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(deposit_uang, no_struk_uang) in deposit_uang" :key="no_struk_uang" :id="'row-' + deposit_uang.no_struk_uang">
                                    <td>{{ deposit_uang.member.nama_member }}</td>
                                    <td>{{ deposit_uang.tanggal_transaksi }}</td>
                                    <td>{{ deposit_uang.total_deposit }}</td>
                                    <td>{{ deposit_uang.bonus }}</td>
                                    <td class="text-center"> 
                                        <button @click.prevent="printStruk(deposit_uang.no_struk_uang)" style="margin-left: 10px;" class="btn btn-sm btn-danger ml1">Cetak</button> 
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
        //reactive state
        let deposit_uang = ref([]);
        //state validation
        const validation = ref([]);
        //vue router
       
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get("http://127.0.0.1:8000/api/uang")
                .then((response) => {
                    //assign state posts with response data
                    deposit_uang.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
            });

        //return
        return {
            deposit_uang,
            validation,
            
        };
    },
    methods:{
        printStruk(no_struk_uang) {
            axios.get(`http://127.0.0.1:8000/api/cetakUang/${no_struk_uang}`)
                    .then((response) => {
                          
                            const today = new Date(); 
                            const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`; 
                            const formattedTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`; 
                                     
                        document.write( 
                            `<div class="element-to-convert">
                                  <div id="header"> 
                                      <h1>GoFit</h1>
                                      <p>No Struk : ${response.data.data[0].no_struk_kelas}</p>
                                  </div>

                                  <div id="container"> 
                                    <p>Jl. CentralPark No. 10 Yogyakarta</p>
                                    <p>Tanggal     :${formattedDate}  ${formattedTime} </p>
                                  </div>

                                  <p> <strong>Member</strong>     : ${response.data.data[0].id_member} / ${response.data.data[0].nama_member}</p>
                                  <p> Deposit :  ${response.data.data[0].jumlah_bayar} <p>
                                  <p> Bonus Deposit  : ${response.data.data[0].bonus} <p>
                                  <p> Sisa Deposit  : ${response.data.data[0].sisa_deposit} <p>
                                  <p> Total Deposit  : ${response.data.data[0].total_deposit} <p>
                                 
                                  <div class="kasir"> 
                                    <p>Kasir    :P0${response.data.data[0].id_pegawai} / ${response.data.data[0].nama_pegawai}</p>
                                  </div>
                              </div>
                              <style>
                                .element-to-convert {
                                    box-sizing: border-box;
                                    position: center;
                                    width: 100%;
                                    height: 350px;
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


