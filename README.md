# file-gen

> 🚧 **status: beta** Em desenvolvimento ativo, pode ter bugs e mudanças de comportamento entre versões.

Ferramenta web (estática, roda no GitHub Pages) que monta arquivos de teste para validar controles de upload referentes à vulnerabilidade de file upload, podendo adicionar payloads personalizados. Pensada pra uso em pentests autorizados.

Teste ao vivo: `https://mclohrk.xyz` (seção Ferramentas)

## Como funciona

1. **Container**  escolhe a(s) extensão(ões) que o input da aplicação-alvo espera (`.pdf`, `.php`, `.js`, `.svg`, `.xml`, `.csv`, `.jpg`, `.zip`).
2. **Payload**  escolhe um marcador pronto (JS `alert()`, marcador PHP, `print()` em Python, string clássica de SQLi) ou cola um payload personalizado autorizado.
3. **Saída**  gera 1 arquivo, ou em lote (um arquivo por container selecionado, baixado como `.zip`).

O nome do arquivo/zip segue a lógica do projeto automaticamente quando você não informa um nome (`file-gen_AAAAMMDD...`), em vez de um nome genérico.

## Princípio de design

Os payloads pré-definidos são testes como mensagens, etc, servem para provar a falha (ex: extensão aceita sem validar conteúdo, código refletido/renderizado) sem executar nada perigoso de verdade. Payloads reais de cada teste podem ser adicionados pelo campo "personalizado".
## Stack

## Como contribuir

Contribuições são bem-vindas, principalmente:

- **Novos payloads de teste**: abra um PR adicionando o marcador em `app.js` (função `payloadFor`) e as strings correspondentes em `i18n.js`. Todo payload novo precisa vir com uma **referência** (link pra OWASP, PortSwigger, PayloadsAllTheThings, CVE, writeup etc.) explicando de onde vem a técnica e por que ela é relevante pro teste de upload.
- **Novos containers/extensões**: se você testou um bypass de extensão que não está na lista, manda o PR com o contexto de onde esse vetor é comum.
- **Correções e traduções**: revisão de PT/EN, acessibilidade, responsividade.
- **Fortalecimento da comunidade**: compartilhar o projeto, discutir casos de uso em comunidades de segurança ofensiva, sugerir melhorias via issues, e ajudar quem está começando em testes de upload a entender o "porquê" de cada payload, não só o "como".

## Aviso
Uso exclusivo em testes autorizados (pentest com escopo definido, CTF, ambiente de laboratório próprio). O autor não se responsabiliza por uso indevido.

---
🏴‍☠️ [mclohrk.xyz](https://mclohrk.xyz)
