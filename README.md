# MZNet – Cadastro PF/PJ (Site Estático)

Projeto estático multi‑páginas com fluxo de escolha (PF/PJ), formulários de cadastro e páginas de sucesso, preparado para deploy em CDN (ex.: Vercel, Cloudflare Pages).

## Estrutura
- `index.html` → redireciona para `direcionamento.html`
- `direcionamento.html` → escolha entre PF e PJ
- `cadastro-pf/`
  - `index.html` (form PF) → `sucesso-pf.html`
- `cadastro-pj/`
  - `Indexpj.html` → `Endpj.html` → `Empresarialpj.html` → `Sociospj.html` → `sucesso-pj.html`
- `Assets/` (logo e estáticos)

## URLs (produção)
- `https://seu-dominio.com/` → redireciona para `/direcionamento.html`
- PF: `/cadastro-pf/index.html` e `/cadastro-pf/sucesso-pf.html`
- PJ: `/cadastro-pj/Indexpj.html`, `/cadastro-pj/Endpj.html`, `/cadastro-pj/Empresarialpj.html`, `/cadastro-pj/Sociospj.html`, `/cadastro-pj/sucesso-pj.html`

## Deploy (Vercel)
1) Conecte o repositório.
2) Preset: "Other" (Static). Build Command: vazio. Output Directory: `dist`.
3) Ou deploy manual com `vercel --prod` apontando o diretório `dist/`.

Opcional (recomendado): adicione um `vercel.json` na raiz com um redirect `/ → /direcionamento.html` e headers de cache (HTML curto, assets long‑cache).

## Observações
- Todos os links internos foram atualizados para a estrutura sem espaços em `dist/`.
- O dropdown de planos em `Sociospj.html` foi segmentado via `optgroup` (Normais / IP Dinâmico / IP Fixo).
