<template>
 
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                     
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID transaksi</th>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">Nama Kelas </th>
                                    <th scope="col">Waktu Booking</th>
                                    <th scope="col">Menu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(booking_kelas, no_struk_booking_kelas) in booking_kelas" :key="no_struk_booking_kelas" :id="'row-' + booking_kelas.no_struk_booking_kelas">
                                    <td>{{ booking_kelas.no_struk_booking_kelas }}</td>
                                    <td>{{ booking_kelas.nama_member }}</td>
                                    <td>{{ booking_kelas.nama_kelas}}</td>
                                    <td>{{ booking_kelas.waktu_booking}}</td>
                                    <td class="text-center"> 
                                        <button @click.prevent="printStruk(booking_kelas.no_struk_booking_kelas, booking_kelas.tipe)" style="margin-left: 10px;" class="btn btn-sm btn-danger ml1">Cetak</button> 
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
        let booking_kelas = ref([]);
        //state validation
        const validation = ref([]);
        //vue router
       
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get("http://127.0.0.1:8000/api/bookingKelas")
                .then((response) => {
                    //assign state posts with response data
                    booking_kelas.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
            });

        //return
        return {
            booking_kelas,
            validation,
            
        };
    },
    methods:{
        printStruk(no_struk_booking_kelas, tipe) {
            // Mendapatkan tanggal hari ini
            const today = new Date(); 
            // Format tanggal sesuai dengan format yang diinginkan
            const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`; 
            
            // Format jam sesuai dengan format yang diinginkan
            const formattedTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`; 

            if(tipe == "Paket"){
                axios.get(`http://127.0.0.1:8000/api/cetakpaket/${no_struk_booking_kelas}`)
                    .then((response) => {
                        //assign state posts with response data
                        document.write( 
                            `<div class="element-to-convert">
                                    <strong>GoFit</strong>
                                    <p>Jl. CentralPark No. 10 Yogyakarta<p>
                                    <br>
                                    <strong>STRUK PRESENSI GYM</strong>
                                    <p>No Struk         : ${response.data.data[0].no_struk_booking_kelas}<p>
                                    <p>Tanggal          : ${formattedDate} / ${formattedTime} <p>
                                    <p><b>Member        :</b> ${response.data.data[0].id_member} / ${response.data.data[0].nama_member}<br> <p>
                                    <p>Kelas            : ${response.data.data[0].nama_kelas}<p>
                                    <p>Instruktur       : ${response.data.data[0].nama_instruktur}<p>
                                    <p>Sisa Deposit     : ${response.data.data[0].total_deposit_kelas}<p>
                                    <p>Tanggal Berlaku  : ${response.data.data[0].tanggal_berlaku}<p>
                            </div>
                            <style>
                            .element-to-convert {
                                box-sizing: border-box;
                                position: center;
                                width: 300px;
                                height: 400px;
                                padding: 10px;
                                background: #FFFFFF;
                                border: 1px solid #000000;
                                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                                border-radius: 9px;
                            }
                            
                            </style>`
                        );response.data.data;
                        console.log(response.data.data)
                        window.print();
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                    });
            }else if(tipe == "Reguler"){
                axios.get(`http://127.0.0.1:8000/api/cetakreguler/${no_struk_booking_kelas}`)
                    .then((response) => {
                        //assign state posts with response data
                        document.write( 
                            `<div class="element-to-convert">
                                    <strong>GoFit</strong>
                                    <p>Jl. CentralPark No. 10 Yogyakarta<p>
                                    <br>
                                    <strong>STRUK PRESENSI GYM</strong>
                                    <p>No Struk         : ${response.data.data[0].no_struk_booking_kelas}<p>
                                    <p>Tanggal          : ${formattedDate} / ${formattedTime} <p>
                                    <p><b>Member        :</b> ${response.data.data[0].id_member} / ${response.data.data[0].nama_member}<br> <p>
                                    <p>Kelas            : ${response.data.data[0].nama_kelas}<p>
                                    <p>Instruktur       : ${response.data.data[0].nama_instruktur}<p>
                                    <p>Tarif            : Rp. 150.000<p>
                                    <p>Sisa Deposit     : ${response.data.data[0].total_jumlah_deposit}<p>
                            </div>
                            <style>
                            .element-to-convert {
                                box-sizing: border-box;
                                position: center;
                                width: 300px;
                                height: 400px;
                                padding: 10px;
                                background: #FFFFFF;
                                border: 1px solid #000000;
                                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                                border-radius: 9px;
                            }
                            
                            </style>`
                        );response.data.data;
                        console.log(response.data.data)
                        window.print();
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                });
            }
           

            // reset CSS untuk elemen yang ingin dicetak
            // elem.style.padding = null;
        },
    },

   
};
</script>


