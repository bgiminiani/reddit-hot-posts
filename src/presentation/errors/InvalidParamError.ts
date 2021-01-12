export class InvalidParamError extends Error {
  constructor (private readonly paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
