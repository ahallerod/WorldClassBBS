import { useState, useEffect, React } from "react";

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