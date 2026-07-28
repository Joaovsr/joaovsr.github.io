<template>
  <main class="admin-page">
    <section v-if="!authenticated" class="card login-card">
      <p class="eyebrow">PAINEL ADMIN</p>
      <h1>Publicar Case Study</h1>
      <p>Entre para criar conteúdo bilíngue e indexá-lo automaticamente na Knowledge Base.</p>
      <form @submit.prevent="login">
        <label>
          Senha
          <input v-model="password" type="password" autocomplete="current-password" required />
        </label>
        <button :disabled="loading">{{ loading ? 'Entrando…' : 'Entrar' }}</button>
      </form>
      <p v-if="error" class="error" role="alert">{{ error }}</p>
    </section>

    <section v-else class="admin-shell">
      <header>
        <div>
          <p class="eyebrow">CONTEÚDO PUBLICADO</p>
          <h1>Case Studies</h1>
        </div>
        <a href="/">Ver portfólio</a>
      </header>

      <div class="workspace">
        <aside class="card list">
          <h2>Publicados</h2>
          <p v-if="loadingList">Carregando…</p>
          <p v-else-if="caseStudies.length === 0">Nenhum Case Study publicado ainda.</p>
          <button
            v-for="caseStudy in caseStudies"
            :key="caseStudy.id"
            class="case-study"
            type="button"
            @click="loadCaseStudy(caseStudy)"
          >
            <strong>{{ caseStudy.titlePtBr }}</strong>
            <span>{{ caseStudy.slug }} · revisão {{ caseStudy.revision }}</span>
          </button>
        </aside>

        <form class="card editor" @submit.prevent="publish">
          <div class="editor-heading">
            <div>
              <h2>{{ draft.expectedCurrentRevision ? 'Editar' : 'Novo' }} Case Study</h2>
              <p>As duas localizações precisam estar completas para publicar.</p>
            </div>
            <button class="secondary" type="button" @click="newCaseStudy">Novo</button>
          </div>

          <label>
            Identificador URL
            <input v-model="draft.slug" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required />
          </label>

          <div class="locales">
            <label>
              Título em português
              <input v-model="draft.titlePtBr" required />
            </label>
            <label>
              Title in English
              <input v-model="draft.titleEnUs" required />
            </label>
          </div>

          <article v-for="(section, index) in draft.sections" :key="index" class="section-editor">
            <div class="section-heading">
              <h3>Seção {{ index + 1 }}</h3>
              <button
                v-if="draft.sections.length > 1"
                class="text-button"
                type="button"
                @click="removeSection(index)"
              >
                Remover
              </button>
            </div>
            <div class="locales">
              <label>
                Título em português
                <input v-model="section.headingPtBr" required />
              </label>
              <label>
                Title in English
                <input v-model="section.headingEnUs" required />
              </label>
              <label>
                Texto em português
                <textarea v-model="section.bodyPtBr" rows="7" required />
              </label>
              <label>
                Text in English
                <textarea v-model="section.bodyEnUs" rows="7" required />
              </label>
            </div>
          </article>

          <button class="secondary" type="button" @click="addSection">Adicionar seção</button>
          <button :disabled="publishing" type="submit">
            {{ publishing ? 'Publicando e indexando…' : 'Publicar agora' }}
          </button>
          <p v-if="notice" class="notice" role="status">{{ notice }}</p>
          <p v-if="error" class="error" role="alert">{{ error }}</p>
        </form>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import {
  AdminApiError,
  createAdminSession,
  getAdminCsrfToken,
  listAdminCaseStudies,
  publishAdminCaseStudy,
  type AdminCaseStudy,
  type AdminCaseStudySection,
  type PublishCaseStudyRequest
} from '@/api/admin'

const password = ref('')
const authenticated = ref(false)
const loading = ref(false)
const loadingList = ref(false)
const publishing = ref(false)
const error = ref('')
const notice = ref('')
const csrfToken = ref('')
const caseStudies = ref<AdminCaseStudy[]>([])
const draft = reactive<PublishCaseStudyRequest>(emptyDraft())

onMounted(async () => {
  try {
    await establishSession()
  } catch {
    // A rota também é usada sem sessão ativa; nesse caso mostramos o login.
  }
})

async function login() {
  loading.value = true
  error.value = ''
  try {
    await createAdminSession(password.value)
    password.value = ''
    await establishSession()
  } catch (cause) {
    error.value = messageFor(cause, 'Senha inválida ou painel indisponível.')
  } finally {
    loading.value = false
  }
}

