<template>
    
    <div>
        <navbar
            @mainPage="mainPage"
            @logOutUser="logOutUser"
            @addTaskForm="addTaskForm"
        ></navbar>
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

</template>

<script>
import axios from 'axios';
import navbar from './navbar.vue';
const base_url = 'https://evening-oasis-81239.herokuapp.com';

export default {
    components: {
        navbar
    },
    props: ['editId'],
    data(){
        return {
            edit_title: '',
            edit_description: '',
            edit_category: ''
        }
    },
    created() {
        axios({
            method: 'GET',
            url: base_url + `/tasks/${this.editId}`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
            this.edit_title = data.title;
            this.edit_description = data.description;
            this.edit_category = data.category;
        }).catch(err => {
            this.$emit('showError', err);
        });
    },
    methods: {
        editData() {
            let obj = {
                title: this.edit_title,
                description: this.edit_description,
                category: this.edit_category
            };
            axios({
                method: 'PUT',
                url: base_url + `/tasks/${this.editId}`,
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
        },
        addTaskForm() {
            this.$emit('changePage', 'createTask');
        },
    }
}
</script>