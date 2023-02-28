import { call } from '../this'

describe('this', () => {
  test('call', () => {
    const fn = function() {
      console.log(this, 'fn')
    }
    call()
    expect(fn.xcall()).toMatchSnapshot()
  })
})
