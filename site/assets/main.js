/* ===== PARCEIROS =====
   Coloque as logos oficiais em img/parceiros/ com estes nomes (PNG fundo transparente).
   Só aparecem as que existirem; a seção fica oculta enquanto não houver nenhuma. */
const PARCEIROS = [
  { nome: "Microsoft", logo: "img/parceiros/microsoft.png" },
  { nome: "VMware", logo: "img/parceiros/vmware.png" },
  { nome: "Dell", logo: "img/parceiros/dell.png" },
  { nome: "Cisco", logo: "img/parceiros/cisco.png" },
  { nome: "Bitdefender", logo: "img/parceiros/bitdefender.png" },
];
/* ===== CLIENTES =====
   Coloque as logos em img/clientes/ como cliente-01.png, cliente-02.png ... até cliente-30.png.
   O carrossel aparece sozinho quando houver logos. */
const MAX_CLIENTES = 30;

// Menu mobile e submenus
const burger = document.querySelector(".burger"), menu = document.querySelector(".menu");
burger?.addEventListener("click", () => {
  const o = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", o);
});
document.querySelectorAll(".has-sub > button").forEach(b => {
  b.addEventListener("click", () => {
    const li = b.parentElement, o = !li.classList.contains("open");
    document.querySelectorAll(".has-sub.open").forEach(x => { x.classList.remove("open"); x.firstElementChild.setAttribute("aria-expanded", false); });
    if (o) { li.classList.add("open"); b.setAttribute("aria-expanded", true); }
  });
});
document.addEventListener("click", e => {
  if (!e.target.closest(".has-sub")) document.querySelectorAll(".has-sub.open").forEach(x => x.classList.remove("open"));
});

// Slider
const slider = document.querySelector(".slider");
if (slider) {
  const slides = [...slider.querySelectorAll(".slide")], dots = slider.querySelector(".dots");
  let i = 0, timer;
  slides.forEach((s, n) => {
    const d = document.createElement("button");
    d.setAttribute("aria-label", `Ir para o slide ${n + 1}`);
    d.addEventListener("click", () => { go(n); restart(); });
    dots.appendChild(d);
  });
  function go(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => { s.classList.toggle("active", k === i); s.setAttribute("aria-hidden", k !== i); s.inert = k !== i; });
    [...dots.children].forEach((d, k) => d.setAttribute("aria-current", k === i));
  }
  // rotação automática a cada 6 segundos; reinicia o tempo quando alguém clica
  function restart() { clearInterval(timer); timer = setInterval(() => go(i + 1), 6000); }
  document.addEventListener("visibilitychange", () => document.hidden ? clearInterval(timer) : restart());
  slider.querySelector(".sl-prev").addEventListener("click", () => { go(i - 1); restart(); });
  slider.querySelector(".sl-next").addEventListener("click", () => { go(i + 1); restart(); });
  let x0 = null;
  slider.addEventListener("touchstart", e => x0 = e.touches[0].clientX, { passive: true });
  slider.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) { go(i + (dx < 0 ? 1 : -1)); restart(); }
    x0 = null;
  });
  go(0); restart();
}

// Carrega só as imagens que existem
const carregar = lista => Promise.all(lista.map(it => new Promise(ok => {
  const i = new Image(); i.onload = () => ok(it); i.onerror = () => ok(null); i.src = it.logo;
}))).then(r => r.filter(Boolean));

// Parceiros
const pg = document.getElementById("parceiros");
if (pg) carregar(PARCEIROS).then(ok => {
  if (!ok.length) return;
  pg.innerHTML = ok.map(p => `<img src="${p.logo}" alt="${p.nome}" loading="lazy">`).join("");
  document.getElementById("sec-parceiros").hidden = false;
});

