import type { jsPDF } from 'jspdf'
import { usePortfolio } from './usePortfolio'

const ACCENT = [124, 92, 255] as const
const TEXT = [30, 32, 42] as const
const MUTED = [100, 105, 120] as const
const RULE = [220, 222, 232] as const

const PAGE_W = 210
const PAGE_H = 297
const MARGIN = 16
const CONTENT_W = PAGE_W - MARGIN * 2

interface Cursor {
  doc: jsPDF
  y: number
}

function setFont(doc: jsPDF, size: number, weight: 'normal' | 'bold' = 'normal') {
  doc.setFont('helvetica', weight)
  doc.setFontSize(size)
}

function setColor(doc: jsPDF, rgb: readonly [number, number, number]) {
  doc.setTextColor(rgb[0], rgb[1], rgb[2])
}

function ensurePage(c: Cursor, needed: number) {
  if (c.y + needed > PAGE_H - MARGIN) {
    c.doc.addPage()
    c.y = MARGIN
  }
}

function rule(c: Cursor) {
  c.doc.setDrawColor(RULE[0], RULE[1], RULE[2])
  c.doc.setLineWidth(0.2)
  c.doc.line(MARGIN, c.y, PAGE_W - MARGIN, c.y)
  c.y += 4
}

function sectionTitle(c: Cursor, title: string) {
  ensurePage(c, 12)
  c.y += 2
  setFont(c.doc, 10, 'bold')
  setColor(c.doc, ACCENT)
  c.doc.text(title.toUpperCase(), MARGIN, c.y)
  c.y += 1.5
  c.doc.setDrawColor(ACCENT[0], ACCENT[1], ACCENT[2])
  c.doc.setLineWidth(0.6)
  c.doc.line(MARGIN, c.y, MARGIN + 14, c.y)
  c.y += 5
}

function paragraph(c: Cursor, text: string, opts?: { size?: number; lineHeight?: number; color?: readonly [number, number, number]; weight?: 'normal' | 'bold' }) {
  const size = opts?.size ?? 9.5
  const lh = opts?.lineHeight ?? 4.6
  const weight = opts?.weight ?? 'normal'
  const color = opts?.color ?? TEXT
  setFont(c.doc, size, weight)
  setColor(c.doc, color)
  const lines = c.doc.splitTextToSize(text, CONTENT_W) as string[]
  for (const line of lines) {
    ensurePage(c, lh)
    c.doc.text(line, MARGIN, c.y)
    c.y += lh
  }
}

function keyValueLine(c: Cursor, key: string, value: string, opts?: { size?: number }) {
  const size = opts?.size ?? 9.5
  ensurePage(c, 5)
  setFont(c.doc, size, 'bold')
  setColor(c.doc, TEXT)
  c.doc.text(key, MARGIN, c.y)
  const keyW = c.doc.getTextWidth(key)
  setFont(c.doc, size, 'normal')
  setColor(c.doc, MUTED)
  c.doc.text(value, MARGIN + keyW + 2, c.y)
  c.y += 5
}

function chips(c: Cursor, items: string[]) {
  ensurePage(c, 6)
  setFont(c.doc, 8, 'normal')
  setColor(c.doc, MUTED)
  const text = items.join('  ·  ')
  const lines = c.doc.splitTextToSize(text, CONTENT_W) as string[]
  for (const line of lines) {
    ensurePage(c, 4)
    c.doc.text(line, MARGIN, c.y)
    c.y += 4
  }
  c.y += 1
}

