<template>
<div>
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
    <div v-if="page === 'main'">
        <div class="text-center m-5 title-form">
            <h1>Welcome to Kanban !</h1>
        </div>
        <div class="container">
            <div class="d-flex flex-row justify-content-center">
                <div class="col-sm-3 rounded ml-2 mr-2 pl-2 pr-2 pb-4" style="height: 100%; background-color: #c7fff5">
                    <div class="container">
                        <div class="bg-danger rounded">
                            <div class="text-center m-3 p-2">
                                <h2>Back-Log</h2>
                            </div>
                        </div>
                        <div class="overflow-auto" style="max-height: 60vh;">
                            <div class="card mb-2" :key="task.id" v-for="task in backlogData">
                                <div class="card-body">
                                    <h5 class="card-title">{{ task.title }}</h5>
                                    <p class="card-text">{{ task.description }}</p>
                                    <a href="" class="btn btn-primary" v-on:click.prevent="editDataForm(task.id)">Edit</a>
                                    <a href="" class="btn btn-primary" v-on:click.prevent="deleteData(task.id)">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 rounded ml-2 mr-2 pl-2 pr-2 pb-4" style="height: 100%; background-color: #c7fff5">
                    <div class="container">
                        <div class="bg-warning rounded">
                            <div class="text-center m-3 p-2">
                                <h2>To-Do</h2>
                            </div>
                        </div>
                        <div class="overflow-auto" style="max-height: 60vh;">
                            <div class="card mb-2" :key="task.id" v-for="task in todoData">
                                <div class="card-body">
                                    <h5 class="card-title">{{ task.title }}</h5>
                                    <p class="card-text">{{ task.description }}</p>
                                    <a href="" class="btn btn-primary" v-on:click.prevent="editDataForm(task.id)">Edit</a>
                                    <a href="" class="btn btn-primary" v-on:click.prevent="deleteData(task.id)">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 rounded ml-2 mr-2 pl-2 pr-2 pb-4" style="height: 100%; background-color: #c7fff5">
                    <div class="container">
                        <div class="bg-primary rounded">
                            <div class="text-center m-3 p-2">
                                <h2>Done</h2>
                            </div>
                        </div>
                        <div class="overflow-auto" style="max-height: 60vh;">
                            <div class="card mb-2" :key="task.id" v-for="task in doneData">
                                <div class="card-body">
                                    <h5 class="card-title">{{ task.title }}</h5>
                                    <p class="card-text">{{ task.description }}</p>
                                    <a href="" class="btn btn-primary" v-on:click.prevent="editDataForm(task.id)">Edit</a>
                                    <a href="" class="btn btn-primary" v-on:click.prevent="deleteData(task.id)">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 rounded ml-2 mr-2 pl-2 pr-2 pb-4" style="height: 100%; background-color: #c7fff5">
                    <div class="container">
                        <div class="bg-success rounded">
                            <div class="text-center m-3 p-2">
                                <h2>Completed</h2>
                            </div>
                        </div>
                        <div class="overflow-auto" style="max-height: 60vh;">
                            <div class="card mb-2" :key="task.id" v-for="task in completedData">
                                <div class="card-body">
                                    <h5 class="card-title">{{ task.title }}</h5>
                                    <p class="card-text">{{ task.description }}</p>
                                    <a href="" class="btn btn-primary" v-on:click.prevent="editDataForm(task.id)">Edit</a>
                                    <a href="" class="btn btn-primary" v-on:click.prevent="deleteData(task.id)">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- EDIT TASK -->

    <div v-if="page === 'editTask'">
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
const base_url = 'http://localhost:3000';

export default Vue.extend({
    data() {
        return {
            task: [],
            page: 'main',
            edit_title: '',
            edit_description: '',
            edit_category: '',
            edit_id: ''
        }
    },
    created() {
        this.getAllTask();
    },
    computed: {
        backlogData() {
            let data = this.task.filter(x => {
                return x.category === 'Back-Log'
            });
            return data;
        },
        todoData() {
            let data = this.task.filter(x => {
                return x.category === 'To-Do'
            });
            return data;
        },
        doneData() {
            let data = this.task.filter(x => {
                return x.category === 'Done'
            });
            return data;
        },
        completedData() {
            let data = this.task.filter(x => {
                return x.category === 'Completed'
            });
            return data;
        }
    },
    methods: {
        getAllTask() {
            axios({
                method: 'GET',
                url: base_url + '/tasks',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data }) => {
                this.task = [];
                data.forEach(x => {
                    this.task.push(x);
                })
            }).catch(err => {
                this.$emit('showError', err);
            });
        },
        mainPage() {
            this.getAllTask();
            this.page = 'main';
        },
        logOutUser() {
            this.$emit('logOutUser', 'login');
        },
        deleteData(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
                    axios({
                        method: 'DELETE',
                        url: base_url + `/tasks/${id}`,
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        this.mainPage();
                    }).catch(err => {
                        this.$emit('showError', err);
                    });
                }
              })
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
                this.page = 'editTask';
            }).catch(err => {
                this.$emit('showError', err);
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
                this.edit_title = '';
                this.edit_description = '';
                this.edit_category = '';
                this.edit_id = '';
                this.mainPage();
            }).catch(err => {
                this.$emit('showError', err);
            });
        },
        addTaskForm() {
            this.$emit('changePage', 'createTask');
        }
    }
})
</script>
