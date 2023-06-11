<template>
  <div class="d-flex justify-content-between flex-wrap flex-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Jadwal Harian</h1>
  </div>

  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Hari</th>
                  <th scope="col">Tanggal Kelas</th>
                  <th scope="col">Sesi</th>
                  <th scope="col">Nama Kelas</th>
                  <th scope="col">Nama Instruktur</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(jadwal_harian, id) in jadwal_harian" :key="id">
                  <td>{{ jadwal_harian.hari }}</td>
                  <td>{{ jadwal_harian.tanggal }}</td>
                  <td>{{ jadwal_harian.sesi_kelas }}</td>
                  <td>{{ jadwal_harian.kelas.nama_kelas }}</td>
                  <td>{{ jadwal_harian.instruktur.nama_instruktur }}</td>
                  <td>{{ jadwal_harian.status }}</td>
                </tr>
                <br />
              </tbody>
              <button class="btn btn-primary" @click="generateJadwal" :disabled="generated">Generate Jadwal</button>
              <Bootstrap5Pagination
                :data="jadwal_harian"
                @pagination-change-page="getResults"
              />
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
import { createToaster } from "@meforma/vue-toaster";
import { Bootstrap5Pagination } from 'laravel-vue-pagination';

export default {
  components: {
    Bootstrap5Pagination
  },

  setup() {

    let jadwal_harian = ref([]);
    const toaster = createToaster({});

    const getResults = async (page = 5) => {
      const response = await fetch(`https://api.henri.krisnarata13.my.id/api/harian?page=${page}`);
       jadwal_harian.value = response.data.data;
    }
   

    onMounted(() => {
      axios
        .get("https://api.henri.krisnarata13.my.id/api/harian")
        .then((response) => {
          jadwal_harian.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function generateJadwal() {
      axios
        .post(`https://api.henri.krisnarata13.my.id/api/generateJadwal`)
        .then((response) => {
          console.log(response.data.message);
          toaster.success(`Data Sudah digenerate`);
        })
        .catch((error) => {
          console.log(error);
          toaster.error(`Data Error`);
        });
      axios
        .get("https://api.henri.krisnarata13.my.id/api/harian")
        .then((response) => {
          jadwal_harian.value = response.data.data;
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
        
    }

    return {
      jadwal_harian,
      generateJadwal,
      getResults,
      Bootstrap5Pagination
    };
  },
};
</script>
