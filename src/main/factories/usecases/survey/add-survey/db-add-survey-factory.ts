import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/survey-mongo-repository'
import { AddSurvey } from '../../../../../domain/usecases/add-survey'
import { DbAddSurvey } from '../../../../../data/usecases/add-survey/db-add-survey'

export const makeDbAddSurvey = (): AddSurvey => {
  const accountMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(accountMongoRepository)
}
