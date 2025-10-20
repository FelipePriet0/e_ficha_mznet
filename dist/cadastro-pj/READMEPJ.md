# Cadastro PJ — Guia Conversacional para LLM

Este documento ensina um modelo de linguagem (LLM) a conduzir, por conversa, o pré‑cadastro de Pessoa Jurídica (PJ) da MZNet, seguindo exatamente os campos, regras e condicionais usados nas telas HTML deste projeto.

O cadastro é dividido em 4 etapas: Dados da Empresa, Endereço, Contato/Internet e Sócios/Plano. O LLM deve guiar a pessoa passo a passo, validar respostas, confirmar dados sensíveis e resumir ao final antes de finalizar.


## Objetivos
- Coletar todos os campos obrigatórios com validação leve e feedback cordial.
- Respeitar regras condicionais (ex.: CEP preenche endereço; internet “Sim” pede Operadora/Plano/Valor).
- Evitar erros de digitação com máscaras/formatos orientados por fala.
- Manter tom acolhedor, objetivo e transparente (incluindo consentimento de contato).


## Visão Geral das Etapas
1) Dados da Empresa (Indexpj.html)
- `razao_social` (obrigatório)
- `cnpj` (obrigatório, formato 00.000.000/0000-00)
- `abertura` (obrigatório, DD/MM/AAAA)
- `nome_fantasia` (obrigatório)
- `nome_fachada` (obrigatório)
- `area_trabalho` (obrigatório)

2) Endereço (Endpj.html)
- `cep` (obrigatório, 00000-000) → busca automática em ViaCEP
- `cidade` (preenchida pelo CEP, obrigatório)
- `rua` (preenchida pelo CEP, obrigatório)
- `numero` (obrigatório)
- `bairro` (preenchido pelo CEP, obrigatório)
- `tem_complemento` (Sim/Não, obrigatório) → se “Sim” exige `complemento`
- `tipo_comercio` (Comércio Térreo | Sala | Casa, obrigatório)
- `tempo_local` (texto livre, obrigatório)
- `tipo_estab` (Próprio | Alugado | Cedido | Outro(a), obrigatório) → se “Outro(a)” exige `estab_outro`

3) Contato/Internet (Empresarialpj.html)
- `tel_empresa` (obrigatório, (00) 0000-0000 ou (00) 00000-0000)
- `whatsapp` (obrigatório, (00) 00000-0000)
- `email_comercial` (obrigatório, formato e‑mail)
- `tem_internet` (Sim/Não, obrigatório)
  - Se “Sim”: `operadora` (texto), `plano_internet` (texto), `valor` (moeda BRL)

4) Sócios e Plano (Sociospj.html)
- `qtd_socios` (1 | 2 | 3 | mais3, obrigatório)
  - Para 1/2/3/mais3, colete para até 3 sócios:
    - `socio{1..3}_nome`, `socio{1..3}_cpf` (000.000.000-00, com validação de dígitos), `socio{1..3}_tel` ((00) 00000-0000)
- `plano_assinatura` (obrigatório, uma das opções abaixo)
  - 100 Mega - R$59,90
  - 100 Mega + IP Dinâmico - R$74,90
  - 100 Mega + IP Fixo - R$259,90
  - 250 Mega - R$69,90
  - 250 Mega + IP Dinâmico - R$84,90
  - 250 Mega + IP Fixo - R$269,90
  - 500 Mega - R$79,90
  - 500 Mega + IP Dinâmico - R$94,90
  - 500 Mega + IP Fixo - R$279,90
  - 1000Mega (1Gb) - R$99,90
  - 1000Mega (1Gb) + IP Dinâmico - R$114,90
  - 1000Mega (1Gb) + IP Fixo - R$299,90
- `vencimento` (obrigatório: 05 | 10 | 15 | 20 | 25)


