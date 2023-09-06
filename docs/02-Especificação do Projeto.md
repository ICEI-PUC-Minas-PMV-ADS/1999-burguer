# Especificações do Projeto

A escolha do referido problema foi definida por meio de discussões e estudos realizados pelos membros da equipe e a gestão da hamburgueria. Os detalhes levantados nesse processo foram consolidados na forma de personas e histórias de clientes.

## Personas

### 1999 burguer:

![persona1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/62437952/ed6c49b1-0f6b-4564-93e1-74f084d5b9d0)

### Clientes da 1999 Burguer:

![persona2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/62437952/df77e91f-ae6d-4f34-a620-a26a0e4490fd)

![persona3](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/62437952/968c5886-8013-4989-b284-62cbbde759f0)

![persona4](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/62437952/2367da6e-bbf6-40b3-ba7e-250c1d3b799e)

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

| EU COMO... | QUERO/PRECISO ...                                                     | PARA ...                                              |
| ---------- | --------------------------------------------------------------------- | ----------------------------------------------------- |
| Pedro      | Preciso de uma plataforma onde consigo fazer os controles dos pedidos | Aumentar meu faturamento e crescer meu negócio.      |
| Ana        | Preciso de uma plataforma que facilite os pedidos de lanches          | para melhorar as sextas do lanche que realizo         |
| João      | Preciso de um aplicativo que não demore para fazer pedidos           | para não atraplhar as noites de jogatina com os meus |
| Geneci     | Quero um aplicativo que seja fácil de mexer                          | Pedir lanches durante os jogos                        |

## Modelagem do Processo de Negócio

### Análise da Situação Atual

Apresente aqui os problemas existentes que viabilizam sua proposta. Apresente o modelo do sistema como ele funciona hoje. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que o seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional.

### Descrição Geral da Proposta

Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias.

### Processo 1 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 1. Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN.

![Processo 1](img/02-bpmn-proc1.png)

### Processo 2 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 2. Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![Processo 2](img/02-bpmn-proc2.png)

## Indicadores de Desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores.

Usar o seguinte modelo:

![Indicadores de Desempenho](img/02-indic-desemp.png)
Obs.: todas as informações para gerar os indicadores devem estar no diagrama de classe a ser apresentado a posteriori.

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

#### Requisitos Funcionais Aplicação WEB

| ID     | Descrição do Requisito                                                                                                                                                                          | Prioridade |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| RF-001 | O sistema deverá conter uma tela de login para que o dono do estabelecimento realize o acesso ao sistema                                                                                         | ALTA       |
| RF-002 | O sistema deverá ter uma home na qual o usuário terá acesso a uma tela de pedidos e um menu de navegação para outras páginas                                                                | ALTA       |
| RF-003 | O menu deverá permitir o usuário navegar entre as seguintes telas: pedidos, gerenciar cardápio, histórico de pedidos, meu perfil                                                              | ALTA       |
| RF-004 | A tela de pedidos será composta por uma listagem de pedidos feitos pelo APP organizados em blocos e com informações como ticket do pedido, lanche, valor                                       | ALTA       |
| RF-005 | A tela de pedidos terá os botões 'pendente' e 'em andamento', cada um deles exibirá os pedidos com seu respectivo status                                                                       | ALTA       |
| RF-006 | Os blocos de pedidos em andamento terão um botão de concluído, para enviar o pedido ao histórico e ao cliente                                                                                 | ALTA       |
| RF-007 | A tela de gerenciar cardápio deverá exibir o cardápio da loja em lista                                                                                                                         | ALTA       |
| RF-008 | Na tela de gerenciar cardápio é necessário haver um botão de acrescentar novo item, encaminhando para uma página de cadastro.                                                                | ALTA       |
| RF-009 | A página de cadastro deve permitir criar um produto com nome, imagem, descrição e preço. Deve haver um botão de públicar o ítem                                                            | ALTA       |
| RF-010 | O item gerado deverá conter as opções de: editar, excluir e disponibilizar                                                                                                                     | ALTA       |
| RF-011 | A tela de histórico de pedidos deverá exibir uma lista em blocos com o nome do cliente, endereço, telefone, ticket do pedido, o que pediu e valor da compra, status concluido e data do pedido | ALTA       |
| RF-012 | Deve ser possível inciar o pedido ou cancelar na própria tela de pedidos pendentes na home                                                                                                      | ALTA       |
| RF-013 | O usuário deverá conseguir editar seus dados no sistema                                                                                                                                         | ALTA       |
| RF-014 | Ao clicar em editar, o sistema deverá permitir que o usuário altere as informações desejadas no produto                                                                                       | ALTA       |

#### Requisitos Funcionais API

