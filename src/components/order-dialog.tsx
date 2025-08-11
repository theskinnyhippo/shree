"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog"
import { requestOtp, submitOrder } from "@/src/app/actions/order"

type Props = {
  category: string
  triggerLabel?: string
  triggerClassName?: string
}

export default function OrderDialog({ category, triggerLabel = "Order Now", triggerClassName }: Props) {
  const [open, setOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const [otpPending, startOtpTransition] = useTransition()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [quantity, setQuantity] = useState<number>(1)
  const [notes, setNotes] = useState("")
  const [otpSentTo, setOtpSentTo] = useState<string | null>(null)
  const [otpCode, setOtpCode] = useState<string | null>(null) // demo only
  const [otpInput, setOtpInput] = useState("")
  const [otpError, setOtpError] = useState<string | null>(null)
  const [verified, setVerified] = useState(false)

  // Simple validators
  const phoneValid = useMemo(() => /^[0-9+\-\s]{8,15}$/.test(phone.trim()), [phone])
  const canRequestOtp = !!name && phoneValid && quantity > 0
  const canPlaceOrder = verified && !!address

  const resetAll = () => {
    setName("")
    setPhone("")
    setAddress("")
    setQuantity(1)
    setNotes("")
    setOtpSentTo(null)
    setOtpCode(null)
    setOtpInput("")
    setVerified(false)
    setOtpError(null)
  }

  useEffect(() => {
    if (!open) {
      // reset when dialog closes
      resetAll()
    }
  }, [open])

  const handleSendOtp = () => {
    setOtpError(null)
    if (!canRequestOtp) return
    startOtpTransition(async () => {
      const res = await requestOtp(phone)
      if (res?.success) {
        setOtpSentTo(res.masked)
        setOtpCode(res.otp) // demo only; do not expose in production
      }
    })
  }

  const handleVerify = () => {
    setOtpError(null)
    if (!otpCode) return
    if (otpInput.trim() === otpCode) {
      setVerified(true)
    } else {
      setVerified(false)
      setOtpError("Invalid code. Please try again.")
    }
  }

  const handlePlaceOrder = () => {
    if (!canPlaceOrder) return
    startTransition(async () => {
      const res = await submitOrder({
        category,
        name,
        phone,
        address,
        quantity,
        notes,
      })
      if (res?.ok) {
        setOpen(false)
        // Show "please wait for our call" confirmation popup
        setConfirmOpen(true)
      }
    })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className={triggerClassName ?? "btn-gold w-full py-5 rounded-full text-md font-bold hover:bg-neutral-500 hover:shadow-sm"}>{triggerLabel}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "var(--font-serif)" }}>Order · {category}</DialogTitle>
            <DialogDescription>
              Fill your details. We will verify your phone via OTP and call to confirm your order and any modifications.
            </DialogDescription>
          </DialogHeader>

          {/* Step 1: Details */}
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="field">
                <Input
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input"
                />
                <label className="floating-label">Full Name</label>
              </div>
              <div className="field">
                <Input
                  placeholder=" "
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="input"
                  type="tel"
                />
                <label className="floating-label">Phone Number</label>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <div className="field">
                  <Input
                    placeholder=" "
                    value={quantity}
                    min={1}
                    onChange={(e) => setQuantity(Number(e.target.value || 1))}
                    className="input"
                    type="number"
                  />
                  <label className="floating-label">Quantity</label>
                </div>
                <Button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={!canRequestOtp || otpPending || !!otpSentTo}
                  className="btn-outline-brass"
                >
                  {otpPending ? "Sending..." : otpSentTo ? "OTP Sent" : "Get OTP"}
                </Button>
              </div>
            </div>

            {/* Step 2: OTP */}
            {otpSentTo && (
              <div className="rounded-md border border-[#B08D57]/30 p-3 bg-white/70">
                <div className="text-sm text-neutral-700">Enter the 6‑digit code sent to {otpSentTo}.</div>
                <div className="mt-2 grid grid-cols-[1fr_auto] gap-2 items-center">
                  <Input
                    placeholder="Enter OTP"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    inputMode="numeric"
                    maxLength={6}
                  />
                  <Button type="button" onClick={handleVerify} disabled={verified} className="btn-gold">
                    {verified ? "Verified" : "Verify"}
                  </Button>
                </div>
                {otpError && <div className="mt-1 text-xs text-red-600">{otpError}</div>}
                {/* Demo helper, remove in production */}
                {otpCode && !verified && <div className="mt-2 text-[11px] text-neutral-500">Demo OTP: {otpCode}</div>}
              </div>
            )}

            {/* Step 3: Address & notes */}
            <div className="grid grid-cols-1 gap-3">
              <div className="field">
                <Textarea
                  placeholder=" "
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="input"
                />
                <label className="floating-label">Shipping Address</label>
              </div>
              <div className="field">
                <Textarea
                  placeholder=" "
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="input"
                />
                <label className="floating-label">Notes / Customization</label>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePlaceOrder} disabled={!canPlaceOrder || pending} className="btn-gold">
              {pending ? "Placing..." : "Place Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation popup */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle style={{ fontFamily: "var(--font-serif)" }}>Thank you for your order</AlertDialogTitle>
            <AlertDialogDescription>
              Please wait for us to call you to confirm the order and discuss any modifications you need.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction autoFocus>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
