"use server"

export async function submitCustomOrder(_prevState: { ok: boolean; message?: string } | undefined, formData: FormData) {
  // Simulate processing time; replace with real email/DB logic later
  await new Promise((r) => setTimeout(r, 800))

  const name = (formData.get("name") as string) || ""
  return {
    ok: true,
    message: `Thanks${name ? `, ${name}` : ""}! We've received your request and will get back shortly.`,
  }
}
