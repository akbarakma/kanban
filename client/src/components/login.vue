<template>
<div>
    <div class="text-center m-5 title-form">
        <h1>Welcome to Kanban !</h1>
    </div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="card p-5">
                <h1>Login Your Account</h1>
                <form class="mb-3" v-on:submit.prevent="loginUser">
                    <div class="form-group">
                        <label>Email address</label>
                        <input type="email" class="form-control" v-model="login_email" >
                        <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="login_password" >
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                <a href="" v-on:click.prevent="signUpForm" class="mb-3">Don't have an account? Register</a>
                <div id="google-signin-btn"></div>
            </div>
        </div>
    </div>
</div>

</template>


<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
const base_url = 'http://localhost:3000';

export default Vue.extend({
    data() {
        return {
            login_email: '',
            login_password: '',
        }
    },
    mounted() {
        gapi.signin2.render('google-signin-btn', {
            onsuccess: this.onSignIn
        })
    },
    methods: {
        onSignIn(googleUser) {
            let id_token = googleUser.getAuthResponse().id_token;
            let obj = { token: id_token };
            axios({
                method: 'POST',
                url: base_url + '/googlelogin',
                data: obj
            })
            .then(({ data }) => {
                this.$emit('loginUser', data);
            }).catch(err => {
                this.$emit('showError', err);
            })
        },
        signUpForm() {
            this.login_email = ''
            this.login_password = ''
            this.$emit('changePage', 'register');
        },
        loginUser() {
            let obj = {
                email: this.login_email,
                password: this.login_password
            };
            axios({
                method: 'POST',
                url: base_url + '/login',
                data: obj
            })
            .then(({ data }) => {
                this.login_email = '';
                this.login_password = '';
                this.$emit('loginUser', data);
            }).catch(err => {
                this.$emit('showError', err);
            });
        },
    }

})
</script>