<template>

<div>
    <div class="text-center m-5 title-form">
        <h1>Welcome to Kanban !</h1>
    </div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="card p-5">
                <h1>Register Your Account</h1>
                <form class="mb-3" v-on:submit.prevent="registerUser">
                    <div class="form-group">
                        <label>Email address</label>
                        <input type="email" class="form-control" v-model="register_email" >
                        <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="register_password" >
                    </div>
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input type="password" class="form-control" v-model="register_password_confirm" >
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>
                </form>
                <a href="" v-on:click.prevent="loginForm">Already have an account? Login</a>
            </div>
        </div>
    </div>
</div>

</template>

<script lang="ts">
import Vue from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';
const base_url = 'http://localhost:3000';


export default Vue.extend({
    data() {
        return {
            register_email: '',
            register_password: '',
            register_password_confirm: ''
        }
    },
    methods: {
        loginForm() {
            this.$emit('changeForm', 'login');
        },
        registerUser() {
            if (this.register_password !== this.register_password_confirm) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Make sure you input the same password'
                  })
            } else {
                let obj = {
                    email: this.register_email,
                    password: this.register_password
                }
                axios({
                    method: 'POST',
                    url: base_url + '/register',
                    data: obj
                })
                .then(() => {
                    this.$emit('changePage', 'login');
                }).catch(err => {
                    this.$emit('showError', err);
                });
            }
        }
    }
})
</script>