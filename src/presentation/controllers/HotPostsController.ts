import { IHttpRequest, IHttpResponse, IController, IDateValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/HttpHelper'

export class HotPostsController implements IController {
  constructor (private readonly dateValidator: IDateValidator) {}

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredParams = ['initialDate', 'finalDate', 'order']
      for (const param of requiredParams) {
        if (!httpRequest.body[param]) {
          return badRequest(new MissingParamError(param))
        }
      }

      const { initialDate, finalDate } = httpRequest.body
      const dateIsValid = this.dateValidator.isValid(initialDate)
      if (!dateIsValid) {
        return badRequest(new InvalidParamError('initialDate'))
      }
      if (!finalDate) {
        return badRequest(new InvalidParamError('finalDate'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
