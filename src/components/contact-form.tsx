"use client"

import { useActionState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { motion } from "framer-motion"
import { submitCustomOrder } from "@/src/app/actions/submit-custom-order"

type SubmitState = { ok: boolean; message?: string }

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<SubmitState, FormData>(submitCustomOrder, { ok: false })

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      action={formAction}
      className="grid md:grid-cols-2 gap-6"
    >
      <div className="field">
        <Input name="name" required className="input" placeholder=" " />
        <label className="floating-label">Full Name</label>
      </div>
      <div className="field">
        <Input type="email" name="email" required className="input" placeholder=" " />
        <label className="floating-label">Email</label>
      </div>
      <div className="field">
        <Input type="tel" name="phone" className="input" placeholder=" " />
        <label className="floating-label">Phone</label>
      </div>
      <div className="field">
        <Input name="occasion" className="input" placeholder=" " />
        <label className="floating-label">Occasion (e.g., Durga Puja, Wedding)</label>
      </div>
      <div className="md:col-span-2 field">
        <Textarea name="details" rows={5} className="input" placeholder=" " />
        <label className="floating-label">Tell us about your custom piece</label>
      </div>
      <div className="md:col-span-2 flex items-center gap-4">
        <Button type="submit" className="btn-gold px-3 py-5 rounded-full" disabled={isPending}>
          {isPending ? "Sending..." : "Send Request"}
        </Button>
        {state?.message && <span className="text-sm text-[#019304]">{state.message}</span>}
      </div>
    </motion.form>
  )
}
