// i18n.js  dicionário e aplicação de traduções PT/EN
const I18N = {
  pt: {
    subtitle: 'Monta arquivos de teste para validar controles de upload referentes à vulnerabilidade de file upload, podendo adicionar payloads personalizados.',
    s1title: '01 · container', s1hint: 'extensão do arquivo que o input da aplicação espera.',
    s2title: '02 · payload', s2hint: 'marcador inofensivo  prova a falha sem executar nada perigoso.',
    marker: 'marcador', sqltest: 'sql · string de teste', custom: 'personalizado', none: 'nenhum (vazio)',
    customPh: 'cole aqui o payload autorizado pro teste…',
    s3title: '03 · saída', baseNameLabel: 'nome base',
    baseNamePh: 'deixe em branco pra usar o padrão do projeto',
    mode1: '1 arquivo', mode2: 'lote (.zip, 1 por container)',
    generateBtn: 'GERAR ARQUIVO',
    errNoContainer: 'selecione pelo menos um container.',
    errSingleMode: 'modo "1 arquivo" aceita só um container marcado  ou mude pra lote.',
    okSingle: n => `gerado: ${n}`,
    okBatch: (n, c) => `gerado: ${n} (${c} arquivos)`,
  },
  en: {
    subtitle: 'builds test files to validate upload controls  pick the container, the payload, and generate.',
    s1title: '01 · container', s1hint: 'file extension the app\'s input expects.',
    s2title: '02 · payload', s2hint: 'harmless marker  proves the flaw without running anything dangerous.',
    marker: 'marker', sqltest: 'sql · test string', custom: 'custom', none: 'none (empty)',
    customPh: 'paste your authorized test payload here…',
    s3title: '03 · output', baseNameLabel: 'base name',
    baseNamePh: 'leave blank to use the project default',
    mode1: '1 file', mode2: 'batch (.zip, 1 per container)',
    generateBtn: 'generate',
    errNoContainer: 'select at least one container.',
    errSingleMode: '"1 file" mode only accepts a single container  switch to batch.',
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
