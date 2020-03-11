function showError(err) {
    let msg = null;
    if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (Array.isArray(err.response.data.msg)) {
            msg = err.response.data.msg.join('<br>')
        } else {
            msg = err.response.data.msg;
        }
    } else if (err.request) {
        // The request was made but no response was received
        // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(err.request);
        msg = err.request;
    } else {
        // Something happened in setting up the request that triggered an err
        console.log('Error', err.message);
        msg = err.message;
    }
    Swal.fire({
        icon: 'error',
        title: 'Error',
        html: `${msg}`
      })
}