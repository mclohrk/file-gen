// i18n.js — dicionário e aplicação de traduções PT/EN
const I18N = {
  pt: {
    subtitle: 'Monta arquivos de teste para validar controles de upload referentes à vulnerabilidade de file upload, podendo adicionar payloads personalizados.',
    s1title: '01 · container', s1hint: 'extensão do arquivo que o input da aplicação espera.',
    s2title: '02 · payload', s2hint: 'marcador inofensivo — prova a falha sem executar nada perigoso.',
    marker: 'marcador', sqltest: 'sql · string de teste', custom: 'personalizado', none: 'nenhum (vazio)',
    customPh: 'cole aqui o payload autorizado pro teste…',
    s3title: '03 · saída', baseNameLabel: 'Nome base',
    baseNamePh: 'deixe em branco pra usar o padrão do projeto',
    mode1: '1 arquivo', mode2: 'lote (.zip, 1 por container)',
    generateBtn: 'Gerar',
    errNoContainer: 'selecione pelo menos um container.',
    errSingleMode: 'modo "1 arquivo" aceita só um container marcado — ou mude pra lote.',
    okSingle: n => `gerado: ${n}`,
    okBatch: (n, c) => `gerado: ${n} (${c} arquivos)`,
    tipPdf: 'o arquivo não é um PDF real — mesmo com essa extensão, o conteúdo é o payload escolhido. testa se o servidor valida conteúdo além da extensão.',
    tipJs: 'hipótese: o input reflete/renderiza o conteúdo do arquivo sem sanitizar, permitindo execução de script (XSS via upload).',
    tipPhp: 'hipótese: o servidor executa arquivos com essa extensão ou aceita upload sem validar o tipo real, permitindo code injection no lado do servidor.',
    tipPy: 'hipótese: alguma rotina do lado do servidor processa ou executa o conteúdo do arquivo como código Python.',
    tipSql: 'hipótese: o conteúdo do arquivo é lido e usado numa query sem sanitização, permitindo SQL injection a partir do upload.',
    tipCustom: 'payload definido por você — descreva a hipótese de teste no campo de texto.',
    tipNone: 'arquivo vazio — testa validação de extensão/MIME sem payload nenhum.',
  },
  en: {
    subtitle: 'Builds test files to validate upload controls related to file upload vulnerabilities, with support for custom payloads.',
    s1title: '01 · container', s1hint: 'file extension the app\'s input expects.',
    s2title: '02 · payload', s2hint: 'harmless marker — proves the flaw without running anything dangerous.',
    marker: 'marker', sqltest: 'sql · test string', custom: 'custom', none: 'none (empty)',
    customPh: 'paste your authorized test payload here…',
    s3title: '03 · output', baseNameLabel: 'Base name',
    baseNamePh: 'leave blank to use the project default',
    mode1: '1 file', mode2: 'batch (.zip, 1 per container)',
    generateBtn: 'Generate',
    errNoContainer: 'select at least one container.',
    errSingleMode: '"1 file" mode only accepts a single container — switch to batch.',
    okSingle: n => `generated: ${n}`,
    okBatch: (n, c) => `generated: ${n} (${c} files)`,
    tipPdf: 'the file isn\'t a real PDF — even with this extension, the content is the chosen payload. tests whether the server validates content beyond the extension.',
    tipJs: 'hypothesis: the input reflects/renders the file content without sanitizing it, allowing script execution (XSS via upload).',
    tipPhp: 'hypothesis: the server executes files with this extension, or accepts the upload without validating the real file type, allowing server-side code injection.',
    tipPy: 'hypothesis: some server-side routine processes or executes the file content as Python code.',
    tipSql: 'hypothesis: the file content is read and used in a query without sanitization, allowing SQL injection via upload.',
    tipCustom: 'payload defined by you — describe the test hypothesis in the text field.',
    tipNone: 'empty file — tests extension/MIME validation with no payload at all.',
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
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (I18N[lang][key]) el.title = I18N[lang][key];
    });
    const btn = document.getElementById('langToggle');
    if (btn) btn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
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
