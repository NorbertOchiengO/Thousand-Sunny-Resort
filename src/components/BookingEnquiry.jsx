import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, CircleAlert, Loader2, X } from 'lucide-react'
import Button from './Button.jsx'
import { rooms } from '../data/rooms.js'
import { addDaysISO, formatDate, nightsBetween, todayISO, validateEnquiry } from '../utils/bookingValidation.js'
import { submitEnquiry } from '../utils/submitEnquiry.js'

const initial = { checkIn: '', checkOut: '', adults: '2', children: '0', accommodation: '' }
const fieldOrder = ['checkIn', 'checkOut', 'adults', 'children', 'accommodation']

const inputCls = 'block min-h-12 w-full border bg-white px-3 py-2.5 text-base text-charcoal focus:border-ocean'

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-ocean">
        {label}
        {optional && <span className="font-normal normal-case tracking-normal text-muted"> (optional)</span>}
      </label>
      {children({ 'aria-invalid': error ? 'true' : undefined, 'aria-describedby': error ? `${id}-error` : undefined, className: `${inputCls} ${error ? 'border-danger' : 'border-line'}` })}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

export default function BookingEnquiry({ prefill, onClearTopic }) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [topic, setTopic] = useState('')
  const [summary, setSummary] = useState(null)
  const successRef = useRef(null)
  const alertRef = useRef(null)
  const today = todayISO()

  useEffect(() => {
    if (!prefill) return
    setTopic(prefill.topic || '')
    if (prefill.accommodation) setValues((v) => ({ ...v, accommodation: prefill.accommodation }))
    setStatus((s) => (s === 'success' ? 'idle' : s))
  }, [prefill])

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
    if (status === 'error') alertRef.current?.focus()
  }, [status])

  const set = (name) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validateEnquiry(values, rooms, today)
    setErrors(found)
    const firstKey = fieldOrder.find((k) => found[k])
    if (firstKey) {
      setStatus('error')
      document.getElementById(firstKey)?.focus()
      return
    }
    setStatus('submitting')
    try {
      await submitEnquiry(values)
      const room = rooms.find((r) => r.id === values.accommodation)
      setSummary({
        nights: nightsBetween(values.checkIn, values.checkOut),
        checkIn: formatDate(values.checkIn),
        checkOut: formatDate(values.checkOut),
        guests: `${values.adults} adult${values.adults === '1' ? '' : 's'}${Number(values.children) ? `, ${values.children} child${values.children === '1' ? '' : 'ren'}` : ''}`,
        room: room.name,
        topic,
      })
      setStatus('success')
    } catch {
      setErrors({ form: 'The demo enquiry could not be completed. Your details are kept, please try again.' })
      setStatus('error')
    }
  }

  const reset = () => {
    setValues(initial)
    setErrors({})
    setTopic('')
    onClearTopic?.()
    setSummary(null)
    setStatus('idle')
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <section id="enquire" aria-labelledby="enquire-title" className="relative z-10 px-5 sm:px-8 lg:-mt-24">
      <div className="mx-auto max-w-6xl border border-line bg-white p-5 shadow-lg shadow-ocean/10 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {status === 'success' && summary ? (
            <motion.div key="ok" initial={{ opacity: 0.85, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-ocean" aria-hidden="true" />
                <div>
                  <h2 id="enquire-title" ref={successRef} tabIndex={-1} className="text-3xl text-ocean focus:outline-none">
                    Your demo enquiry is complete
                  </h2>
                  <p className="mt-2 max-w-2xl text-muted">
                    This is a demonstration. Your request has not been sent to a live booking system, no availability was checked and no room has been held.
                  </p>
                </div>
              </div>
              <dl className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ['Accommodation', summary.room],
                  ['Check-in', summary.checkIn],
                  ['Check-out', `${summary.checkOut} (${summary.nights} night${summary.nights === 1 ? '' : 's'})`],
                  ['Guests', summary.guests],
                ].map(([k, v]) => (
                  <div key={k} className="bg-white p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-sand-deep">{k}</dt>
                    <dd className="mt-1 text-charcoal">{v}</dd>
                  </div>
                ))}
              </dl>
              {summary.topic && <p className="mt-4 text-muted">Topic: <strong className="text-charcoal">{summary.topic}</strong></p>}
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => setStatus('idle')}>Edit enquiry</Button>
                <Button variant="primary" onClick={reset}>Start a new enquiry</Button>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" noValidate onSubmit={onSubmit} initial={{ opacity: 0.9 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-labelledby="enquire-title">
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                <h2 id="enquire-title" className="text-3xl text-ocean">Plan your stay</h2>
                <p className="text-sm text-muted">Demo enquiry. No live availability or booking.</p>
              </div>

              {topic && (
                <p className="mb-5 inline-flex items-center gap-2 bg-sage-soft px-3 py-1.5 text-sm text-ocean">
                  <span>Enquiring about: <strong>{topic}</strong></span>
                  <button type="button" aria-label="Remove enquiry topic" onClick={() => { setTopic(''); onClearTopic?.() }} className="inline-flex h-7 w-7 items-center justify-center hover:bg-sage">
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </p>
              )}

              {status === 'error' && (
                <div ref={alertRef} tabIndex={-1} role="alert" className="mb-5 flex items-start gap-3 border-2 border-danger bg-white p-4 focus:outline-none">
                  <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
                  <p>
                    <strong>{errors.form ? 'Something went wrong.' : `Please fix ${errorCount} ${errorCount === 1 ? 'field' : 'fields'}.`}</strong>{' '}
                    {errors.form || 'Your entries are kept. Review the messages below and try again.'}
                  </p>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                <div className="lg:col-span-1">
                  <Field id="checkIn" label="Check-in" error={errors.checkIn}>
                    {(p) => <input id="checkIn" type="date" min={today} value={values.checkIn} onChange={set('checkIn')} required {...p} />}
                  </Field>
                </div>
                <div className="lg:col-span-1">
                  <Field id="checkOut" label="Check-out" error={errors.checkOut}>
                    {(p) => <input id="checkOut" type="date" min={values.checkIn ? addDaysISO(values.checkIn, 1) : today} value={values.checkOut} onChange={set('checkOut')} required {...p} />}
                  </Field>
                </div>
                <div className="lg:col-span-1">
                  <Field id="adults" label="Adults" error={errors.adults}>
                    {(p) => (
                      <select id="adults" value={values.adults} onChange={set('adults')} {...p}>
                        {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    )}
                  </Field>
                </div>
                <div className="lg:col-span-1">
                  <Field id="children" label="Children" optional error={errors.children}>
                    {(p) => (
                      <select id="children" value={values.children} onChange={set('children')} {...p}>
                        {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    )}
                  </Field>
                </div>
                <div className="sm:col-span-2 lg:col-span-2">
                  <Field id="accommodation" label="Preferred accommodation" error={errors.accommodation}>
                    {(p) => (
                      <select id="accommodation" value={values.accommodation} onChange={set('accommodation')} required {...p}>
                        <option value="">Choose an accommodation</option>
                        {rooms.map((r) => <option key={r.id} value={r.id}>{r.name} (up to {r.capacity} guests)</option>)}
                      </select>
                    )}
                  </Field>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto disabled:cursor-wait disabled:opacity-80">
                  {status === 'submitting' ? (<><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />Sending demo enquiry…</>) : status === 'error' && errors.form ? 'Try again' : 'Send Enquiry'}
                </Button>
                <p className="text-sm text-muted">We will not claim availability or confirm a reservation.</p>
              </div>
              <p className="sr-only" role="status" aria-live="polite">{status === 'submitting' ? 'Sending your demo enquiry' : ''}</p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
