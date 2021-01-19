import validator from 'validator'
import { DateValidatorAdapter } from './DateValidatorAdapter'

jest.mock('validator', () => ({
  isDate (): boolean {
    return true
  }
}))

describe('DateValidator Adapter', () => {
  it('Should return false if validator returns false', () => {
    const sut = new DateValidatorAdapter()
    jest.spyOn(validator, 'isDate').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_date')
    expect(isValid).toBe(false)
  })

  it('Should return true if validator returns true', () => {
    const sut = new DateValidatorAdapter()
    const isValid = sut.isValid('valid_date')
    expect(isValid).toBe(true)
  })
})
