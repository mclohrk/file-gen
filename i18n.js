// i18n.js  dicionário e aplicação de traduções PT/EN
// v0.2  descrições reescritas: arquivos gerados são content-spoofing, não documentos válidos.
//       novas chaves: tipJs, tipPhp, tipPy, tipSql, tipCustom, tipNone, tipPdf.
//       apply() agora também resolve data-i18n-title (tooltips via atributo title).
const I18N = {
  pt: {
    subtitle: 'Monta arquivos de teste para validar controles de upload referentes à vulnerabilidade de file upload, podendo adicionar payloads personalizados.',
    s1title: '01 · container',
    s1hint: 'A extensão que o input aceita. O conteúdo NÃO será um documento válido dessa extensão — ex.: .pdf conterá HTML, não um PDF real. Se o alvo rejeitar, é sinal de validação de conteúdo ativa.',
    s2title: '02 · payload',
    s2hint: 'O que vai dentro do arquivo. Passe o mouse sobre cada opção para ver a hipótese de teste que ela cobre:',
    tipJs: 'Dispara popup SE o arquivo for servido de volta como HTML (MIME sniffing / stored XSS). Não executa dentro de um PDF real — só testa extensão e Content-Type, não magic bytes.',
    tipPhp: 'Testa execução server-side: se o .php for acessado direto e executar, o marcador aparece na resposta HTTP.',
    tipPy: 'Idem, para runtimes Python — se o servidor interpretar o arquivo, o marcador aparece na saída.',
    tipSql: 'Só relevante se o arquivo for importado/processado por um banco (ex.: importação de CSV). Não testa SQLi no upload em si.',
    tipCustom: 'Use apenas payload autorizado no escopo do seu teste.',
    tipNone: 'Testa validação estrutural: um arquivo vazio deveria ser rejeitado por qualquer validação decente.',
    tipPdf: 'O .pdf gerado contém HTML, não um PDF — magic bytes (%PDF-) ausentes de propósito. Ver doc do projeto.',
    marker: 'marcador', sqltest: 'sql · string de teste', custom: 'personalizado', none: 'nenhum (vazio)',
    customPh: 'cole aqui o payload autorizado pro teste…',
    s3title: '03 · saída', baseNameLabel: 'nome base',
    baseNamePh: 'deixe em branco pra usar o padrão do projeto',
    mode1: '1 arquivo', mode2: 'lote (.zip, 1 por container)',
    generateBtn: 'GERAR ARQUIVO',
    errNoContainer: 'selecione pelo menos um container.',
    errSingleMode: 'modo "1 arquivo" aceita só um container marcado — ou mude pra lote.',
    okSingle: n => `gerado: ${n}`,
    okBatch: (n, c) => `gerado: ${n} (${c} arquivos)`,
  },
  en: {
    subtitle: 'builds test files to validate upload controls  pick the container, the payload, and generate.',
    s1title: '01 · container',
    s1hint: 'The extension the input accepts. Content will NOT be a valid document of that extension — e.g., .pdf will contain HTML, not a real PDF. Rejection means content validation is active.',
    s2title: '02 · payload',
    s2hint: 'What goes inside the file. Hover each option to see which test hypothesis it covers:',
    tipJs: 'Triggers a popup IF the file is served back as HTML (MIME sniffing / stored XSS). It does not run inside a real PDF — it tests extension and Content-Type only, not magic bytes.',
    tipPhp: 'Tests server-side execution: if the .php is accessed directly and runs, the marker shows up in the HTTP response.',
    tipPy: 'Same, for Python runtimes — if the server interprets the file, the marker appears in the output.',
    tipSql: 'Only relevant if the file is imported/processed by a database (e.g., CSV import). Does not test SQLi in the upload itself.',
    tipCustom: 'Use only payloads authorized within your test scope.',
    tipNone: 'Tests structural validation: an empty file should be rejected by any decent validation.',
    tipPdf: 'The generated .pdf contains HTML, not a PDF — magic bytes (%PDF-) intentionally absent. See project docs.',
    marker: 'marker', sqltest: 'sql · test string', custom: 'custom', none: 'none (empty)',
    customPh: 'paste your authorized test payload here…',
    s3title: '03 · output', baseNameLabel: 'base name',
    baseNamePh: 'leave blank to use the project default',
    mode1: '1 file', mode2: 'batch (.zip, 1 per container)',
    generateBtn: 'generate',
    errNoContainer: 'select at least one container.',
    errSingleMode: '"1 file" mode accepts only one checked container — or switch to batch.',
    okSingle: n => `generated: ${n}`,
    okBatch: (n, c) => `generated: ${n} (${c} files)`,
  }
};

const I18n = (() => {
  let lang = localStorage.getItem('filegen-lang') || 'pt';

  function apply() {
    document.documentElement.lang = lang === 'pt' ? 'pt-br' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (I18N[lang][key]) el.textContent = I18N[lang][key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (I18N[lang][key]) el.placeholder = I18N[lang][key];
    });
    // v0.2: tooltips via atributo title (natives, sem wiring extra no app.js)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (I18N[lang][key]) el.title = I18N[lang][key];
    });
  }

  function toggle() {
    lang = lang === 'pt' ? 'en' : 'pt';
    localStorage.setItem('filegen-lang', lang);
    apply();
  }

  function t(key, ...args) {
    const v = I18N[lang][key];
    return typeof v === 'function' ? v(...args) : v;
  }

  return { apply, toggle, t, current: () => lang };
})();