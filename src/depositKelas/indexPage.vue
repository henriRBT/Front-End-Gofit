<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <router-link :to="{name: 'depositKelas.create'}" class="btn btn-md btn-success">Tambah Kelas</router-link>
                          
              <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID transaksi</th>
                    <th scope="col">Nama Member</th>
                    <th scope="col">Jenis Kelas</th>
                    <th scope="col">Jumlah Bayar</th>
                    <th scope="col">Total  Deposit</th> 
                    <th scope="col">Tanggal Berlaku</th>
                    <th scope="col">Menu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(transaksi_deposit_kelas, no_struk_kelas) in transaksi_deposit_kelas" :key="no_struk_kelas">
                    <td>{{ transaksi_deposit_kelas.no_struk_kelas }}</td>
                    <td>{{ transaksi_deposit_kelas.member.nama_member }}</td>
                    <td>{{ transaksi_deposit_kelas.kelas.nama_kelas }}</td>
                    <td>{{ transaksi_deposit_kelas.jumlah_bayar_kelas}}</td>
                    <td>{{ transaksi_deposit_kelas.total_deposit_kelas }}</td>
                    <td>{{ transaksi_deposit_kelas.tanggal_berlaku }}</td>
                    <td class="text-center">
                      <button @click.prevent="printStruk(transaksi_deposit_kelas.no_struk_kelas)" style="margin-left: 10px;" class="btn btn-sm btn-danger ml1">Cetak</button> 
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
  import { onMounted, ref } from "vue";
  export default {
    setup() {
      //reactive state
      let transaksi_deposit_kelas = ref([]);
      //state validation
      const validation = ref([]);
      //vue router
  
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get("http://127.0.0.1:8000/api/transaksi")
          .then((response) => {
            //assign state posts with response data
            transaksi_deposit_kelas.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
      //return
      return {
        transaksi_deposit_kelas,
        validation,
      };
    },
  
    methods:{
          printStruk(no_struk_kelas) {
              axios.get(`http://127.0.0.1:8000/api/cetakKelas/${no_struk_kelas}`)
                      .then((response) => {
                            // Mendapatkan tanggal hari ini
                              const today = new Date(); 
                              // Format tanggal sesuai dengan format yang diinginkan
                              const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`; 
                              
                              // Format jam sesuai dengan format yang diinginkan
                              const formattedTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`; 
                                          //assign state posts with response data
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
                                  <p> Deposit  (${response.data.data[0].nama_promo}) :  
                                    ${response.data.data[0].jumlah_bayar_kelas},- 
                                    (${response.data.data[0].jumlah_deposit_kelas} x ${response.data.data[0].harga_kelas}) <p>
                                  <p> Kelas   : ${response.data.data[0].nama_kelas} <p>
                                  <p> Total Deposit ${response.data.data[0].nama_kelas}:  ${response.data.data[0].total_deposit_kelas} <p>
                                  <p> Berlaku sampai dengan : ${response.data.data[0].tanggal_berlaku} <p>

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
          }
  };
  </script>
  