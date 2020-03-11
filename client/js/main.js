let app = new Vue({
    el: '#app',
    data: {
        task: [],
        isLogin: false,
        seen: true,
        SignUpPage: false,
        login_email: null,
        login_password: null,
        register_email: null,
        register_password: null,
        register_password_confirm: null
    },
    methods: {
        signUpForm() {
            this.SignUpPage = true;
        },
        loginForm() {
            this.SignUpPage = false;
        },
        loginUser() {
            loginUserApi(this.login_email, this.login_password);
        },
        registerUser() {
            console.log(this.register_email, this.register_password, this.register_password_confirm);
        }
    }
})