| ID     | Descrição do Requisito                                                                            | Prioridade |
| ------ | --------------------------------------------------------------------------------------------------- | ---------- |
| RF-015 | A API deverá fornecer um endpoint GET para retornar todos os produtos cadastrados                  | ALTA       |
| RF-016 | A API deverá fornecer um endpoint GET para retornar dados de um único produto                     | ALTA       |
| RF-017 | A API deverá fornecer um endpoint POST para criar um novo produto                                  | ALTA       |
| RF-018 | A API deverá fornecer um endpoint PUT para atualizar o produto                                     | ALTA       |
| RF-019 | A API deverá fornecer um endpoint DELETE para excluir um produto                                   | ALTA       |
| RF-020 | A API deverá fornecer um endpoint GET para retornar todos os pedidos cadastrados                   | ALTA       |
| RF-021 | A API deverá fornecer um endpoint GET para retornar detalhes de um pedido                          | ALTA       |
| RF-022 | A API deverá fornecer um endpoint POST para criar um novo pedido                                   | ALTA       |
| RF-023 | A API deverá fornecer um endpoint GET para retornar todos os produtos com status iguais            | ALTA       |
| RF-024 | A API deverá fornecer um endpoint PUT para alterar o status do pedido                             | ALTA       |
| RF-025 | A API deverá fornecer um endpoint GET para retornar dados do usuário                              | ALTA       |
| RF-026 | A API deverá fornecer um endpoint PUT para atualizar dados do usuário                             | ALTA       |
| RF-027 | A API deverá fornecer um endpoint POST para inserir os dados básicos para realização do pedido | ALTA       |
| RF-028 | A API deverá fornecer um endpoint DELETE para excluir o registro da pessoa                        | ALTA       |
| RF-029 | A API deverá fornecer um endpoint POST para autenticar o login do usuário                        | ALTA       |
| RF-030 | A API deverá fornecer um endpoint POST para cadastrar um usuário no banco                        | ALTA       |

#### Requisitos Funcionais Aplicação Mobile

| ID     | Descrição do Requisito         | Prioridade |
| ------ | ------------------------------ | ---------- |
| RF-031 | INSERIR REQUISITO              | MÉDIA |
| RF-032 | INSERIR REQUISITO              | MÉDIA |
| RF-033 | INSERIR REQUISITO              | MÉDIA |
| RF-034 | INSERIR REQUISITO              | MÉDIA |
| RF-035 | INSERIR REQUISITO              | MÉDIA |
| RF-036 | INSERIR REQUISITO              | MÉDIA |
| RF-037 | INSERIR REQUISITO              | MÉDIA |
| RF-038 | INSERIR REQUISITO              | MÉDIA |
| RF-039 | INSERIR REQUISITO              | MÉDIA |


### Requisitos Não Funcionais

| ID      | Descrição do Requisito         | Prioridade |
| ------- | -------------------------------- | ---------- |
| RNF-001 | INSERIR REQUISITO NÃO FUNCIONAL | ALTA       |
| RNF-002 | INSERIR REQUISITO NÃO FUNCIONAL | MÉDIA     |
| RNF-003 | INSERIR REQUISITO NÃO FUNCIONAL | ALTA       |
| RNF-004 | INSERIR REQUISITO NÃO FUNCIONAL | MÉDIA     |
| RNF-005 | INSERIR REQUISITO NÃO FUNCIONAL | ALTA       |
| RNF-006 | INSERIR REQUISITO NÃO FUNCIONAL | MÉDIA     |
| RNF-007 | INSERIR REQUISITO NÃO FUNCIONAL | ALTA       |
| RNF-008 | INSERIR REQUISITO NÃO FUNCIONAL | MÉDIA     |
| RNF-009 | INSERIR REQUISIT NÃO FUNCIONAL  | ALTA       |
| RNF-010 | INSERIR REQUISITO NÃO FUNCIONAL | MÉDIA     |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID | Restrição                                             |
| -- | ------------------------------------------------------- |
| 01 | O projeto deverá ser entregue até o final do semestre |
| 02 | Não pode ser desenvolvido um módulo de backend        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos.

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
>
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio.

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura meramente ilustrativa apresentada a seguir.

![Exemplo de matriz de rastreabilidade](img/02-matriz-rastreabilidade.png)

> **Links Úteis**:
>
> - [Artigo Engenharia de Software 13 - Rastreabilidade](https://www.devmedia.com.br/artigo-engenharia-de-software-13-rastreabilidade/12822/)
> - [Verificação da rastreabilidade de requisitos usando a integração do IBM Rational RequisitePro e do IBM ClearQuest Test Manager](https://developer.ibm.com/br/tutorials/requirementstraceabilityverificationusingrrpandcctm/)
> - [IBM Engineering Lifecycle Optimization – Publishing](https://www.ibm.com/br-pt/products/engineering-lifecycle-optimization/publishing/)

# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicação, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos, um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque.

É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu ampliar o escopo de um projeto eu posso afetar seu cronograma e seus custos.


## Gerenciamento de Cronograma

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![cronograma-1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/103429022/b44ec2a1-d3ba-46e4-ab03-41e08ae00705)
![cronograma-2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/103429022/ee4401bf-16d2-4d47-a080-92e78405b970)

## Gerenciamento de Custos

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo

![custos](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/103429022/dc1901f2-2b3b-4e48-aa81-62ff2c5305af)

## Gerenciamento de Pessoal

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados.

![equipe](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/103429022/ffad668d-31b3-4d37-8c9b-5a6fef4bb921)
