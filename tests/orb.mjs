import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

const source = readFileSync(new URL('../src/utils/createOrbScene.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 }
})
const code = outputText.replace("from 'three'", 'from ' + JSON.stringify(import.meta.resolve('three')))
const { createOrbModel, disposeOrbModel } = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'))
const model = createOrbModel()
const geometries = new Set()
const materials = new Set()
const pointClouds = []
model.group.traverse(object => {
  if (!object.geometry) return
  geometries.add(object.geometry)
  for (const value of object.geometry.getAttribute('position').array) assert.ok(Number.isFinite(value), 'Geometry must contain valid coordinates')
  for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material)
  if (object.isPoints) pointClouds.push(object.geometry.getAttribute('position').count)
})
assert.ok(pointClouds.length >= 2 && pointClouds.every(count => count > 0), 'The network and surrounding particles are present')
assert.equal(model.orbits.length, 2)
assert.notEqual(model.orbits[0].orbit.rotation.x, model.orbits[1].orbit.rotation.x, 'Orbits occupy different planes')
let disposedGeometries = 0
let disposedMaterials = 0
for (const geometry of geometries) geometry.addEventListener('dispose', () => disposedGeometries++)
for (const material of materials) material.addEventListener('dispose', () => disposedMaterials++)
disposeOrbModel(model.group)
assert.equal(disposedGeometries, geometries.size, 'Every GPU geometry is released once, including shared geometry')
assert.equal(disposedMaterials, materials.size, 'Every GPU material is released once')
console.log('Three.js checked: valid scene geometry, separate orbital planes and GPU resource cleanup.')
