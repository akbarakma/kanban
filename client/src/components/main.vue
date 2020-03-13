<template>
<div>
    <navbar
        @mainPage="mainPage"
        @logOutUser="logOutUser"
        @addTaskForm="addTaskForm"
    ></navbar>
    <!--  NAVBAR DIATAS  -->
    <div v-if="page === 'main'">
        <div class="container">
            <div class="d-flex flex-row justify-content-center">
                <!-- ===== -->
                <task
                    class="col-sm-3 rounded ml-2 mr-2 pl-2 pr-2 pb-4" style="height: 100%; background-color: #c7fff5"
                    v-for="category in categories"
                    :key="category.index"
                    :category="category"
                    :task="task"
                    @editDataForm="editDataForm"
                    @deleteData="deleteData"
                ></task>
                <!-- ===== -->
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import taskCard from './taskCard.vue';
import navbar from './navbar.vue';
import task from './task.vue';
const base_url = 'https://evening-oasis-81239.herokuapp.com';

export default Vue.extend({
    components: {
        taskCard,
        navbar,
        task
    },
    data() {
        return {
            task: [],
            page: 'main',
            categories: [
                {
                    name: 'Back-Log',
                    class: 'bg-danger rounded'
                },
                {
                    name: 'To-Do',
                    class: 'bg-warning rounded'
                },
                {
                    name: 'Done',
                    class: 'bg-primary rounded'
                },
                {
                    name: 'Completed',
                    class: 'bg-success rounded'
                }]
        }
    },
    created() {
        this.getAllTask();
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
            this.$emit('changePage', 'main');
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
        addTaskForm(page) {
            this.$emit('changePage', page);
        },
        editDataForm(id) {
            this.$emit('editDataForm', id);
        }
    }
})
</script>
