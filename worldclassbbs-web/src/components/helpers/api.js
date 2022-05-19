import { useState, useEffect } from "react";

const useFetchApi = (path, options) => {
    const [domain] = useState("http://127.0.0.1/:5100");
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(domain + path, options)
            .then(res => res.json())
            .then(data => setData(data));
    }, [path, options]);
    return { data }
}

export default async function fetchApi(path, options) {
    const domain = "http://127.0.0.1:5100/";
    fetch(domain + path, {...options, headers: {'Content-Type': 'application/json'}})
            .then(response => {
                if(response.ok) {
                    return response.json()
                }
            });
}