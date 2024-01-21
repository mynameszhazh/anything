import { it, expect, describe } from 'vitest'
import fn from '../index.js'

describe('map', () => {
  it('example 1', () => {
    const a = 'zzzzdddd'
    const b = 2
    // expect(fn(a)).toBe(2["hello","world"])
    expect(fn(a, b)).toBe('zzdzzdd')
    // expect(fn(a)).toStrictEqual()
    // expect(fn(a, b)).toStrictEqual()
  })

  it('example 2', () => {
    const a = "cczazcc"
    const b = 3
    // expect(fn(a)).toBe(1)
    expect(fn(a, b)).toBe('zzcccac')
    // expect(fn(a)).toStrictEqual()
    // expect(fn(a, b)).toStrictEqual()
  })

  it('example 3', () => {
    const a = "aababab"
    const b = 2
    // expect(fn(a)).toBe(1)
    expect(fn(a, b)).toBe('bbabaa')
    // expect(fn(a)).toStrictEqual()
    // expect(fn(a, b)).toStrictEqual()
  })
})
