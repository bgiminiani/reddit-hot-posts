import { IDateValidator } from '../presentation/controllers/hotposts/load-hot-posts/protocols/IDateValidator'
export class DateValidatorAdapter implements IDateValidator {
  isValid (date: string): boolean {
    return false
  }
}
