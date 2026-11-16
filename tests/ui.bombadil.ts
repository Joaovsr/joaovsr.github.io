import { always } from '@antithesishq/bombadil'
import { actions, extract, getFingerprint } from '@antithesishq/bombadil/browser'
export * from '@antithesishq/bombadil/browser/defaults'

const layout = extract(({ document }) => ({
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  dialogOverflow: [...document.querySelectorAll('dialog[open]')].some(dialog => dialog.scrollWidth > dialog.clientWidth + 1),
}))

export const noHorizontalOverflow = always(() => layout.current.overflow <= 1)
export const noDialogOverflow = always(() => !layout.current.dialogOverflow)

// Native disclosure controls are not included in Bombadil's default clicks.
const summaries = extract(({ document }) => [...document.querySelectorAll('summary')].flatMap(summary => {
  const rect = summary.getBoundingClientRect()
  const point = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
  return document.elementFromPoint(point.x, point.y)?.closest('summary') === summary
    ? [{ fingerprint: getFingerprint(summary), point }]
    : []
}))

export const disclosures = actions(() => summaries.current.map(Click => ({ Click })))
