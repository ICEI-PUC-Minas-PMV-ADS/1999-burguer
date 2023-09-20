import * as Count from './Count'
import * as Create from './Create'
import * as DeleteById from './DeleteByID'
import * as GetAll from './GetAll'
import * as GetById from './GetByID'
import * as UpdateById from './UpdateByID'

export const ProdutosProvider = {
    ...Count,
    ...Create,
    ...DeleteById,
    ...GetAll,
    ...GetById,
    ...UpdateById,
}
