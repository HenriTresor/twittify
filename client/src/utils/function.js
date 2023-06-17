import axios from "axios"
import serverLink from "./server.link"

let likeTweet = async (body) => {
    try {
        let res = await axios.put(`${serverLink}/api/v1/tweets/like`, body)
        return res
    } catch (error) {

        return {
            error: error.response.data.message || error.message
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
            error: error.response.data.message || error.message
        }
    }
}

export const findIfLiked = (post, user) => {
    return post?.post_likes?.find(like => like?._id === user?._id)
}

export const findIfFollows = (currentUser, user) => {
    // console.log('inside findIfFollows function', currentUser, user)
    return user?.followers?.find(follower => follower?._id === currentUser?._id)
}
export const handleLiking = () => {

}

export const getUser = async (username) => {
    try {

        const res = await axios.get(`${serverLink}/api/v1/users/${username}`)
        return res.data
    } catch (error) {
        console.log('error getting user profile', error.message)
        return {
            error: error.response?.data?.message || error.message
        }
    }
}
export const getUserTweets = async (id) => {
    try {

        const res = await axios.get(`${serverLink}/api/v1/tweets/user/${id}`)
        return res.data
    } catch (error) {
        console.log('error getting userTweets', error.message)
        return {
            error: error.response.data.message || error.message
        }
    }
}

export const followUser = async (body) => {
    try {

        const res = await axios.put(`${serverLink}/api/v1/users/follow`, body)
        return res.data
    } catch (error) {
        console.log('erro following user', error)
        return {
            error: error.response.data.message || error.message
        }
    }
}

export const getUsersByQuery = async (q) => {
    try {

        const res = await axios.get(`${serverLink}/api/v1/users/query?name=${q}`)
        return res.data
    } catch (error) {
        return {
            error: error.response.data.message || error.message
        }
    }
}
export {
    likeTweet, getCookie
}