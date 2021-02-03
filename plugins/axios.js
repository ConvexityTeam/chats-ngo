export default async function({ $axios, app }) {
    $axios.onRequest(config => {

        const token = localStorage.getItem('userToken')

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }


    });

    $axios.onError(err => {
        console.log(err);

        if (err.message == 'jwt expired"') {
            return redirect("/login");
        }
    });

    const instance = $axios.create({
        baseURL: 'https://chats-backend.herokuapp.com/api/v1',
        // headers: config.headers["Authorization"] = `Bearer ${token}`
    });

    instance.interceptors.response.use((response) => {
        if (response.status === 419) {
            //add your code
            return redirect("/login");
        }
        return response;
    }, (error) => {
        if (error.response && error.response.data) {
            //add your code
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error.message);
    });

    return instance;
}