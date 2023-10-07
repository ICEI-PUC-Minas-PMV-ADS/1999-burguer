import { Router } from 'express';
import { LojasController, PedidosController, PedidosProdutoController, ProdutosController, UsuariosController } from '../controllers';
import { authValidator } from '../shared/middleware/AuthValidator';

const router = Router()

//Loja
router.get('/store-data/:id', authValidator, LojasController.getStoreDataValidation, LojasController.getStoreData)                         //  A API deverá fornecer um endpoint GET para retornar dados da loja
router.put('/store-data/:id', authValidator, LojasController.updateStoreByIdValidation, LojasController.updateStoreById)                   //  A API deverá fornecer um endpoint PUT para atualizar dados da loja

//Pedidos
router.get('/orders', authValidator, PedidosController.getAllPedidosValidation, PedidosController.getAllPedidos)                           //	A API deverá fornecer um endpoint GET para retornar todos os pedidos cadastrados
router.get('/order/:id', authValidator, PedidosController.getPedidoByIdValidation, PedidosController.getPedidoById)                        //  A API deverá fornecer um endpoint GET para retornar detalhes de um pedido
router.post('/order/create', authValidator, PedidosController.createPedidoValidation, PedidosController.createPedido)                      //  A API deverá fornecer um endpoint POST para criar um novo pedido
router.put('/order/:id', authValidator, PedidosController.updatePedidoByIdValidation, PedidosController.updatePedidoById)                  //  A API deverá fornecer um endpoint PUT para alterar o status do pedido

//PedidosProdutos
router.get('/order-products/:id', authValidator, PedidosProdutoController.getOrderProductsDataValidation, PedidosProdutoController.getOrderProductsData)         //  A API deverá fornecer um endpoint GET para retornar produtos de um pedido

//Produtos
router.get('/products', authValidator, ProdutosController.getAllProductValidation, ProdutosController.getAllProduct)                        //  A API deverá fornecer um endpoint GET para retornar todos os produtos cadastrados
router.get('/product/:id', authValidator, ProdutosController.getByProductByIdValidation, ProdutosController.getProductById)                 //  A API deverá fornecer um endpoint GET para retornar dados de um único produto
router.post('/product/create',authValidator, ProdutosController.createProductValidation, ProdutosController.createProduct)                  //  A API deverá fornecer um endpoint POST para criar um novo produto
router.put('/product/:id', authValidator, ProdutosController.updateProductByIdValidation, ProdutosController.updateProductById)             //  A API deverá fornecer um endpoint PUT para atualizar o produto
router.delete('/product/:id', authValidator, ProdutosController.deleteProductByIdValidation, ProdutosController.deleteProductById)          //  A API deverá fornecer um endpoint DELETE para excluir um produto

// //Usuarios
router.get('/user/:usuarioId', authValidator, UsuariosController.getUsuariosDataValidation, UsuariosController.getUsuarioData)                         //  A API deverá fornecer um endpoint GET para retornar dados do usuário
router.put('/user/:usuarioId', authValidator, UsuariosController.getUsuariosDataValidation, UsuariosController.updateUsuarioById)                         //  A API deverá fornecer um endpoint PUT para atualizar dados do usuário
router.delete('/user/:id', authValidator, UsuariosController.deleteRegisterValidationByIdValidation, UsuariosController.deleteUsuarioById)                       //  A API deverá fornecer um endpoint DELETE para excluir o registro da pessoa
router.post('/login', UsuariosController.loginValidation, UsuariosController.login)                           //  A API deverá fornecer um endpoint POST para autenticar o login do usuário
router.post('/register', UsuariosController.registerValidation, UsuariosController.register)                        //  A API deverá fornecer um endpoint POST para cadastrar um usuário no banco


export { router }