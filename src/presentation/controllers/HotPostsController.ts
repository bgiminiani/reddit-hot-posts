import { IHttpRequest, IHttpResponse } from '../protocols/IHttp'
import { MissingParamError } from '../errors/MissingParamError'
import { badRequest } from '../helpers/HttpHelper'

export class HotPostsController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    if (!httpRequest.body.initialDate) {
      return badRequest(new MissingParamError('initialDate'))
    }

    if (!httpRequest.body.finalDate) {
      return badRequest(new MissingParamError('finalDate'))
    }
  }
}
