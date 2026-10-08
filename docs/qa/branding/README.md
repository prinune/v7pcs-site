# Marca institucional — 2026-10-08

Site institucional em `/home/admin/sites/v7pcs-site`, separado do ERP.

145 identificações textuais de marca revisadas: 72 ocorrências do nome antigo
(V7PCs Soluções em Tecnologias, incluindo aria-labels em minúsculas), 72
identificações curtas em title/Open Graph/JSON-LD e uma apresentação na home.
As 72 ocorrências antigas foram substituídas por contexto. Nas 18 páginas, title,
OG title e site_name usam V7PCs Tech; JSON-LD usa o nome institucional completo
em name e V7PCs Tech em alternateName. Descrições institucionais receberam o
nome completo sem remover a descrição comercial.

Cabeçalho desktop, apresentação da empresa e rodapé usam V7PCs Soluções em
Tecnologias e Infraestrutura. Cabeçalho até 1020 px usa V7PCs Tech. O símbolo
vetorial V7 original foi reutilizado, sem desenhar logo nova: seu wordmark e
slogan antigos em paths ficam ocultos na interface e o nome passa a ser HTML.
Os arquivos de imagem originais permanecem intactos.

Preservados: URLs, domínios, e-mails, telefones, mensagens de WhatsApp/formulários,
identificadores Docker/rede, comentários técnicos e relatos históricos da empresa.
Nenhuma alteração em main.js, DNS, Caddy, Microsoft ou integrações.

## Imagens e pendências preexistentes

- v7pcs-logo.png e og-image.png têm “soluções em tecnologias” embutido; preservadas
  conforme instrução. A imagem Open Graph ainda tem a nomenclatura gráfica antiga.
- logo-claro.svg e logo-escuro.svg têm o slogan convertido em paths; preservados.
- favicon e apple-touch-icon usam o símbolo V7 sem texto antigo.
- img/equipe/douglas.jpg já estava ausente em Quem somos. Não foi substituída.

## QA

HTML das 18 páginas: estrutura de tags, IDs, referências locais e JSON-LD validados.
126 combinações de página/viewport na prévia: 360×800, 390×844, 430×932,
768×1024, 1366×768, 1440×900 e 1920×1080. Sem overflow horizontal; menu mobile,
submenus desktop, marca visível, title/OG, imagens e favicon verificados.
Erros de runtime JavaScript: nenhum. Pendências de imagem preexistentes registradas
nos resultados. Recursos opcionais ausentes não foram inventados.

## Arquivos de interface alterados

- `site/antivirus-corporativo.html`
- `site/backup-em-nuvem.html`
- `site/contato.html`
- `site/desenvolvimento-de-software.html`
- `site/index.html`
- `site/infraestrutura-de-ti.html`
- `site/licencas-microsoft.html`
- `site/link-dedicado.html`
- `site/manutencao-de-computadores.html`
- `site/orcamento-software.html`
- `site/produtos-de-informatica.html`
- `site/produtos.html`
- `site/quem-somos.html`
- `site/seguranca-da-informacao.html`
- `site/servicos.html`
- `site/suporte-tecnico.html`
- `site/ti-para-saude.html`
- `site/virtualizacao-vmware.html`
- `site/assets/style.css`

## Publicação validada

126 combinações adicionais de página/viewport aprovadas no HTTPS público, com
certificado validado pelo navegador. Local 127.0.0.1:8081 retorna 200;
https://www.v7pcs.com.br retorna 200; HTTP → HTTPS 308; domínio sem www → www 301.
Somente v7pcs-site foi reconstruído/recriado. Nenhum ajuste em Caddy ou DNS.
Os avisos 404 do console são de recursos ausentes preexistentes; nenhuma exceção
de JavaScript. Detalhes em preview.json e production.json.
