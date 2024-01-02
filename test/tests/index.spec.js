import { it, expect, describe } from 'vitest'
import { countWords } from '../index.js'

describe('map', () => {
  it('example 1', () => {
    const words1 = ['leetcode', 'is', 'amazing', 'as', 'is']
    const words2 = ['amazing', 'leetcode', 'is']
    const ret = countWords(words1, words2)
    expect(ret).toBe(2)
  })

  it('example 2', () => {
    const words1 = ['b', 'bb', 'bbb']
    const words2 = ['a', 'aa', 'aaa']
    const ret = countWords(words1, words2)
    expect(ret).toBe(0)
  })
  it('example 3', () => {
    const words1 = ['a', 'ab']
    const words2 = ['a', 'a', 'a', 'ab']
    const ret = countWords(words1, words2)
    expect(ret).toBe(1)
  })
})
