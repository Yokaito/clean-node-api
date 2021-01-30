import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('any_field')
}

describe('RequiredField Validation', () => {
  test('should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ other_field: 'other_field' })

    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('should not return if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'other_field' })

    expect(error).toBeFalsy()
  })
})
