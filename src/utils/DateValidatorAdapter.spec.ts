import validator from 'validator'
import { DateValidatorAdapter } from './DateValidatorAdapter'

jest.mock('validator', () => ({
  isDate (): boolean {
    return true
  }
}))

const makeSut = (): DateValidatorAdapter => {
  return new DateValidatorAdapter()
}

describe('DateValidator Adapter', () => {
  it('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isDate').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_date')
    expect(isValid).toBe(false)
  })

  it('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_date')
    expect(isValid).toBe(true)
  })

  it('Should call validator with correct date', () => {
    const sut = makeSut()
    const isDateSpy = jest.spyOn(validator, 'isDate')
    sut.isValid('2018-10-03 03:48:21')
    expect(isDateSpy).toHaveBeenCalledWith('2018-10-03 03:48:21')
  })
})
