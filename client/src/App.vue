<template>
<div>
    <!--LOGIN-->
    
    <login 
        v-if="page === 'login'"
        @changePage="changePage"
        @loginUser="loginUser"
        @showError="showError"
    ></login>

    <!--REGISTER-->

    <register
        v-if="page === 'register'"
        @changePage="changePage"
        @showError="showError"
    ></register>

    <!--MAIN PAGE-->
    
    <mainPage v-if="page === 'main'"
        @changePage="changePage"
        @showError="showError"
        @logOutUser="logOutUser"
        @editDataForm="editDataForm"
    ></mainPage>

    <!-- EDIT TASK -->

    <editTask
        v-if="page === 'editTask'"
        :editId="editId"
        @changePage="changePage"
        @showError="showError"
        @logOutUser="logOutUser"
    ></editTask>

    <!--CREATE TASK-->

    <createTask
        v-if="page === 'createTask'"
        @changePage="changePage"
        @logOutUser="logOutUser"
        @showError="showError"
    ></createTask>

</div>


</template>


<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import login from './components/login.vue';
import register from './components/register.vue';
import mainPage from './components/main.vue';
import createTask from './components/createTask.vue';
import editTask from './components/editTask.vue';

export default Vue.extend({
    components: {
        login,
        register,
        mainPage,
        createTask,
        editTask
    },
    data() {
        return {
            page:'login',
            editId: null
        }
    },
    created() {
        if (localStorage.getItem('token')) {
            this.page = 'main';
        }
    },
    methods: {
        changePage(page) {
            this.page = page;
        },
        loginUser(data){
            localStorage.setItem('token', data.token);
            this.page = 'main';
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            })
        },
        logOutUser(page) {
            this.$gAuth.signOut()
            this.page = page;
            localStorage.removeItem('token');
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Log out successfully'
            })
        },
        editDataForm(id){
            this.editId = id;
            this.page = 'editTask';
        },
        showError(err) {
            let msg = null;
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (Array.isArray(err.response.data.msg)) {
                    msg = err.response.data.msg.join('<br>')
                } else {
                    msg = err.response.data.msg;
                }
            } else if (err.request) {
                // The request was made but no response was received
                // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(err.request);
                msg = err.request;
            } else {
                // Something happened in setting up the request that triggered an err
                console.log('Error', err.message);
                msg = err.message;
            }
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: `${msg}`
            })
        }
    }
})
</script>