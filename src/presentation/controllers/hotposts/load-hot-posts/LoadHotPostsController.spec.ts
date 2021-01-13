import { LoadHotPostsController } from './LoadHotPostsController'
import { MissingParamError, InvalidParamError, ServerError } from '../../../errors'
import { IDateValidator, IOrderValidator } from './protocols'

interface ISut {
  sut: LoadHotPostsController
  dateValidatorStub: IDateValidator
  orderValidatorStub: IOrderValidator
}

const makeDateValidator = (): IDateValidator => {
  class DateValidatorStub implements IDateValidator {
    isValid (date: string): boolean {
      return true
    }
  }
  return new DateValidatorStub()
}

const makeOrderValidator = (): IOrderValidator => {
  class OrderValidatorStub implements IOrderValidator {
    isValid (date: string): boolean {
      return true
    }
  }
  return new OrderValidatorStub()
}

const makeSut = (): ISut => {
  const dateValidatorStub = makeDateValidator()
  const orderValidatorStub = makeOrderValidator()
  const sut = new LoadHotPostsController(dateValidatorStub, orderValidatorStub)
  return {
    dateValidatorStub,
    orderValidatorStub,
    sut
  }
}

describe('LoadHotPostsController', () => {
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
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub, 'isValid').mockImplementation(() => {
      throw new Error()
    })
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

  it('Should return status code 400 if order is invalid', () => {
    const { sut, orderValidatorStub } = makeSut()
    jest.spyOn(orderValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        initialDate: 'invalid_initial_date',
        finalDate: 'final_date',
        order: 'ups'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('order'))
  })
})
