# Plano de Testes de Software

Assim como nas outras partes do projeto, o plano de testes será separado por aplicação entregue durante as etapas do projeto.

## Plano de testes API

Para realizarmos os testes na API criamos uma estrutura que facilita a nossa entrega, em que há uma estrutura de testes unitários responsáveis por validar todos os endpoints, controllers e providers em um ambiente específico.

Esse ambiente foi todo configurado através do docker, assim, simulamos um ambiente de produção localmente e o deploy só ocorrerá caso os testes passem com sucesso.

Os testes estão sendo desenvolvidos utilizando o framework Jest, ótimo para realizar testes de unidade/integração em JavaScript. A estrutura do teste sempre vai ser um Describe (Switch de testes) e It (Casos de teste). Buscamos priorizar os "Caminhos felizes" e também tratamos algumas exceções que foram determinadas na criação dos controllers.

Os testes rodam num ambiente Docker, onde temos um banco de dados virtual. 

Com este setup conseguimos preparar tudo antes de realizar o deploy. Assim, os testes validam tudo que precisamos ao invés de fazer essas ações em produção.

![CTAPI1](./img/CT1-1.png)
![CTAPI2](./img/CT1-2.png)
![CTAPI3](./img/CT1-3.png)
![CTAPI4](./img/CT1-4.png)
![CTAPI5](./img/CT1-5.png)

## Plano de testes FrontEnd

Os testes de FrontEnd foram testes funcionais e manuais, de forma a verificarmos a funcionalidade do que foi criado. 

O objetivo foi verificar as ações realizadas e como elas afetariam a autenticação e o banco de dados, uma vez que as telas foram montadas, na parte de exibição de dados, cadastro e etc com consulta direta na API desenvolvida.


![CTFRONT1](./img/ct01-front.png)
![CTFRONT2](./img/ct02-front.png)
![CTFRONT3](./img/ct03-front.png)
![CTFRONT4](./img/ct04-front.png)
![CTFRONT5](./img/ct05-front.png)
![CTFRONT6](./img/ct16frontend.png)



## Plano de Teste Aplicação Mobile

Os testes da aplicação mobile foram testes funcionais e manuais, onde validamos o que foi proposto nos requistos funcionais.
Dessa forma será possível garantir a confiabilidade e qualidade da aplicação.

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/103429022/8ba743e6-0751-4aa1-b3c7-5e6e50c2825d)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/103429022/a2f4bf85-2c5f-48c7-9e4b-6a3257d26997)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/103429022/1d97b668-e430-45aa-8055-e8a7956a03f5)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/103429022/5a60be5e-e47b-45bc-98e4-ef0a3670155c)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/103429022/320d2aa2-abad-4527-887b-24164910bc61)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/103429022/c43d0684-4c85-4228-bdb1-1983f995adfa)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/103429022/e0b7b9e7-c274-4150-be6f-179ef1785c3a)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/103429022/e157df54-4b4c-45fa-8898-4164b4b13fd4)
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-dad-t3-1999-burguer/assets/103429022/2a212262-f374-437b-adca-1c44708d288f)
