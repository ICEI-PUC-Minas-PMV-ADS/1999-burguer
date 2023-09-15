import * as Count from './Count'
import * as Create from './Create'
import * as GetAll from './GetAll'
import * as GetById from './GetByID'
import * as UpdateById from './UpdateByID'

export const PedidosController = {
    ...Count,
    ...Create,
    ...GetAll,
    ...GetById,
    ...UpdateById,
}
