import * as Create from './Create'
import * as GetAll from './GetAll'
import * as GetById from './GetByID'

export const PedidosController = {
    ...Create,
    ...GetAll,
    ...GetById,
}
