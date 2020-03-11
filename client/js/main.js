const base_url = 'http://localhost:3000';

let app = new Vue({
    el: '#app',
    data: {
        task: [],
        page:'login',
        login_email: '',
        login_password: '',
        register_email: '',
        register_password: '',
        register_password_confirm: ''
    },
    created() {
        if (localStorage.getItem('token')) {
            this.page = 'main';
        }
    },
    methods: {
        signUpForm() {
            this.page = 'register';
        },
        loginForm() {
            this.page = 'login';
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
                localStorage.setItem('token', data.token);
                this.page = 'main';
                this.login_email = '';
                this.login_password = '';
            }).catch(err => {
                if (err.response) {
                    // jangan lupa di modal
                    console.log(err.response.data.msg);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log('Error', err.message);
                }
            });
        },
        registerUser() {
            console.log(this.register_email, this.register_password, this.register_password_confirm);
        },
        logOutUser() {
            localStorage.removeItem('token');
            this.page = 'login';
        }
    }
})