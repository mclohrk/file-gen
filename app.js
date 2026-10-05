// app.js — geração de arquivos/payloads e wiring da UI
const customField = document.getElementById('customPayload');
const exampleSelect = document.getElementById('payloadExample');
const statusEl = document.getElementById('status');

function defaultBaseName() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `file-gen_${stamp}`;
}

// vários exemplos por tipo — cada marcador é inofensivo, nenhum é exploit funcional
const EXAMPLES = {
  js: mark => [
    `<script>alert('${mark}')</script>`,
    `<script>confirm('${mark}')</script>`,
    `<script>document.title='${mark}'</script>`,
  ],
  php: mark => [
    `<?php /* ${mark} */ echo "${mark}"; ?>`,
    `<?= "${mark}-" . date('Y-m-d'); ?>`,
    `<?php echo md5('${mark}'); ?>`,
  ],
  py: mark => [
    `print("${mark}")`,
    `import sys; sys.stdout.write("${mark}")`,
    `raise Exception("${mark}")`,
  ],
  sql: mark => [
    `' OR '1'='1' -- ${mark}`,
    `'; SELECT '${mark}'; --`,
    `' UNION SELECT '${mark}'-- `,
  ],
};

function populateExamples(type, mark) {
  if (!EXAMPLES[type]) { exampleSelect.innerHTML = ''; exampleSelect.hidden = true; return; }
  exampleSelect.hidden = false;
  const list = EXAMPLES[type](mark);
  exampleSelect.innerHTML = list
    .map((ex, i) => `<option value="${i}">${ex.replace(/</g, '&lt;')}</option>`)
    .join('');
}

function payloadFor(type, mark) {
  if (EXAMPLES[type]) {
    const list = EXAMPLES[type](mark);
    return list[exampleSelect.value || 0];
  }
  switch (type) {
    case 'custom': return customField.value || `${mark} (payload personalizado vazio)`;
    case 'none':
    default:       return '';
  }
}

function triggerDownload(filename, blob) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function wirePayloadToggle() {
  const mark = 'FILEGEN-TEST';
  document.getElementsByName('payload').forEach(r => {
    r.addEventListener('change', () => {
      const type = document.querySelector('input[name="payload"]:checked').value;
      customField.disabled = type !== 'custom';
      populateExamples(type, mark);
    });
  });
  populateExamples(document.querySelector('input[name="payload"]:checked').value, mark);
}

function wireGenerate() {
  document.getElementById('generate').addEventListener('click', () => {
    const containers = [...document.querySelectorAll('#containers input:checked')].map(c => c.value);
    const payloadType = document.querySelector('input[name="payload"]:checked').value;
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const baseName = document.getElementById('baseName').value.trim() || defaultBaseName();
    const mark = 'FILEGEN-TEST';

    if (containers.length === 0) {
      statusEl.textContent = I18n.t('errNoContainer');
      return;
    }

    const content = payloadFor(payloadType, mark);

    if (mode === 'single') {
      if (containers.length > 1) {
        statusEl.textContent = I18n.t('errSingleMode');
        return;
      }
      const name = `${baseName}.${containers[0]}`;
      triggerDownload(name, new Blob([content], { type: 'text/plain' }));
      statusEl.textContent = I18n.t('okSingle', name);
      return;
    }

    const zip = new JSZip();
    containers.forEach(ext => zip.file(`${baseName}.${ext}`, content));
    zip.generateAsync({ type: 'blob' }).then(blob => {
      const zipName = `${baseName}_filegen-batch.zip`;
      triggerDownload(zipName, blob);
      statusEl.textContent = I18n.t('okBatch', zipName, containers.length);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  Theme.apply();
  I18n.apply();
  document.getElementById('themeToggle').addEventListener('click', Theme.toggle);
  document.getElementById('langToggle').addEventListener('click', I18n.toggle);
  wirePayloadToggle();
  wireGenerate();
});
