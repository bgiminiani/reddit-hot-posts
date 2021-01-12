import { IHttpRequest, IHttpResponse } from '../protocols/IHttp'
import { MissingParamError } from '../errors/MissingParamError'

export class HotPostsController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    if (!httpRequest.body.initialDate) {
      return {
        statusCode: 400,
        body: new MissingParamError('initialDate')
      }
    }

    if (!httpRequest.body.finalDate) {
      return {
        statusCode: 400,
        body: new MissingParamError('finalDate')
      }
    }
  }
}
