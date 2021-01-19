import validator from 'validator'
import { IDateValidator } from '../presentation/protocols/IDateValidator'

export class DateValidatorAdapter implements IDateValidator {
  isValid (date: string): boolean {
    return validator.isDate(date)
  }
}