async function establishSession() {
  csrfToken.value = await getAdminCsrfToken()
  authenticated.value = true
  await refreshCaseStudies()
}

async function refreshCaseStudies() {
  loadingList.value = true
  try {
    caseStudies.value = await listAdminCaseStudies()
  } catch (cause) {
    error.value = messageFor(cause, 'Não foi possível carregar os Case Studies.')
  } finally {
    loadingList.value = false
  }
}

function loadCaseStudy(caseStudy: AdminCaseStudy) {
  Object.assign(draft, {
    slug: caseStudy.slug,
    titlePtBr: caseStudy.titlePtBr,
    titleEnUs: caseStudy.titleEnUs,
    expectedCurrentRevision: caseStudy.revision,
    sections: caseStudy.sections.map(section => ({ ...section }))
  })
  notice.value = ''
  error.value = ''
}

function newCaseStudy() {
  Object.assign(draft, emptyDraft())
  notice.value = ''
  error.value = ''
}

function addSection() {
  draft.sections.push(emptySection(draft.sections.length))
}

function removeSection(index: number) {
  draft.sections.splice(index, 1)
  draft.sections.forEach((section, position) => {
    section.position = position
  })
}

async function publish() {
  publishing.value = true
  error.value = ''
  notice.value = ''
  try {
    const published = await publishAdminCaseStudy(
      { ...draft, sections: draft.sections.map(section => ({ ...section })) },
      csrfToken.value
    )
    loadCaseStudy(published)
    await refreshCaseStudies()
    notice.value = 'Publicado e indexado com sucesso.'
  } catch (cause) {
    error.value = messageFor(cause, 'A publicação não foi concluída.')
  } finally {
    publishing.value = false
  }
}

function emptyDraft(): PublishCaseStudyRequest {
  return {
    slug: '',
    titlePtBr: '',
    titleEnUs: '',
    expectedCurrentRevision: null,
    sections: [emptySection(0)]
  }
}

function emptySection(position: number): AdminCaseStudySection {
  return { position, headingPtBr: '', headingEnUs: '', bodyPtBr: '', bodyEnUs: '' }
}

function messageFor(cause: unknown, fallback: string): string {
  return cause instanceof AdminApiError ? cause.message : fallback
}
</script>

<style lang="scss" scoped>
.admin-page { min-height: 100vh; padding: 48px 24px; background: $bg; color: $secondary; font-family: $font; }
.admin-shell, .login-card { max-width: 1180px; margin: auto; }
.card { border: 1px solid rgba($secondary, .18); border-radius: 16px; background: rgba($bg, .94); padding: 28px; box-shadow: 0 18px 50px rgba(0, 0, 0, .18); }
.login-card { max-width: 460px; margin-top: 10vh; }
header, .editor-heading, .section-heading { display: flex; justify-content: space-between; align-items: start; gap: 16px; }
header { margin-bottom: 28px; }
.workspace { display: grid; grid-template-columns: minmax(230px, .55fr) minmax(0, 1.45fr); gap: 24px; }
.eyebrow { color: $primary; letter-spacing: .14em; font-size: .75rem; font-weight: 700; }
h1, h2, h3 { margin: 0 0 8px; }
p { line-height: 1.5; }
form { display: grid; gap: 18px; }
label { display: grid; gap: 7px; font-weight: 600; }
input, textarea { width: 100%; box-sizing: border-box; border: 1px solid rgba($secondary, .3); border-radius: 8px; padding: 10px 12px; font: inherit; color: inherit; background: transparent; }
textarea { resize: vertical; }
button, a { border-radius: 8px; padding: 10px 14px; font: inherit; font-weight: 700; cursor: pointer; }
button { border: 0; background: $primary; color: $bg; }
button:disabled { opacity: .6; cursor: wait; }
a, .secondary { border: 1px solid rgba($primary, .7); background: transparent; color: $primary; text-decoration: none; }
.list { align-self: start; display: grid; gap: 12px; }
.case-study { display: grid; gap: 4px; text-align: left; background: transparent; color: $secondary; border: 1px solid rgba($secondary, .16); }
.case-study span { color: rgba($secondary, .65); font-size: .82rem; font-weight: 400; }
.locales { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.section-editor { border-top: 1px solid rgba($secondary, .18); padding-top: 18px; }
.text-button { padding: 0; background: transparent; color: $primary; }
.error { color: #ef7373; }.notice { color: #77d89b; }
@media (max-width: 760px) { .admin-page { padding: 24px 14px; } .workspace, .locales { grid-template-columns: 1fr; } .card { padding: 20px; } }
</style>
