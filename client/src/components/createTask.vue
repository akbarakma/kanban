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

</template>

<script>
import axios from 'axios';
const base_url = 'http://localhost:3000';

export default {
    data() {
        return {
            task_title: '',
            task_description: '',
            task_category: 'Back-Log'
        }
    },
    methods: {
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
                this.$emit('changePage', 'main');
            }).catch(err => {
                this.$emit('showError', err);
            });
        },
        mainPage() {
            this.$emit('changePage', 'main');
        },
        logOutUser() {
            this.$emit('logOutUser', 'login');
        }
    }
}
</script>