import { Router } from 'express';
import { LojasController } from '../controllers';

const router = Router()

//Loja
router.get('/store-data/:id', LojasController.getStoreDataValidation, LojasController.getStoreData)                         //  A API deverá fornecer um endpoint GET para retornar dados da loja
router.put('/store-data/:id', LojasController.updateStoreByIdValidation, LojasController.updateStoreById)                   //  A API deverá fornecer um endpoint PUT para atualizar dados da loja

//Pedidos
router.get('/order/:id')                        //  A API deverá fornecer um endpoint GET para retornar detalhes de um pedido
router.get('/orders')                           //	A API deverá fornecer um endpoint GET para retornar todos os pedidos cadastrados
router.post('/order/create')                    //  A API deverá fornecer um endpoint POST para criar um novo pedido
router.put('/order/:id')                        //  A API deverá fornecer um endpoint PUT para alterar o status do pedido
router.post('/order/:id')                       //  A API deverá fornecer um endpoint POST para inserir os dados básicos para realização do pedido

//PedidosProdutos
router.get('/order-products/:order-id')         //  A API deverá fornecer um endpoint GET para retornar produtos de um pedido

//Produtos
router.get('/products')                         //  A API deverá fornecer um endpoint GET para retornar todos os produtos cadastrados
router.get('/product/:id')                      //  A API deverá fornecer um endpoint GET para retornar dados de um único produto
router.get('/products/:status')                 //  A API deverá fornecer um endpoint GET para retornar todos os produtos com status iguais
router.post('/product/create')                  //  A API deverá fornecer um endpoint POST para criar um novo produto
router.put('/product/:id')                      //  A API deverá fornecer um endpoint PUT para atualizar o produto
router.delete('/product/:id')                   //  A API deverá fornecer um endpoint DELETE para excluir um produto

//Usuarios
router.get('/user/:id')                         //  A API deverá fornecer um endpoint GET para retornar dados do usuário
router.put('/user/:id')                         //  A API deverá fornecer um endpoint PUT para atualizar dados do usuário
router.delete('/user:id')                       //  A API deverá fornecer um endpoint DELETE para excluir o registro da pessoa
router.post('/login')                           //  A API deverá fornecer um endpoint POST para autenticar o login do usuário
router.post('/register')                        //  A API deverá fornecer um endpoint POST para cadastrar um usuário no banco


export { router }