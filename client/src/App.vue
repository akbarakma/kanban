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
        @showError="showError"
        @logOutUser="logOutUser"
    ></mainPage>

    <!--CREATE TASK-->

    <div v-if="page === 'create-task'">
        <div id="navbar-page">
            <nav class="navbar navbar-expand-lg navbar-light bg-dark mb-3">
                <a class="navbar-brand text-light" v-on:click.prevent="mainPage" href="">Kanban</a>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="btn btn-primary mr-2" href="" v-on:click.prevent="addTaskForm">Add Task</a>
                        </li>
                    </ul>
                </div>
                <button class="btn btn-info" v-on:click.prevent="logOutUser">Sign Out</button>
            </nav>
        </div>
        <!--  NAVBAR DIATAS  -->
        <div class="text-center m-5 title-form">
            <h1>Create A New Task</h1>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="card p-4">
                    <form class="mb-3" v-on:submit.prevent="createTask">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control" v-model="task_title" >
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <input type="text" class="form-control" v-model="task_description" >
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select v-model="task_category" class="custom-select mr-sm-2">
                                <option value="Back-Log">Back-Log</option>
                                <option value="To-Do">To-Do</option>
                                <option value="Done">Done</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button class="btn btn-danger" v-on:click.prevent="mainPage">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!--EDIT TASK-->

    <div v-if="page === 'edit-task'">
        <div id="navbar-page">
            <nav class="navbar navbar-expand-lg navbar-light bg-dark mb-3">
                <a class="navbar-brand text-light" v-on:click.prevent="mainPage" href="">Kanban</a>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="btn btn-primary mr-2" href="" v-on:click.prevent="addTaskForm">Add Task</a>
                        </li>
                    </ul>
                </div>
                <button class="btn btn-info" v-on:click.prevent="logOutUser">Sign Out</button>
            </nav>
        </div>
        <!--  NAVBAR DIATAS  -->
        <div class="text-center m-5 title-form">
            <h1>Edit Your Task</h1>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="card p-4">
                    <form class="mb-3" v-on:submit.prevent="editData">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control" v-model="edit_title" >
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <input type="text" class="form-control" v-model="edit_description" >
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select v-model="edit_category" class="custom-select mr-sm-2">
                                <option value="Back-Log">Back-Log</option>
                                <option value="To-Do">To-Do</option>
                                <option value="Done">Done</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button class="btn btn-danger" v-on:click.prevent="mainPage">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>


</template>


<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import login from './components/login.vue';
import register from './components/register.vue';
import mainPage from './components/main.vue';
const base_url = 'http://localhost:3000';

export default Vue.extend({
    components: {
        login,
        register,
        mainPage
    },
    data() {
        return {
            page:'login',
            task_title: '',
            task_description: '',
            task_category: 'Back-Log',
            edit_title: '',
            edit_description: '',
            edit_category: '',
            edit_id: ''
        }
    },
    created() {
        if (localStorage.getItem('token')) {
            this.page = 'main';
            // this.getAllTask();
        }
    },
    methods: {
        changePage(page) {
            this.page = page;
        },
        addTaskForm() {
            this.page = 'create-task';
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
        reset() {
            this.login_email = '';
            this.login_password = '';
            this.register_email = '';
            this.register_password = '';
            this.register_password_confirm = '';
            this.task_title = '';
            this.task_description = '';
            this.task_category = 'Back-Log';
            this.edit_title = '';
            this.edit_description = '';
            this.edit_category = '';
            this.edit_id = '';
        },
        mainPage() {
            this.page = 'main';
        },
        logOutUser(page) {
            localStorage.removeItem('token');
            this.page = page;
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
        createTask() {
            let obj = {
                title: this.task_title,
                description: this.task_description,
                category: this.task_category
            };
            axios({
                method: 'POST',
                url: base_url + '/tasks',
                headers: {
                    token: localStorage.getItem('token')
                },
                data: obj
            })
            .then(() => {
                this.reset();
                this.mainPage();
            }).catch(err => {
                this.showError(err);
            });
        },
        editDataForm(id) {
            axios({
                method: 'GET',
                url: base_url + `/tasks/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data }) => {
                this.edit_title = data.title;
                this.edit_description = data.description;
                this.edit_category = data.category;
                this.edit_id = data.id;
                this.page = 'edit-task';
            }).catch(err => {
                this.showError(err);
            });
        },
        editData() {
            let obj = {
                title: this.edit_title,
                description: this.edit_description,
                category: this.edit_category
            };
            axios({
                method: 'PUT',
                url: base_url + `/tasks/${this.edit_id}`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: obj
            })
            .then(() => {
                this.reset();
                this.mainPage();
            }).catch(err => {
                this.showError(err);
            });
        },
        showError(err) {
            let msg = null;
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(err.response.data);
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