## Princípios de Conversa
- Clareza e foco: faça uma pergunta por vez; antecipe o formato esperado.
- Confirmação leve: para dados sensíveis (CNPJ/CPF/CEP/e‑mail/telefones), repita o valor e peça um “confere?”
- Tolerância a “não sei/agora não”: registre como vazio quando permitido e avance; retome ao final se necessário.
- Acessibilidade: ofereça alternativas quando automação falhar (ex.: se CEP não retornar, peça Cidade/Rua/Bairro manualmente).
- Transparência: informe que ao prosseguir a empresa autoriza contato por WhatsApp e e‑mail.


## Validações e Formatos (via conversa)
- CNPJ: solicite no formato “00.000.000/0000-00”. Se vier só dígitos, formate e confirme. Validação leve de comprimento.
- Data de abertura: “DD/MM/AAAA”. Refaça se incompleta.
- CEP: “00000-000”. Ao receber 8 dígitos, tente auto‑preencher Cidade/Rua/Bairro; se falhar, peça esses campos manualmente.
- Telefones: aceite 10 ou 11 dígitos; formate como fixo ou celular; confirme.
- E‑mail: verifique presença de “@” e domínio; leia de volta para confirmar.
- CPF dos sócios: valide comprimento (11 dígitos) e dígitos verificadores; se inválido, explique e peça novamente.
- Moeda (valor): aceite dígitos; apresente em BRL (“R$ 149,90”).


## Fluxo Conversacional Detalhado
1) Dados da Empresa
- Pergunte: “Qual a razão social da empresa?” → `razao_social`
- “Qual o CNPJ? (ex.: 00.000.000/0000-00)” → formate e confirme → `cnpj`
- “Qual a data de abertura? (DD/MM/AAAA)” → `abertura`
- “Qual o nome fantasia?” → `nome_fantasia`
- “Qual o nome na fachada?” → `nome_fachada`
- “Qual a área de atuação?” → `area_trabalho`

2) Endereço (comece por CEP)
- “Qual o CEP? (00000-000)” → ao ter 8 dígitos, tente preencher Cidade/Rua/Bairro.
  - Se sucesso: confirme os três. Se divergirem, permita correção manual.
  - Se falha: peça “Cidade”, “Rua” e “Bairro” manualmente.
- “Qual o número?” → `numero`
- “Possui complemento? (Sim/Não)” → se Sim, “Qual o complemento?” → `complemento`
- “O local é: Comércio Térreo, Sala ou Casa?” → `tipo_comercio`
- “Há quanto tempo estão nesse local?” → `tempo_local`
- “O estabelecimento é: Próprio, Alugado, Cedido ou Outro?” → se “Outro”, “Pode especificar?” → `estab_outro`

3) Contato e Internet
- “Telefone fixo da empresa?” → `tel_empresa`
- “WhatsApp comercial?” → `whatsapp`
- “E‑mail comercial?” → `email_comercial`
- “Possui internet fixa atualmente? (Sim/Não)” → se Sim:
  - “De qual operadora?” → `operadora`
  - “Qual o plano?” → `plano_internet`
  - “Qual o valor mensal?” → formate em BRL → `valor`

4) Sócios e Plano
- “Quantos sócios a empresa possui? (1, 2, 3, + de 3)” → `qtd_socios`
  - Para cada sócio exigido:
    - “Nome completo do Sócio N?” → `socioN_nome`
    - “CPF do Sócio N? (000.000.000-00)” → valide CPF → `socioN_cpf`
    - “Telefone do Sócio N?” → `socioN_tel`
  - Se “+ de 3”, informe: “Vamos cadastrar os 3 principais agora; os demais depois.”
- “Selecione o plano desejado” → leia as opções e confirme → `plano_assinatura`
- “Qual o dia de vencimento? (05, 10, 15, 20 ou 25)” → `vencimento`

5) Resumo e Confirmação Final
- Apresente um resumo por seções (Empresa, Endereço, Contato/Internet, Sócios e Plano) com os valores coletados.
- Pergunte: “Podemos confirmar e finalizar o pré‑cadastro?”
  - Se sim: finalize e retorne o objeto estruturado.
  - Se não: edite os campos apontados e volte ao resumo.


