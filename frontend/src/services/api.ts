import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

const http = axios.create({ baseURL })

export async function getTickets() {
  const { data } = await http.get('/tickets')
  return data
}

export async function getTicket(id: string) {
  const { data } = await http.get(`/tickets/${id}`)
  return data
}

export async function createTicket(payload: any) {
  const { data } = await http.post('/tickets', payload)
  return data
}

export async function updateTicket(id: string, payload: any) {
  const { data } = await http.patch(`/tickets/${id}`, payload)
  return data
}
