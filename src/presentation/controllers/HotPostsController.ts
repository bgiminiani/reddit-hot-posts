export class HotPostsController {
  handle (httpRequest: any): any {
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
