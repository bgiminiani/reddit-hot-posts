import { DateValidatorAdapter } from './DateValidatorAdapter'

describe('DateValidator Adapter', () => {
  it('Should return false if validator returns false', () => {
    const sut = new DateValidatorAdapter()
    const isValid = sut.isValid('00/1/00')
    expect(isValid).toBe(false)
  })
})
