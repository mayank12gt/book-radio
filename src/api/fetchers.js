import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL

const API = axios.create({
    baseURL,
})

export const fetchBooks = async ({queryKey})=>{
    const [, search,page] = queryKey
    const res = await API.get(`/audiobooks?page=${page==null?1:page}&search=${search??""}`)
    console.log(res)
    return res
}

export const fetchAudiobook = async ({queryKey})=>{
    const[,id] = queryKey
    console.log(id)
    const res = await API.get(`/audiobooks/${id}`)
    console.log(res)
    return res
}