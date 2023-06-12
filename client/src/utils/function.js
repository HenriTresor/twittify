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

export async function getUserProfile() {
    try {
        const res = await axios.get(`${serverLink}/api/v1/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${getCookie('access_token')}`
            }
        })

        return res.data
    } catch (error) {
        console.log('error getting user profile', error.message)
        return {
            error: error.message
        }
    }
}

export const findIfLiked = (post, user) => {
    return post?.post_likes?.find(like => like?._id === user?._id)
}

export const handleLiking = () => {

}

export const getUserTweets = async (id) => {
    try {
        
        const res = await axios.get(`${serverLink}/api/v1/tweets/user/${id}`)
        return res.data
    } catch (error) {
        console.log('error getting userTweets', error.message)
        return {
            error:error.message
        }
    }
}
export {
    likeTweet, getCookie
}