// Triagem de orçamento de software
const tri = document.getElementById("form-triagem");
tri?.addEventListener("submit", e => {
  e.preventDefault();
  const fd = new FormData(tri), g = k => (fd.get(k) || "").trim(), all = k => fd.getAll(k);
  const err = tri.querySelector(".err");
  if (!g("nome") || !g("telefone") || !g("tipo") || !g("problema")) {
    err.textContent = "Preencha nome, WhatsApp, o tipo de solução e o problema que ela vai resolver.";
    err.scrollIntoView({ behavior: "smooth", block: "center" }); return;
  }
  err.textContent = "";
  // pontuação interna de complexidade (aparece só como código)
  let pts = 0; const integ = all("integracoes"), dados = all("dados");
  pts += { "Sim, todos com o mesmo acesso": 1, "Sim, com níveis de acesso diferentes": 2 }[g("login")] || 0;
  pts += { "21 a 100": 1, "Mais de 100": 2 }[g("usuarios")] || 0;
  pts += ["Meus clientes", "Equipe e clientes"].includes(g("publico")) ? 1 : 0;
  pts += integ.filter(i => i !== "Nenhum").length;
  if (integ.includes("Pagamento online")) pts += 2;
  if (integ.includes("Sistema que já usamos")) pts += 1;
  if (dados.includes("Dados de saúde")) pts += 3;
  if (dados.includes("Dados financeiros")) pts += 2;
  if (g("mobile") === "Precisa ser um aplicativo instalado") pts += 3;
  if (g("prazo") === "Até 30 dias") pts += 1;
  const nivel = pts <= 3 ? "S" : pts <= 7 ? "M" : "C";
  const alerta = dados.includes("Dados de saúde") || integ.includes("Pagamento online") || g("mobile") === "Precisa ser um aplicativo instalado" ? "X" : "";
  const L = (r, v) => `*${r}:* ${v || "-"}`;
  const txt = [
    "Olá! Quero um orçamento de software pelo site da V7PCs.", "",
    L("Nome", g("nome")), L("Empresa", g("empresa")), L("WhatsApp", g("telefone")), L("E-mail", g("email")), L("Segmento", g("segmento")), "",
    L("Tipo de solução", g("tipo")), L("Problema", g("problema")), "",
    L("Público", g("publico")), L("Usuários", g("usuarios")), L("Login", g("login")), L("Celular", g("mobile")),
    L("Integrações", integ.join(", ")), L("Dados", dados.join(", ")), L("Domínio/hospedagem", g("dominio")), "",
    L("Prazo", g("prazo")), L("Investimento", g("investimento")), L("Referência", g("referencia")), "",
    `Ref.: T-${nivel}${pts}${alerta}`
  ].join("\n");
  window.open(`https://wa.me/${tri.dataset.wa}?text=${encodeURIComponent(txt)}`, "_blank", "noopener");
});

// Clientes
const sec = document.getElementById("clientes");
if (sec) {
  const lista = Array.from({ length: MAX_CLIENTES }, (_, n) => ({ nome: "Cliente", logo: `img/clientes/cliente-${String(n + 1).padStart(2, "0")}.png` }));
  carregar(lista).then(ok => {
    if (!ok.length) return;
    const html = ok.map(c => `<img src="${c.logo}" alt="Logo de cliente" loading="lazy">`).join("");
    sec.querySelector(".logos-track").innerHTML = html + html.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"');
    sec.hidden = false;
  });
}

// Fotos da equipe: mostra iniciais enquanto a foto não existir
document.querySelectorAll("img.ph").forEach(img => {
  const fb = () => {
    const d = document.createElement("div");
    d.className = "ph-fallback"; d.textContent = img.dataset.initials;
    d.setAttribute("role", "img"); d.setAttribute("aria-label", img.alt);
    img.replaceWith(d);
  };
  if (img.complete && img.naturalWidth === 0) fb(); else img.addEventListener("error", fb);
});

// Formulário de contato -> WhatsApp
const form = document.getElementById("form-contato");
form?.addEventListener("submit", e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(form));
  const err = form.querySelector(".err");
  if (!f.nome.trim() || !f.mensagem.trim()) { err.textContent = "Preencha seu nome e a mensagem para enviar."; return; }
  err.textContent = "";
  const txt = `Olá! Vim pelo site da V7PCs.\n\n*Nome:* ${f.nome}\n*Empresa:* ${f.empresa || "-"}\n*Telefone:* ${f.telefone || "-"}\n*Assunto:* ${f.assunto}\n\n${f.mensagem}`;
  const orc = ["Orçamento", "Produtos de informática", "Licenças Microsoft"].includes(f.assunto);
  const num = orc && form.dataset.waOrc ? form.dataset.waOrc : form.dataset.wa;
  window.open(`https://wa.me/${num}?text=${encodeURIComponent(txt)}`, "_blank", "noopener");
});

document.querySelectorAll(".ano").forEach(s => s.textContent = new Date().getFullYear());
