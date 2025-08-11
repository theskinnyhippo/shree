"use server"

type RequestOtpResult = { success: boolean; otp: string; masked: string }
export async function requestOtp(phone: string): Promise<RequestOtpResult> {
  // In production, integrate with an SMS provider and DO NOT return the OTP.
  await new Promise((r) => setTimeout(r, 600))
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const masked = maskPhone(phone)
  return { success: true, otp, masked }
}

type SubmitOrderInput = {
  category: string
  name: string
  phone: string
  address: string
  quantity: number
  notes?: string
}
export async function submitOrder(input: SubmitOrderInput) {
  // Persist to your DB or send email; simulated here.
  await new Promise((r) => setTimeout(r, 800))
  const orderId = "ORD-" + Date.now().toString().slice(-8)
  return { ok: true, orderId }
}

function maskPhone(phone: string) {
  const d = phone.replace(/\D/g, "")
  if (d.length < 4) return "****"
  const tail = d.slice(-2)
  return `••••••${tail}`
}
