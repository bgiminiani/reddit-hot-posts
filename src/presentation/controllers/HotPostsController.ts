import { IHttpRequest, IHttpResponse } from '../protocols/IHttp'

export class HotPostsController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    if (!httpRequest.body.initialDate) {
      return {
        statusCode: 400,
        body: new Error('Missing param: initialDate')
      }
    }

    if (!httpRequest.body.finalDate) {
      return {
        statusCode: 400,
        body: new Error('Missing param: finalDate')
      }
    }
  }
}
