import * as Create from './Create'
import * as DeleteById from './DeleteByID'
import * as GetAll from './GetAll'
import * as GetById from './GetByID'
import * as UpdateById from './UpdateByID'
import * as GetCardapio from './GetCardapio'

export const ProdutosController = {
    ...Create,
    ...DeleteById,
    ...GetAll,
    ...GetById,
    ...UpdateById,
    ...GetCardapio
}
