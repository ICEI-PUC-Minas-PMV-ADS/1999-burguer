import * as DeleteById from './DeleteByID'
import * as GetData from './GetData'
import * as Login from './Login'
import * as Register from './Register'
import * as UpdateById from './UpdateByID'
import * as ForgotPassword from './ForgotPassword'
import * as ResetPassword from './ResetPassword'

export const UsuariosController = {
    ...DeleteById,
    ...GetData,
    ...Login,
    ...Register,
    ...UpdateById,
    ...ForgotPassword,
    ...ResetPassword
}
