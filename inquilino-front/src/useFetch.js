import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useFetch(url, key) {
    const [data, setData] = useState()

    const login = useSelector(s => s.login)

    useEffect(() => {
        const opts = {}
        if (login) {
            opts.headers = { 'Authorization': login.token }
        }
        fetch(url, opts)
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [url, key, login])

    console.log(url)

    return data
}

export default useFetch