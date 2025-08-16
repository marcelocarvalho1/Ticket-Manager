import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTicket, updateTicket } from '../services/api'

export default function TicketDetail() {
  const { id } = useParams()
  const [ticket, setTicket] = useState<any>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    (async () => {
      if (!id) return
      const data = await getTicket(id)
      setTicket(data)
    })()
  }, [id])

  if (!ticket) return <p>Carregando...</p>

  async function handleChange(field: string, value: string) {
    setSaving(true)
    try {
      const updated = await updateTicket(ticket._id, { [field]: value })
      setTicket(updated)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <label>
          Status:
          <select value={ticket.status} onChange={e => handleChange('status', e.target.value)} disabled={saving}>
            <option value="open">open</option>
            <option value="in_progress">in_progress</option>
            <option value="resolved">resolved</option>
          </select>
        </label>
        <label>
          Prioridade:
          <select value={ticket.priority} onChange={e => handleChange('priority', e.target.value)} disabled={saving}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </label>
      </div>
    </div>
  )
}
