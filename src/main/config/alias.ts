import moduleAlias from 'module-alias'
import path from 'path'

export default (local: string): void => {
  moduleAlias.addAlias('@', path.join(__dirname, '..', '..', '..', local))
}
