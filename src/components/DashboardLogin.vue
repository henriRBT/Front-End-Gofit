<template>
    <section>
  
      <!-- Start Tulisan -->
      <nav class="navbar navbar-expand-lg" style="background-color: #00BFFF; padding: 20px;">
            <div class="text-white mb-3 mb-md-0 name">
                Selamat Datang GOFIT 
            </div>
        </nav>
      <!-- End Tulisan -->

        <!-- Login Start -->
        <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center" style="height: 680px">
                <div class="col-md-9 col-lg-6 col-xl-5" style="margin-top: 20px;">
                <img src="https://www.shutterstock.com/shutterstock/photos/721723381/display_1500/stock-photo-modern-light-gym-sports-equipment-in-gym-barbells-of-different-weight-on-rack-721723381.jpg"
                    class="img-fluid" alt="fitnes" />
                </div>

                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

                    <form @submit.prevent="login">
                        <div v-if="loginFailed" class="alert alert-danger"> Username atau Password Anda salah. </div>

                        <!-- Username input -->
                        <div class="mb-3">
                            <input type="text" v-model="pegawai.username" id="username" class="form-control form-control-lg" style="margin-top: 20px;"
                                placeholder="Enter a valid Username" />

                            <div v-if="validation.username" class="mt-2 alert alert-danger">
                                {{ validation.username[0] }}
                            </div>

                            <label class="form-label" for="username">Username</label>
                        </div>

                        <!-- Password input -->
                        <div class="mb-3">
                            <input type="password" v-model="pegawai.password" id="form3Example4" class="form-control form-control-lg"
                                placeholder="Enter password" />

                            <div v-if="validation.password" class="mt-2 alert alert-danger">
                                {{ validation.password[0] }}
                            </div>

                            <label class="form-label" for="form3Example4">Password</label>
                        </div>

                        <div class="text-center text-lg-start" style="margin-bottom: 30px;">
                            <button type="submit" class="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Login End -->
        <footer class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between" style="background-color: #00BFFF; margin-top: 100px; padding: 20px;">
            <div class="text-white mb-3 mb-md-0 name"> Henri Project P3L </div>
        </footer>

    </section>
  </template>
  
  <script>
  import { reactive, ref } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  
  export default {
    setup() {
      //inisialisasi vue router on Composition API
      const router = useRouter();
  
      //state pegawai
      const pegawai = reactive({
        username: "",
        password: "",
      });
  
      //state validation
      const validation = ref([]);
  
      //state loginFailed
      const loginFailed = ref(null);
    

      
      //method login
      function login() {
        //define variable
        let username = pegawai.username;
        let password = pegawai.password;
  
        //send server with axios
        axios
          .post("https://api.henri.krisnarata13.my.id/api/login", {
            username,
            password,
          })
          .then((response) => {
            if (response.data.success) {
              //set token untuk ambil 
              localStorage.setItem("token", response.data.token);
  
              //set untuk id_role masuk 
              console.log(response.data.data.id_role)
              if (response.data.data.id_role == '1') {
                //redirect ke halaman dashboard Manager.index
                return router.push({
                   name: "umum.index",
                });
              }
              if (response.data.data.id_role == '2') {
                //redirect ke halaman dashboard Admin.index
                return router.push({
                   name: "instruktur.index",
                });
              }
              return router.push({
                      name: "member.index",
                });
              
            }
  
            //set state loggedIn to true
            loginFailed.value = true;
          })
          .catch((error) => {
            //set validation dari error response
            validation.value = error.response.data;
          });
      }
  
      return {
        pegawai, // <-- state user
        validation, // <-- state validation
        loginFailed, // <-- state loggedIn
        login, // <-- method login
      };
    },
  };
  </script>
  