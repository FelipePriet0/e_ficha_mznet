const FUNCTION_URL = "https://juxpvvpogpolspxnecsf.functions.supabase.co/e_ficha";

const E_FICHA_TOKEN =
  "eficha_prod_Jn3jJ6m2bJHcJYx1jXJ9yJmJQwq7JjJg-1pZQ5Jd1xJQe7fK3mL2sN4tU6vW8yZ0";

// Helpers simples
function getVal(name) {
  const el = document.querySelector(`[name="${name}"]`) || document.getElementById(name);
  return el ? (el.value || "").trim() : "";
}

function saveStep(key, data) {
  const cur = JSON.parse(localStorage.getItem(key) || "{}");
  localStorage.setItem(key, JSON.stringify({ ...cur, ...data }));
}

function loadAll(key) {
  return JSON.parse(localStorage.getItem(key) || "{}");
}

async function submitEficha(payload) {
  const resp = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${E_FICHA_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error(`Falha ${resp.status}`);
  return resp.json();
}
