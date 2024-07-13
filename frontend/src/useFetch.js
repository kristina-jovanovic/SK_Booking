import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = ({ urlFetch, dependencies = [], reqData = {}, reqMethod = "get", callOption = true }) => {

    const [data, setData] = useState(null);
    const [errors, setErrors] = useState(null);
    // let requestData = JSON.stringify(reqData);
    useEffect(() => {
        // console.log('lala');
        if (callOption === true) {
            let config = {
                method: reqMethod,
                url: urlFetch,
                headers: {
                    Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
                },
                data: reqData
            };
            axios
                .request(config)
                .then((response) => {
                    setData(response.data);
                    // console.log(response.data);
                })
                .catch((error, response) => {
                    if (error.response && error.response.data) {
                        console.log(error.response.data);
                        setErrors(error.response.data);
                    }
                });
        }
    }, dependencies);
    return [data, errors];
}

export default useFetch;