import axios from "axios";

//const baseURL = "http://localhost:8080"
const baseURL = import.meta.env.VITE_BASE_URL


const API = axios.create({
    baseURL,
})

export const fetchBooks = async ({queryKey})=>{
    const [, search,genres,durationMin,durationMax,lang,page] = queryKey
    const res = await API.get(`/audiobooks?page=${page==null?1:page}&search=${search??""}&genres=${genres??""}&lengthMin=${durationMin??""}&lengthMax=${durationMax??""}&language=${lang??""}`)
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

export const fetchGenres = async ({pageParam=1})=>{
    const res = await API.get(`/genres?page=${pageParam}`)
    console.log(res)
    return res
}