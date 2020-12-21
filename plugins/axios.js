export default async function({ $axios, app }) {
    $axios.onRequest(config => {

        const token = localStorage.getItem('userToken')

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
    });

    $axios.onError(err => {
        console.log(err);
    });
}