const base_url = 'http://localhost:3000';

function loginUserApi(email, password) {
    let obj = { email, password };
    axios({
        method: 'POST',
        url: base_url + '/login',
        data: obj
    })
    .then(({ data }) => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}