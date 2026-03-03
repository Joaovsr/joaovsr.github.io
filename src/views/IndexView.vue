<template>
  <div class="index">
    <div class="index__bg" aria-hidden="true" />
    <div class="index__content">
      <div class="index__header">
        <h1 class="index__title">João Vinicius <span class="index__title-name">Rodrigues</span></h1>
        <p class="index__subtitle">Full Stack Developer · Data & AI · <a href="mailto:joaovinicius2525@gmail.com" class="index__email">joaovinicius2525@gmail.com</a></p>
        <p class="index__choose">Escolha uma versão do portfolio:</p>
      </div>

      <div class="index__grid">
        <RouterLink
          v-for="v in versions"
          :key="v.path"
          :to="v.path"
          class="index__card"
          :style="{ '--accent': v.accent }"
        >
          <div class="index__card__palette">
            <span
              v-for="c in v.colors"
              :key="c"
              class="index__card__swatch"
              :style="{ background: c }"
            />
          </div>
          <div class="index__card__num">{{ v.path }}</div>
          <h2 class="index__card__name">{{ v.name }}</h2>
          <p class="index__card__desc">{{ v.description }}</p>
          <div class="index__card__tags">
            <span v-for="tag in v.tags" :key="tag" class="index__card__tag">{{ tag }}</span>
          </div>
          <span class="index__card__cta">Visitar →</span>
        </RouterLink>
      </div>

      <div class="index__links">
        <a href="https://github.com/joaovsr" target="_blank" rel="noopener noreferrer" class="index__link">GitHub ↗</a>
        <a href="https://www.linkedin.com/in/joão-vinicius-rodrigues-17b35a202/" target="_blank" rel="noopener noreferrer" class="index__link">LinkedIn ↗</a>
        <a href="/cv-joaovinicius.pdf" download class="index__link">CV ↓</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'

const versions = [
  {
    path: '/1',
    name: 'Cosmos',
    description: 'Dark clássico com estrelas animadas, efeito glitch e scroll por wheel. Inspirado no nicyamada.',
    accent: '#39DFAA',
    colors: ['#0D0F12', '#161920', '#39DFAA', '#e3d9d9'],
    tags: ['Teal', 'Metropolis', 'Criativo']
  },
  {
    path: '/2',
    name: 'Terminal',
    description: 'Estética dev/hacker com output de terminal, cursor piscando e tipografia monospace.',
    accent: '#00FF41',
    colors: ['#000000', '#0a0a0a', '#00FF41', '#cccccc'],
    tags: ['Verde', 'JetBrains Mono', 'Técnico']
  },
  {
    path: '/3',
    name: 'Neon Grid',
    description: 'Fundo com grid roxo, ícones de tech flutuando no hero, cards de skills com efeito neon ao hover.',
    accent: '#C084FC',
    colors: ['#0a0a14', '#12121f', '#C084FC', '#e4e4e7'],
    tags: ['Roxo', 'Inter', 'Tech Icons']
  },
  {
    path: '/4',
    name: 'Bold',
    description: 'Tipografia gigante, design editorial, seções com números grandes e contadores de stats.',
    accent: '#FF6B35',
    colors: ['#080808', '#111111', '#FF6B35', '#ffffff'],
    tags: ['Laranja', 'Space Grotesk', 'Ousado']
  },
  {
    path: '/5',
    name: 'Stealth',
    description: 'Ultra minimal, fundo quase preto, tipografia grande, timeline de experiência e ícones de skills.',
    accent: '#22D3EE',
    colors: ['#0a0a0a', '#141414', '#22D3EE', '#e4e4e7'],
    tags: ['Cyan', 'Poppins', 'Minimal']
  }
]
</script>

<style lang="scss" scoped>
.index {
  min-height: 100vh;
  background: #080a10;
  color: #e2e8f0;
  font-family: 'Inter', 'Metropolis', sans-serif;
  position: relative;
  overflow: hidden;
}

.index__bg {
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at 20% 50%, rgba(96, 165, 250, 0.07) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(129, 140, 248, 0.07) 0%, transparent 50%);
  pointer-events: none;
}

.index__content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px 80px;

  @media (max-width: $mobile) { padding: 40px 20px 60px; }
}

.index__header {
  margin-bottom: 48px;
  text-align: center;
}

.index__title {
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 10px;
}

.index__title-name { color: #60A5FA; }

.index__subtitle {
  font-size: 16px;
  color: rgba(#e2e8f0, 0.55);
  margin-bottom: 16px;
}

.index__email {
  color: #60A5FA;
  transition: opacity 0.2s;
  &:hover { opacity: 0.75; }
}

.index__choose {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(#e2e8f0, 0.35);
}

.index__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
}

.index__card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 28px 28px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 14px;
    border: 1px solid transparent;
    background: linear-gradient(var(--accent), var(--accent)) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.25s;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

    &::before { opacity: 1; }

    .index__card__cta { color: var(--accent); }
  }
}

.index__card__palette {
  display: flex;
  gap: 6px;
  margin-bottom: 4px;
}

.index__card__swatch {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.index__card__num {
  font-size: 48px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.04);
  line-height: 1;
  position: absolute;
  bottom: 16px;
  right: 20px;
  pointer-events: none;
  user-select: none;
  font-family: monospace;
}

.index__card__name {
  font-size: 22px;
  font-weight: 700;
  color: #e2e8f0;
}

.index__card__desc {
  font-size: 13px;
  line-height: 1.7;
  color: rgba(#e2e8f0, 0.55);
  flex: 1;
}

.index__card__tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.index__card__tag {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(#e2e8f0, 0.5);
}

.index__card__cta {
  font-size: 13px;
  font-weight: 700;
  color: rgba(#e2e8f0, 0.3);
  letter-spacing: 0.05em;
  transition: color 0.2s;
  margin-top: 4px;
}

.index__links {
  display: flex;
  gap: 24px;
  justify-content: center;
}

.index__link {
  font-size: 14px;
  font-weight: 600;
  color: rgba(#e2e8f0, 0.4);
  transition: color 0.2s;
  &:hover { color: #60A5FA; }
}
</style>
