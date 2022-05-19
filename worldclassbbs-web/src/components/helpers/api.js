export default async function fetchApi(path, options) {
    const domain = "http://127.0.0.1:5100/";
    const token = localStorage.getItem("token");
    fetch(domain + path, {...options, headers: {'Content-Type': 'application/json', 'Token': token}})
            .then(response => {
                if(response.ok) {
                    return response.json()
                }
            });
}