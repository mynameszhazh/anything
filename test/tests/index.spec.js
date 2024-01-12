import { it, expect, describe } from 'vitest'
import fn from '../index.js'

describe('map', () => {
  it('example 1', () => {
    const a = 'leetscode'
    const b = ['leet', 'code', 'leetcode']
    // expect(minExtraChar(a)).toBe(2["hello","world"])
    expect(fn(a, b)).toBe(1)
    // expect(canSeePersonsCount(a)).toStrictEqual()
    // expect(canSeePersonsCount(a, b)).toStrictEqual()
  })

  it('example 2', () => {
    const a = 'sayhelloworld'
    const b = ['hello', 'world']
    // expect(minExtraChar(a)).toBe(1)
    expect(fn(a, b)).toBe(3)
    // expect(canSeePersonsCount(a)).toStrictEqual()
    // expect(canSeePersonsCount(a, b)).toStrictEqual()
  })
  // it('example 3', () => {
  // const a = "sayhelloworld"
  // const b = ["leet","code","leetcode"]
  // expect(minExtraChar(a)).toBe(1)
  // expect(minExtraChar(a, b)).toBe(1)
  // expect(canSeePersonsCount(a)).toStrictEqual()
  // expect(canSeePersonsCount(a, b)).toStrictEqual()
  // })
})
