import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createI18n } from 'vue-i18n'

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const pt = JSON.parse(read('src/locales/pt-BR.json'))
const en = JSON.parse(read('src/locales/en-US.json'))
const keys = (value, prefix = '') => Object.entries(value).flatMap(([key, child]) =>
  child && typeof child === 'object' ? keys(child, prefix + key + '.') : [prefix + key])
assert.deepEqual(keys(pt).sort(), keys(en).sort(), 'Both languages must cover the same content')
for (const locale of [pt, en]) {
  const { t } = createI18n({ legacy: false, locale: locale.lang, messages: { [locale.lang]: locale } }).global
  for (const job of ['fictor', 'atalaia', 'inss']) {
    assert.equal(t('experience.' + job + '.role'), locale.experience[job].role, 'The complete role must render: ' + job)
  }
}

const projects = read('src/data/projects.ts')
for (const [, slug] of projects.matchAll(/slug: '([^']+)'/g)) {
  for (const locale of [pt, en]) {
    for (const field of ['name', 'category', 'summary', 'image_alt', 'description', 'problem', 'solution', 'result']) {
      assert.ok(locale.projects[slug]?.[field]?.trim(), slug + ' is missing ' + field)
    }
  }
}
for (const [, path] of projects.matchAll(/'(\/projects\/[^']+)'/g)) {
  assert.ok(existsSync(new URL('../public' + path, import.meta.url)), 'Missing project image: ' + path)
}
for (const key of keys(pt)) {
  const value = key.split('.').reduce((obj, segment) => obj[segment], pt)
  assert.ok(!/[—–]/.test(value), 'Review dash in Portuguese copy: ' + key)
}
console.log('Content checked: translations, six case studies, image paths and Portuguese punctuation.')
