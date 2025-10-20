const FUNCTION_URL = "https://juxpvvpogpolspxnecsf.functions.supabase.co/e_ficha";
const E_FICHA_TOKEN = "eficha_prod_Jn3jJ6m2bJHcJYx1jXJ9yJmJQwq7JjJg-1pZQ5Jd1xJQe7fK3mL2sN4tU6vW8yZ0";

// Cliente oficial exposto em window (conforme documento)
window.submitEficha = async function submitEficha(payload) {
  const resp = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${E_FICHA_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`Falha ${resp.status}: ${text || "erro ao enviar"}`);
  }
  return resp.json();
};
