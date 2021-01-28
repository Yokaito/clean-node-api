import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys, SurveyModel } from './load-surveys-protocols'
import { ok } from '../../../helpers/http/http-helper'
import MockDate from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  },{
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }]
}

interface SutTypes {
  sut: LoadSurveysController
  loadSurveyStub: LoadSurveys
}

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveyStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }

  return new LoadSurveyStub()
}

const makeSut = (): SutTypes => {
  const loadSurveyStub = makeLoadSurveys()
  const sut = new LoadSurveysController(loadSurveyStub)
  return { sut , loadSurveyStub }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSurveys ', async () => {
    const { sut, loadSurveyStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeSurveys()))
  })
})
