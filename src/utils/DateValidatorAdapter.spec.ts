import { DateValidatorAdapter } from './DateValidatorAdapter'

describe('DateValidator Adapter', () => {
  it('Should return false if validator returns false', () => {
    const sut = new DateValidatorAdapter()
    const isValid = sut.isValid('invalid_date')
    expect(isValid).toBe(false)
  })
})
