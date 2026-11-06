import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createI18n } from 'vue-i18n'
import ts from 'typescript'

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const pt = JSON.parse(read('src/locales/pt-BR.json'))
const en = JSON.parse(read('src/locales/en-US.json'))
const keys = (value, prefix = '') => Object.entries(value).flatMap(([key, child]) =>
  child && typeof child === 'object' ? keys(child, prefix + key + '.') : [prefix + key])
assert.deepEqual(keys(pt).sort(), keys(en).sort(), 'Both languages must cover the same content')
const experience = read('src/data/experience.ts')
const experienceSlugs = [...experience.matchAll(/slug: '([^']+)'/g)].map(([, slug]) => slug)
const companyKeys = [...experience.matchAll(/companyKey: '([^']+)'/g)].map(([, key]) => key)
const workModes = [...experience.matchAll(/workMode: '([^']+)'/g)].map(([, mode]) => mode)
const educationSlugs = [...read('src/data/education.ts').matchAll(/slug: '([^']+)'/g)].map(([, slug]) => slug)
for (const locale of [pt, en]) {
  const { t } = createI18n({ legacy: false, locale: locale.lang, messages: { [locale.lang]: locale } }).global
  for (const key of companyKeys) {
    const value = key.split('.').reduce((obj, part) => obj?.[part], locale)
    assert.ok(value?.trim(), 'Missing company translation: ' + key)
    assert.equal(t(key), value, 'The translated company must render')
  }
  for (const mode of workModes) {
    assert.ok(locale.experience[mode]?.trim(), 'Missing work mode: ' + mode)
    assert.equal(t('experience.' + mode), locale.experience[mode], 'The work mode must render')
  }
  for (const job of experienceSlugs) {
    assert.ok(locale.experience[job]?.role?.trim(), 'Missing role: ' + job)
    assert.ok(locale.experience[job]?.description?.trim(), 'Missing experience description: ' + job)
    assert.equal(t('experience.' + job + '.role'), locale.experience[job].role, 'The complete role must render: ' + job)
  }
  for (const slug of educationSlugs) {
    assert.ok(locale.education[slug]?.degree?.trim(), 'Missing education: ' + slug)
    assert.equal(t('education.' + slug + '.degree'), locale.education[slug].degree, 'The complete degree must render: ' + slug)
  }
}

const projectSource = ts.transpileModule(read('src/data/projects.ts'), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 }
}).outputText
const { projects } = await import('data:text/javascript;base64,' + Buffer.from(projectSource).toString('base64'))
assert.equal(new Set(projects.map(project => project.slug)).size, projects.length, 'Project slugs must be unique')
for (const project of projects) {
  const { slug } = project
  if (project.status === 'public') {
    assert.ok(project.repoUrl, 'Public project needs a repository: ' + slug)
    const url = new URL(project.repoUrl)
    assert.equal(url.protocol, 'https:', 'Repository link must use HTTPS')
    assert.equal(url.hostname, 'github.com', 'Repository link must point to GitHub')
    assert.match(url.pathname, /^\/[^/]+\/[^/]+\/?$/, 'Repository link needs an owner and repository')
  }
  for (const locale of [pt, en]) {
    const fields = ['name', 'category', 'summary', 'description', 'problem', 'solution', 'result']
    if (project.images?.length) fields.push('image_alt')
    for (const field of fields) {
      assert.ok(locale.projects[slug]?.[field]?.trim(), slug + ' is missing ' + field)
    }
  }
  for (const path of project.images ?? []) {
    assert.ok(existsSync(new URL('../public' + path, import.meta.url)), 'Missing project image: ' + path)
  }
}
for (const key of keys(pt)) {
  const value = key.split('.').reduce((obj, segment) => obj[segment], pt)
  assert.ok(!/[—–]/.test(value), 'Review dash in Portuguese copy: ' + key)
}
console.log('Content checked: translations, experience, education, case studies, image paths and Portuguese punctuation.')
