import * as DeleteById from './DeleteByID'
import * as GetData from './GetData'
import * as Login from './Login'
import * as Register from './Register'
import * as UpdateById from './UpdateByID'

export const UsuariosProvider = {
    ...DeleteById,
    ...GetData,
    ...Login,
    ...Register,
    ...UpdateById,
}
