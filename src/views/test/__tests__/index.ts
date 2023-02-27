// import {describe, expect, test} from '@jest/globals';
import { invoices, statement } from '../sum';

describe('happy path', () => {
  test('statement 函数重构', () => {
    expect(statement(invoices[0])).toMatchSnapshot();
  });
});