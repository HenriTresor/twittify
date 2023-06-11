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

export {
    likeTweet
}