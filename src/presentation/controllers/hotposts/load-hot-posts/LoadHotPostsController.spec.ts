import MockDate from 'mockdate'
import { LoadHotPostsController } from './LoadHotPostsController'
import { MissingParamError, InvalidParamError, ServerError } from '../../../errors'
import { IDateValidator, IOrderValidator } from './protocols'
import { IHotPostsParam, ILoadHotPosts } from '../../../../domain/usecases/ILoadHotPosts'
import { IHotPost } from '../../../../domain/models/IHotPost'

interface ISut {
  sut: LoadHotPostsController
  dateValidatorStub: IDateValidator
  orderValidatorStub: IOrderValidator
  loadHotPostsStub: ILoadHotPosts
}

const makeLoadHotPosts = (): ILoadHotPosts => {
  class LoadHotPostsStub implements ILoadHotPosts {
    load (hotPostsParam: IHotPostsParam): IHotPost[] {
      const fakeHotPosts = [
        {
          id: '39bf55ee-e55c-40e1-9539-d57d2bf53eed',
          postTitle: 'Welcome to /r/artificial!',
          authorName: 't2_3dncp',
          authorFullName: 'CyberByte',
          creationDate: new Date(),
          numberOfUps: 130,
          numberOfComments: 16
        },
        {
          id: '3007c85a-d708-43ca-ba5d-8738052ccbd1',
          postTitle: 'Google AI Introduces ToTTo: A Controlled Table-to-Text Generation Dataset Using Novel Annotation Process',
          authorName: 't2_2wsvqwhg',
          authorFullName: 'ai-lover',
          creationDate: new Date(),
          numberOfUps: 23,
          numberOfComments: 1
        }
      ]
      return fakeHotPosts
    }
  }
  return new LoadHotPostsStub()
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
  const loadHotPostsStub = makeLoadHotPosts()
  const sut = new LoadHotPostsController(dateValidatorStub, orderValidatorStub, loadHotPostsStub)
  return {
    sut,
    dateValidatorStub,
    orderValidatorStub,
    loadHotPostsStub
  }
}

describe('LoadHotPostsController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should return status code 400 if initial date is not provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        finalDate: 'final_date',
        orderBy: 'ups'
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
        orderBy: 'ups'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('finalDate'))
  })

  it('Should return status code 400 if orderBy is not provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        initialDate: 'initial_date',
        finalDate: 'final_date'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('orderBy'))
  })

  it('Should return status code 400 if initial date is invalid', () => {
    const { sut, dateValidatorStub } = makeSut()
    jest.spyOn(dateValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        initialDate: 'invalid_initial_date',
        finalDate: 'final_date',
        orderBy: 'ups'
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
        orderBy: 'ups'
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
        orderBy: 'ups'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('Should return status code 400 if orderBy is invalid', () => {
    const { sut, orderValidatorStub } = makeSut()
    jest.spyOn(orderValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        initialDate: 'invalid_initial_date',
        finalDate: 'final_date',
        orderBy: 'ups'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('orderBy'))
  })

  it('Should call LoadHotPosts with correct values', () => {
    const { sut, loadHotPostsStub } = makeSut()
    const loadSpy = jest.spyOn(loadHotPostsStub, 'load')
    const httpRequest = {
      body: {
        initialDate: 'valid_initial_date',
        finalDate: 'valid_final_date',
        orderBy: 'valid_order'
      }
    }
    sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith({
      initialDate: 'valid_initial_date',
      finalDate: 'valid_final_date',
      orderBy: 'valid_order'
    })
  })

  it('Should return status code 500 if LoadHotPosts throws Error', () => {
    const { sut, loadHotPostsStub } = makeSut()
    jest.spyOn(loadHotPostsStub, 'load').mockImplementation(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        initialDate: 'initial_date',
        finalDate: 'final_date',
        orderBy: 'ups'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
