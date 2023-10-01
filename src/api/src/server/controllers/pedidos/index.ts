import * as Create from './Create'
import * as GetAll from './GetAll'
import * as GetById from './GetByID'
import * as UpdateById from './UpdateByID'

export const PedidosController = {
    ...Create,
    ...GetAll,
    ...GetById,
    ...UpdateById
}
