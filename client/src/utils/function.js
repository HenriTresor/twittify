import axios from "axios"
import serverLink from "./server.link"

let likeTweet = async (body) => {
    try {
        let res = await axios.put(`${serverLink}/api/v1/tweets/like`, body)
        return res
    } catch (error) {
        console.log(error)
        return {
            error
        }
    }
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}


export {
    likeTweet, getCookie
}