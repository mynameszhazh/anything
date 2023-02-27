// import {describe, expect, test} from '@jest/globals';
import { statement } from '../sum';

describe('happy path', () => {
  let plays = {
    hamlet: { name: 'Hamlet', type: 'tragedy' },
    'as-like': { name: 'As You Like It', type: 'comedy' },
    othello: { name: 'Othello', type: 'tragedy' }
  }
  let invoices = [
    {
      customer: 'BigCo',
      performances: [
        {
          playID: 'hamlet',
          audience: 55
        },
        {
          playID: 'as-like',
          audience: 35
        },
        {
          playID: 'othello',
          audience: 40
        }
      ]
    }
  ]
  test('statement 函数重构', () => {
    expect(statement(invoices[0], plays)).toMatchSnapshot();
  });
});