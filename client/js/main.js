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
        register_password_confirm: '',
        task_title: '',
        task_description: '',
        task_category: 'Back-Log',
        edit_title: '',
        edit_description: '',
        edit_category: '',
        edit_id: ''
    },
    created() {
        if (localStorage.getItem('token')) {
            this.page = 'main';
            this.getAllTask();
        }
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
        signUpForm() {
            this.page = 'register';
        },
        loginForm() {
            this.page = 'login';
        },
        addTaskForm() {
            this.page = 'create-task';
        },
        mainPage() {
            this.task_title = '';
            this.task_description = '';
            this.task_category = 'Back-Log';
            this.edit_title = '';
            this.edit_description = '';
            this.edit_category = '';
            this.edit_id = '';
            this.getAllTask();
            this.page = 'main';
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
                this.getAllTask();
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
            if (this.register_password !== this.register_password_confirm) {
                console.log('Make sure you input the same password');
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
                    this.page = 'login';
                    this.register_email = '';
                    this.register_password = '';
                    this.register_password_confirm = '';
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
            }
        },
        logOutUser() {
            localStorage.removeItem('token');
            this.page = 'login';
        },
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
        deleteData(id) {
            axios({
                method: 'DELETE',
                url: base_url + `/tasks/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(() => {
                this.getAllTask();
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
                this.task_title = '';
                this.task_description = '';
                this.task_category = '';
                this.page = 'main';
                this.getAllTask();
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
                this.getAllTask();
                this.page = 'main';
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
        }
    }
})