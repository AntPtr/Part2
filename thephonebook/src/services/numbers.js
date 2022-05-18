import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const req =  axios.get(baseUrl) 
  return req.then (response => response.data)
}

const create = newObject => {
  const req =  axios.post(baseUrl, newObject)
  return req.then (response => response.data)
}

const erase = id => {
  const url = baseUrl + '/' + id
  const req = axios.delete(url)
  return req.then(response => response.data)
}


const update = (id, newObject) => {
  const url = baseUrl + '/' + id
  const request = axios.put(url, newObject)
  return request.then(response => response.data)
}

export default {getAll, create, erase, update}