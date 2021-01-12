import { HotPostsController } from './HotPostsController'
import { MissingParamError } from '../errors/MissingParamError'
import { InvalidParamError } from '../errors/InvalidParamError'
import { IDateValidator } from '../protocols/IDateValidator'
import { ServerError } from '../errors/ServerError'

interface ISut {
  sut: HotPostsController
  dateValidatorStub: IDateValidator
}

const makeSut = (): ISut => {
  class DateValidatorStub implements IDateValidator {
    isValid (date: string): boolean {
      return true
    }
  }
  const dateValidatorStub = new DateValidatorStub()
  const sut = new HotPostsController(dateValidatorStub)
  return {
    dateValidatorStub,
    sut
  }
}

describe('HotPostsController', () => {
  it('Should return status code 400 if initial date is not provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        finalDate: 'final_date',
        order: 'ups'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('initialDate'))
  })

  it('Should return status code 400 if final date is not provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        initialDate: 'initial_date',
        order: 'ups'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('finalDate'))
  })

  it('Should return status code 400 if order is not provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        initialDate: 'initial_date',
        finalDate: 'final_date'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('order'))
  })

  it('Should return status code 400 if initial date is invalid', () => {
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        initialDate: 'invalid_initial_date',
        finalDate: 'final_date',
        order: 'ups'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('initialDate'))
  })

  it('Should call DateValidator with correct date', () => {
    const { sut, dateValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(dateValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        initialDate: 'any_initial_date',
        finalDate: 'final_date',
        order: 'ups'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_initial_date')
  })

  it('Should return status code 500 if DateValidator throws Error', () => {
    class DateValidatorStub implements IDateValidator {
      isValid (date: string): boolean {
        throw new Error()
      }
    }
    const dateValidatorStub = new DateValidatorStub()
    const sut = new HotPostsController(dateValidatorStub)
    const httpRequest = {
      body: {
        initialDate: 'initial_date',
        finalDate: 'final_date',
        order: 'ups'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
