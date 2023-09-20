import * as Create from './Create'
import * as DeleteById from './DeleteByID'
import * as GetAll from './GetAll'
import * as GetById from './GetByID'
import * as GetByStatus from './GetByStatus'
import * as UpdateById from './UpdateByID'

export const ProdutosController = {
    ...Create,
    ...DeleteById,
    ...GetAll,
    ...GetById,
    ...GetByStatus,
    ...UpdateById,
}
