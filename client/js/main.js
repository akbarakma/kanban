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
            this.reset();
            this.page = 'register';
        },
        loginForm() {
            this.reset();
            this.page = 'login';
        },
        addTaskForm() {
            this.page = 'create-task';
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
                this.reset();
                this.mainPage();
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
            }).catch(err => {
                showError(err);
            });
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
                    this.reset();
                    this.page = 'login';
                }).catch(err => {
                    showError(err);
                });
            }
        },
        logOutUser() {
            localStorage.removeItem('token');
            this.reset();
            this.page = 'login';
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
                showError(err);
            });
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
                        this.reset();
                        this.mainPage();
                    }).catch(err => {
                        showError(err);
                    });
                }
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
                showError(err);
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
                showError(err);
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
                showError(err);
            });
        }
    }
})