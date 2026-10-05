# file-gen

> 🚧 **status: beta** Em desenvolvimento, pode ter bugs e mudanças de comportamento entre versões.

Ferramenta web (estática, roda no GitHub Pages) que monta arquivos de teste para avaliar controles de upload referentes à vulnerabilidade de file upload, podendo adicionar payloads personalizados. Pensada pra uso em pentests autorizados.

`https://mclohrk.xyz`

## O que essa ferramenta gera (leia antes de usar)

Os arquivos gerados são **content spoofing**, não documentos válidos — a mesma categoria de artefato usada em testes da vulnerabilidade de File Upload, descrita em detalhes na [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)

Exemplo do output:

```
$ cat file-gen_20261005.pdf
<script>alert('FILEGEN-TEST')</script>   ← 38 bytes, HTML puro com extensão .pdf
```
## Como funciona

1. **Container** — escolhe a(s) extensão(ões) que o input da aplicação-alvo espera (`.pdf`, `.php`, `.js`, `.svg`, `.xml`, `.csv`, `.jpg`, `.zip`). O conteúdo não será um documento válido dessa extensão.
2. **Payload** — escolhe um marcador pronto ou cola um payload personalizado autorizado. Cada opção tem tooltip explicando a hipótese de teste que cobre (ver tabela abaixo).
3. **Saída** — gera 1 arquivo, ou em lote (um arquivo por container selecionado, baixado como `.zip`).

O nome do arquivo/zip segue a lógica do projeto automaticamente quando você não informa um nome (`file-gen_AAAAMMDD...`), ou nome personalizado no campo "base name".

## O que cada payload prova (e o que não prova)

| Payload | O que testa | O que NÃO prova |
|---|---|---|
| `js · alert()` | Se o arquivo servido de volta executa como HTML (MIME sniffing / stored XSS). Só dispara com Content-Type permissivo. | Não executa dentro de PDF real. Não testa magic bytes. |
| `php · marcador` | Execução server-side: acessar o `.php` direto e ver o marcador na resposta HTTP. | Não testa se o app renomeia/armazena fora do webroot. |
| `python · print()` | Idem para runtimes Python. | — |
| `sql · string de teste` | Se o arquivo for **importado/processado por um banco** (ex.: importação de CSV). | Não testa SQLi no upload em si. |
| `personalizado` | Qualquer payload autorizado no escopo do teste. | — |
| `nenhum (vazio)` | Validação estrutural: arquivo vazio deveria ser rejeitado. | — |

## Hospedagem (GitHub Pages)

O projeto é estático e não precisa de build, o deploy é só subir os arquivos e ativar o Pages:

1. Faça push deste repo para o GitHub (todos os arquivos na raiz: `index.html`, `style.css`, `app.js`, `i18n.js`, `theme.js`).
2. No repo: **Settings → Pages → Source: Deploy from a branch** → selecione `main` e a pasta `/ (root)`.
3. Em ~1 minuto o app fica disponível em `https://<usuario>.github.io/<repo>/`.

## Limitação conhecida: magic bytes

Os arquivos não carregam magic bytes da extensão escolhida. Um toggle de "cabeçalho real (polyglot)" está no roadmap, mas ele muda o que o teste prova:

- **Com magic bytes** → passa na validação de conteúdo, mas o browser tende a sniffar como PDF e o `alert()` não dispara (o vetor XSS morre);
- **Sem magic bytes** (comportamento atual) → falha em validadores de magic number, mas mantém o vetor MIME sniffing vivo.

## Princípio de design

Os payloads pré-definidos são marcadores que servem para provar a falha (ex.: extensão aceita sem validar conteúdo, código refletido/renderizado). Payloads reais de cada vetor podem ser adicionados pelo campo "personalizado".

## Changelog

### v0.2
- Descrições reescritas: deixa explícito que os arquivos são content spoofing, não documentos válidos.
- Adicionados tooltips por payload explicando a hipótese de teste de cada um (`tipJs`, `tipPhp`, `tipPy`, `tipSql`, `tipCustom`, `tipNone`) e no container `.pdf` (`tipPdf`).
- `i18n.js`: `apply()` passa a resolver `data-i18n-title`; o `index.html` ganhou os atributos correspondentes nos labels. `app.js` não precisou de mudança.
- README: nova seção "O que essa ferramenta gera", tabela de payloads com o que prova/não prova, seção de limitação de magic bytes.
- README: seção "Hospedagem (GitHub Pages)" com passo a passo de deploy e esclarecimento da dependência de CDN (JSZip).

## Como contribuir

Contribuições são bem-vindas, principalmente:

- **Novos payloads de teste**: abra um PR adicionando o marcador em `app.js` (função `payloadFor`) e as strings correspondentes em `i18n.js`. Todo payload novo precisa vir com uma **referência** (link pra OWASP, PortSwigger, PayloadsAllTheThings, CVE, writeup etc.) explicando de onde vem a técnica e por que ela é relevante pro teste de upload.
- **Novos containers/extensões**: se você testou um bypass de extensão que não está na lista, manda o PR com o contexto de onde esse vetor é comum.
- **Magic bytes / polyglots**: a feature mais pedida — se for implementar, documente o trade-off (ver seção acima).
- **Correções e traduções**: revisão de PT/EN, acessibilidade, responsividade.
- **Fortalecimento da comunidade**: compartilhar o projeto, discutir casos de uso em comunidades de segurança ofensiva, sugerir melhorias via issues, e ajudar quem está começando em testes de upload a entender o "porquê" de cada payload, não só o "como".

## Aviso
Uso exclusivo em testes autorizados (pentest com escopo definido, CTF, ambiente de laboratório próprio). O autor não se responsabiliza por uso indevido.

---
🏴‍☠️ [mclohrk.xyz](https://mclohrk.xyz)