export function useCvPdf() {
  const { t, currentLocale, experiences, groupedSkills, education, certifications, languages, formatDate, categoryLabel } = usePortfolio()

  async function downloadCv() {
    const { default: JsPdfCtor } = await import('jspdf')
    const doc = new JsPdfCtor({ unit: 'mm', format: 'a4', orientation: 'portrait' })
    const c: Cursor = { doc, y: MARGIN }

    // ─── Header ───────────────────────────────────────────────────────
    setFont(doc, 22, 'bold')
    setColor(doc, TEXT)
    doc.text('JOÃO VINICIUS RODRIGUES', MARGIN, c.y + 6)
    c.y += 11

    setFont(doc, 11, 'normal')
    setColor(doc, ACCENT)
    doc.text(`${t('role')} · ${t('role_sub')}`, MARGIN, c.y)
    c.y += 6

    setFont(doc, 8.5, 'normal')
    setColor(doc, MUTED)
    const contactLine1 = `${t('location')}  ·  joaovinicius2525@gmail.com`
    const contactLine2 = 'github.com/joaovsr  ·  linkedin.com/in/joão-vinicius-rodrigues-17b35a202'
    doc.text(contactLine1, MARGIN, c.y)
    c.y += 4
    doc.text(contactLine2, MARGIN, c.y)
    c.y += 5
    rule(c)

    // ─── Summary ───────────────────────────────────────────────────────
    sectionTitle(c, currentLocale.value === 'pt-BR' ? 'Resumo' : 'Summary')
    paragraph(c, t('about.text'))
    c.y += 1
    paragraph(c, t('about.text2'))

    // ─── Experience ────────────────────────────────────────────────────
    sectionTitle(c, t('experience.title'))
    for (const exp of experiences.value) {
      ensurePage(c, 16)

      // Period (right) + role (left)
      const period = `${formatDate(exp.startDate)} - ${exp.finishDate ? formatDate(exp.finishDate) : t('experience.present')}`
      setFont(doc, 10, 'bold')
      setColor(doc, TEXT)
      doc.text(exp.role, MARGIN, c.y)
      setFont(doc, 8.5, 'normal')
      setColor(doc, MUTED)
      const periodW = doc.getTextWidth(period)
      doc.text(period, PAGE_W - MARGIN - periodW, c.y)
      c.y += 4.5

      // Company
      setFont(doc, 9, 'normal')
      setColor(doc, ACCENT)
      doc.text(exp.company, MARGIN, c.y)
      c.y += 5

      // Description
      paragraph(c, exp.description, { size: 9, lineHeight: 4.4 })

      // Skills
      if (exp.skills.length) chips(c, exp.skills)
      c.y += 2
    }

    // ─── Skills ────────────────────────────────────────────────────────
    sectionTitle(c, t('skills.title'))
    for (const cat in groupedSkills.value) {
      const list = groupedSkills.value[cat]
      const value = list.map(s => s.name).join('  ·  ')
      ensurePage(c, 6)
      setFont(doc, 9, 'bold')
      setColor(doc, TEXT)
      const label = `${categoryLabel(cat)}:`
      doc.text(label, MARGIN, c.y)
      const labelW = doc.getTextWidth(label)
      setFont(doc, 9, 'normal')
      setColor(doc, MUTED)
      const wrapped = doc.splitTextToSize(value, CONTENT_W - labelW - 2) as string[]
      doc.text(wrapped[0], MARGIN + labelW + 2, c.y)
      c.y += 4.5
      for (let i = 1; i < wrapped.length; i++) {
        ensurePage(c, 4.5)
        doc.text(wrapped[i], MARGIN + labelW + 2, c.y)
        c.y += 4.5
      }
      c.y += 1
    }

    // ─── Education ─────────────────────────────────────────────────────
    sectionTitle(c, t('education.title'))
    for (const edu of education.value) {
      ensurePage(c, 8)
      setFont(doc, 10, 'bold')
      setColor(doc, TEXT)
      doc.text(edu.degree, MARGIN, c.y)
      const period = `${edu.startDate} – ${edu.finishDate ?? t('education.ongoing')}`
      const periodW = doc.getTextWidth(period)
      setFont(doc, 8.5, 'normal')
      setColor(doc, MUTED)
      doc.text(period, PAGE_W - MARGIN - periodW, c.y)
      c.y += 4.5
      setFont(doc, 9, 'normal')
      setColor(doc, MUTED)
      doc.text(edu.institution, MARGIN, c.y)
      c.y += 6
    }

    // ─── Certifications ────────────────────────────────────────────────
    sectionTitle(c, t('education.certifications_title'))
    for (const cert of certifications.value) {
      ensurePage(c, 5)
      setFont(doc, 9, 'bold')
      setColor(doc, TEXT)
      doc.text('•', MARGIN, c.y)
      doc.text(cert.title, MARGIN + 4, c.y)
      const titleW = doc.getTextWidth(cert.title)
      setFont(doc, 8.5, 'normal')
      setColor(doc, MUTED)
      doc.text(`— ${cert.issuer}`, MARGIN + 4 + titleW + 2, c.y)
      c.y += 4.5
    }

    // ─── Languages ─────────────────────────────────────────────────────
    sectionTitle(c, t('about.languages_title'))
    for (const lang of languages.value) {
      keyValueLine(c, lang.name, ` · ${lang.level}`)
    }

    // ─── Footer ────────────────────────────────────────────────────────
    const totalPages = (doc.internal as { getNumberOfPages: () => number }).getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      setFont(doc, 7.5, 'normal')
      setColor(doc, MUTED)
      const footerText = `${currentLocale.value === 'pt-BR' ? 'Gerado pelo portfolio' : 'Generated from portfolio'} · joaovsr.github.io  ·  ${i} / ${totalPages}`
      doc.text(footerText, PAGE_W / 2, PAGE_H - 8, { align: 'center' })
    }

    const filename = `Joao-Vinicius-Rodrigues-CV-${currentLocale.value === 'pt-BR' ? 'PT' : 'EN'}.pdf`
    doc.save(filename)
  }

  return { downloadCv }
}
