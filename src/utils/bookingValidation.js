// Pure validation for the demo enquiry form (no backend).
export function todayISO(now = new Date()) {
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${m}-${d}`
}

export function addDaysISO(iso, days) {
  const [y, m, d] = iso.split('-').map(Number)
  return todayISO(new Date(y, m - 1, d + days))
}

export function nightsBetween(a, b) {
  const [y1, m1, d1] = a.split('-').map(Number)
  const [y2, m2, d2] = b.split('-').map(Number)
  return Math.round((new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1)) / 86400000)
}

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
}

/**
 * @param values { checkIn, checkOut, adults, children, accommodation }
 * @param rooms  array of { id, name, capacity }
 * @returns object of field -> message (empty when valid)
 */
export function validateEnquiry(values, rooms, today = todayISO()) {
  const errors = {}
  const iso = /^\d{4}-\d{2}-\d{2}$/
  if (!values.checkIn) errors.checkIn = 'Please choose a check-in date.'
  else if (!iso.test(values.checkIn)) errors.checkIn = 'Enter a valid check-in date.'
  else if (values.checkIn < today) errors.checkIn = 'Check-in cannot be in the past.'

  if (!values.checkOut) errors.checkOut = 'Please choose a check-out date.'
  else if (!iso.test(values.checkOut)) errors.checkOut = 'Enter a valid check-out date.'
  else if (!errors.checkIn && values.checkIn && values.checkOut <= values.checkIn) {
    errors.checkOut = 'Check-out must be after check-in.'
  }

  const adults = Number(values.adults)
  const children = Number(values.children)
  if (!Number.isInteger(adults) || adults < 1) errors.adults = 'At least one adult is required.'
  if (!Number.isInteger(children) || children < 0) errors.children = 'Children cannot be negative.'

  if (!values.accommodation) errors.accommodation = 'Please choose an accommodation.'
  else {
    const room = rooms.find((r) => r.id === values.accommodation)
    if (!room) errors.accommodation = 'Please choose a listed accommodation.'
    else if (!errors.adults && !errors.children && adults + children > room.capacity) {
      errors.adults = `${room.name} sleeps up to ${room.capacity} guests. Reduce guests or choose another option.`
    }
  }
  return errors
}
