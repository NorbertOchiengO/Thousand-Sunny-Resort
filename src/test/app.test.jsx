import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App.jsx'
import { rooms } from '../data/rooms.js'
import { validateEnquiry, todayISO, addDaysISO } from '../utils/bookingValidation.js'

const today = todayISO()
const base = { checkIn: addDaysISO(today, 3), checkOut: addDaysISO(today, 6), adults: '2', children: '0', accommodation: 'ocean' }

describe('validateEnquiry', () => {
  it('accepts a valid enquiry', () => expect(validateEnquiry(base, rooms, today)).toEqual({}))
  it('rejects past check-in', () => expect(validateEnquiry({ ...base, checkIn: '2020-01-01' }, rooms, today).checkIn).toMatch(/past/i))
  it('requires check-out after check-in', () => {
    expect(validateEnquiry({ ...base, checkOut: base.checkIn }, rooms, today).checkOut).toMatch(/after check-in/i)
    expect(validateEnquiry({ ...base, checkOut: addDaysISO(base.checkIn, -1) }, rooms, today).checkOut).toBeTruthy()
  })
  it('enforces capacity and required fields', () => {
    expect(validateEnquiry({ ...base, accommodation: 'garden', adults: '3', children: '1' }, rooms, today).adults).toMatch(/sleeps up to 3/i)
    const e = validateEnquiry({ checkIn: '', checkOut: '', adults: '0', children: '0', accommodation: '' }, rooms, today)
    expect(Object.keys(e)).toEqual(expect.arrayContaining(['checkIn', 'checkOut', 'adults', 'accommodation']))
  })
})

async function fill(user, { room = 'ocean' } = {}) {
  await user.type(screen.getByLabelText('Check-in'), base.checkIn)
  await user.type(screen.getByLabelText('Check-out'), base.checkOut)
  await user.selectOptions(screen.getByLabelText(/preferred accommodation/i), room)
}

describe('enquiry panel', () => {
  it('shows errors and keeps entries', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Check-in'), base.checkIn)
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/please fix 2 fields/i)
    expect(screen.getByLabelText('Check-in')).toHaveValue(base.checkIn)
    expect(screen.getByLabelText('Check-out')).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows a demo-only success state', async () => {
    const user = userEvent.setup()
    render(<App />)
    await fill(user)
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))
    expect(await screen.findByText(/your demo enquiry is complete/i, {}, { timeout: 4000 })).toBeInTheDocument()
    expect(screen.getByText(/not been sent to a live booking system/i)).toBeInTheDocument()
    expect(screen.getByText('Ocean View Suite', { selector: 'dd' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /edit enquiry/i }))
    expect(await screen.findByLabelText('Check-in')).toHaveValue(base.checkIn)
  })
})

describe('rooms', () => {
  it('opens a room dialog, traps escape, and restores focus', async () => {
    const user = userEvent.setup()
    render(<App />)
    const opener = screen.getByRole('button', { name: 'Explore Room, Garden Retreat' })
    await user.click(opener)
    const dialog = screen.getByRole('dialog', { name: 'Garden Retreat' })
    expect(within(dialog).getByText(/sleeps up to 3 guests/i)).toBeInTheDocument()
    expect(within(dialog).getByText(/sample pricing/i)).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(opener).toHaveFocus()
  })

  it('room enquiry pre-selects accommodation and topic', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Explore Room, Private Pool Villa' }))
    await user.click(screen.getByRole('button', { name: /enquire about this room/i }))
    await waitFor(() => expect(screen.getByLabelText(/preferred accommodation/i)).toHaveValue('villa'))
    expect(screen.getByText(/Accommodation: Private Pool Villa/)).toBeInTheDocument()
  })

  it('experience and dining actions set the enquiry topic', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Enquire about Wellness and Spa' }))
    expect(await screen.findByText(/Experience: Wellness and Spa/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /make a dining enquiry/i }))
    expect(await screen.findByText(/Dining enquiry/, { selector: 'strong' })).toBeInTheDocument()
  })
})

describe('gallery, faq, nav', () => {
  it('lightbox opens, navigates with arrows, closes with Escape and restores focus', async () => {
    const user = userEvent.setup()
    render(<App />)
    const first = screen.getByRole('button', { name: 'Open image: The resort and its coastline' })
    await user.click(first)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAccessibleName(/image 1 of 10/i)
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('dialog')).toHaveAccessibleName(/image 2 of 10: Ocean View Suite/i)
    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(screen.getByRole('dialog')).toHaveAccessibleName(/image 10 of 10/i)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(first).toHaveFocus()
  })

  it('has ten distinct gallery images', () => {
    render(<App />)
    const buttons = screen.getAllByRole('button', { name: /^Open image:/ })
    expect(buttons).toHaveLength(10)
    expect(new Set(buttons.map((b) => b.getAttribute('aria-label'))).size).toBe(10)
  })

  it('FAQ accordion toggles by keyboard', async () => {
    const user = userEvent.setup()
    render(<App />)
    const btn = screen.getByRole('button', { name: /cancellation and payment/i })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    btn.focus()
    await user.keyboard('{Enter}')
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/placeholder: cancellation policy/i)).toBeInTheDocument()
  })

  it('mobile menu opens, closes with Escape and on link select', async () => {
    const user = userEvent.setup()
    render(<App />)
    const toggle = screen.getByRole('button', { name: /open menu/i })
    await user.click(toggle)
    expect(screen.getByRole('dialog', { name: /site menu/i })).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
    await user.click(screen.getByRole('button', { name: /open menu/i }))
    await user.click(within(screen.getByRole('navigation', { name: 'Mobile' })).getByRole('link', { name: 'Dining' }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('every in-page anchor has a target', () => {
    const { container } = render(<App />)
    const ids = new Set([...container.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href').slice(1)))
    for (const id of ids) expect(container.querySelector(`#${id}`), id).not.toBeNull()
  })

  it('shows a fallback instead of a broken image when files are missing', async () => {
    const { container } = render(<App />)
    const imgs = [...container.querySelectorAll('img')]
    expect(imgs.length).toBeGreaterThan(0)
    imgs.forEach((i) => i.dispatchEvent(new Event('error')))
    await waitFor(() => expect(container.querySelector('img')?.getAttribute('src')).toMatch(/thousand-sunny-henna/))
    container.querySelectorAll('img').forEach((i) => i.dispatchEvent(new Event('error')))
    await waitFor(() => expect(container.querySelectorAll('img').length).toBe(0))
    expect(screen.getAllByRole('img').length).toBeGreaterThan(5)
  })
})
