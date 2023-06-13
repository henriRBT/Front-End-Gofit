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
                                    <th scope="col">Waktu Booking</th>
                                    <th scope="col">Tanggal Gym</th>
                                    <th scope="col">Slot Waktu</th>
                                    <th scope="col">Menu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(booking_gym, no_struk_gym) in booking_gym" :key="no_struk_gym" :id="'row-' + booking_gym.no_struk_gym">
                                    <td>{{ booking_gym.no_struk_gym }}</td>
                                    <td>{{ booking_gym.member.nama_member }}</td>
                                    <td>{{ booking_gym.waktu_booking}}</td>
                                    <td>{{ booking_gym.tanggal_booking}}</td> 
                                    <td>{{ booking_gym.slot_waktu}}</td>
                                    <td class="text-center"> 
                                        <button v-if="booking_gym.waktu_presensi == '0000-00-00 00:00:00'" @click.prevent="presensi(booking_gym.no_struk_gym)" style="margin-left: 10px;" class="btn btn-sm btn-success ml1">Presensi</button> 
                                        <button v-if="booking_gym.waktu_presensi != '0000-00-00 00:00:00'" @click.prevent="printStruk(booking_gym.no_struk_gym)" style="margin-left: 10px;" class="btn btn-sm btn-danger ml1">Cetak</button> 
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
import swal from 'sweetalert';
export default {
    setup() {
       
        let booking_gym = ref([]);
        
        const validation = ref([]);
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get("http://127.0.0.1:8000/api/gym")
                .then((response) => {
                    //assign state posts with response data
                    booking_gym.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
            });

            function presensi(id){
                axios.post(`http://127.0.0.1:8000/api/presensi/${id}`)
                .then((response) => {
                    //assign state posts with response data
                    const updatedpresensi = booking_gym.value.find((item) => item.id === id);
                    if (updatedpresensi) {
                        updatedpresensi.waktu_presensi = response.data.waktu_presensi;
                        
                    }
                })
                swal("Presensi Berhasil !", {
                    icon: "success",
                }).then(() => {
                    window.history.go(0);
                })
                .catch((error) => {
                    console.log(error.response.data);
                    swal("Presensi Error!");
                });
            }
        //return
        return {
            booking_gym,
            validation,
            presensi
        };
    },
    methods:{
        printStruk(no_struk_gym) {
          
           const today = new Date(); 
          
           const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`; 
          
           const formattedTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`; 

           axios.get(`http://127.0.0.1:8000/api/cetak/${no_struk_gym}`)
                   .then((response) => {
                       //assign state posts with response data
                       document.write( 
                           `<div class="element-to-convert">
                                   <strong>GoFit</strong>
                                   <p>Jl. CentralPark No. 10 Yogyakarta<p>
                                   <br>
                                   <strong>STRUK PRESENSI GYM</strong>
                                   <p>  No Struk: ${response.data.data[0].no_struk_gym}<p>
                                   <p style="margin-bottom:30px;">  Tanggal: ${formattedDate} / ${formattedTime} <p>
                                   <p> <b>Member:</b> ${response.data.data[0].id_member} / ${response.data.data[0].nama_member}<br> <p>
                                   <p> Slot Waktu: ${response.data.data[0].slot_waktu} <p>
                           </div>
                           <style>
                            .element-to-convert {
                                box-sizing: border-box;
                                position: center;
                                width: 300px;
                                height: 300px;
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
       },
   },
};
</script>