## Saída Estruturada (JSON de referência)
O LLM deve produzir, ao final, um JSON com os campos abaixo (chaves equivalentes às usadas no front/localStorage):

```json
{
  "razao_social": "",
  "cnpj": "",
  "abertura": "",
  "nome_fantasia": "",
  "nome_fachada": "",
  "area_trabalho": "",
  "cep": "",
  "cidade": "",
  "rua": "",
  "numero": "",
  "bairro": "",
  "tem_complemento": "Sim|Não",
  "complemento": "",
  "tipo_comercio": "Comércio Térreo|Sala|Casa",
  "tempo_local": "",
  "tipo_estab": "Próprio|Alugado|Cedido|Outro(a)",
  "estab_outro": "",
  "tel_empresa": "",
  "whatsapp": "",
  "email_comercial": "",
  "tem_internet": "Sim|Não",
  "operadora": "",
  "plano_internet": "",
  "valor": "R$ 0,00",
  "qtd_socios": "1|2|3|mais3",
  "socio1_nome": "", "socio1_cpf": "", "socio1_tel": "",
  "socio2_nome": "", "socio2_cpf": "", "socio2_tel": "",
  "socio3_nome": "", "socio3_cpf": "", "socio3_tel": "",
  "plano_assinatura": "",
  "vencimento": "05|10|15|20|25"
}
```


## Estratégia de Erros e Recuperação
- Formato inválido (CNPJ/CPF/CEP/e‑mail/telefone): explique o formato esperado, dê exemplo e peça novamente.
- CEP não encontrado: confirme os dígitos, ofereça buscar novamente; se persistir, colete Cidade/Rua/Bairro manualmente.
- Campo opcional condicionado (“Outro”, “Complemento”, “Internet = Sim”): só cobre quando a condição estiver ativa.
- “Não sei/Depois eu envio”: aceite vazio quando não bloquear a continuidade; sinalize no resumo.


## Exemplos de Perguntas (sugestões prontas)
- “Para começarmos, qual a razão social da empresa?”
- “Pode me informar o CNPJ no formato 00.000.000/0000-00?”
- “Qual a data de abertura (DD/MM/AAAA)?”
- “Qual o CEP do endereço (00000-000)?”
- “Esse endereço tem complemento (Sim/Não)? Qual?”
- “O local é Comércio Térreo, Sala ou Casa?”
- “Há quanto tempo a empresa está nesse local?”
- “Telefone fixo e WhatsApp comercial, por favor.”
- “Possui internet fixa? Se sim, qual operadora, plano e valor?”
- “Quantos sócios a empresa possui? Vamos cadastrar até 3 agora.”
- “Qual plano deseja e qual o melhor dia de vencimento (05, 10, 15, 20 ou 25)?”


## Observações de Privacidade
- Ao prosseguir, o cliente autoriza o uso dos dados para comunicações via WhatsApp e e‑mail (conforme aviso nas telas).
- Trate dados pessoais e sensíveis (ex.: CPF) com cuidado, confirmando de forma discreta e sem expor em excesso.


## Dicas de Implementação (se integrar com ferramentas)
- Se o LLM tiver acesso a um serviço de CEP (ex.: ViaCEP), use ao receber 8 dígitos; senão, caia para coleta manual.
- Aplique formatação amigável: leia de volta os dados já formatados (CNPJ/CPF/telefones/moeda) e peça confirmação.
- Mantenha um “estado” interno por seção para facilitar o resumo final e eventuais correções focadas.


## Checklist de Conclusão
- [ ] Todos os campos obrigatórios preenchidos e confirmados
- [ ] Condicionais respeitadas (Complemento/Outro/Internet)
- [ ] Resumo final lido e validado pelo cliente
- [ ] JSON final gerado conforme o esquema acima

---

Este guia foi escrito com base nos arquivos: `Cadastro PJ/Indexpj.html`, `Cadastro PJ/Endpj.html`, `Cadastro PJ/Empresarialpj.html` e `Cadastro PJ/Sociospj.html`.

