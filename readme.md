# To do list manager (TDLM)
            TDLM é um sistema in line para controle de tarefas, ou seja, utilizando 
        comandos do terminal realizamos ações na nossa lista de tarefas armazenas em um JSON.

---
### Código
Funções para facilitar algumas exibições ao usuário: 

![](./imgs/functions.png)


Ler e validar a existência do nosso arquivo usado para salvar os dados e da nossa lista: 

![](./imgs/readjson.png)


Pegar o comando e os argumentos passados: 

![](./imgs/getargs.png)


Switch case para podermos atribuir um comportamento diferente para cada comando passado: 

![](./imgs/swtich.png)


Funcionamento do 'add': 

![](./imgs/add.png)


Funcionamento do 'remove': 

![](./imgs/remove.png)


Funcionamento do 'finish': 

![](./imgs/finish.png)


Funcionamento do 'pending': 

![](./imgs/pending.png)


Funcionamento do 'list': 

![](./imgs/list.png)


Funcionamento do 'listpending': 

![](./imgs/listpending.png)


Funcionamento do 'listfinished': 

![](./imgs/listfinished.png)


Caso insira um comando inválido: 

![](./imgs/default.png)


Salva o valor no json: 

![](./imgs/savejson.png)





---
        
### Comandos
Adicionar uma nova tarefa:
> **node ./tdlm.js**  add  [TITULO] [DESCRICAO]

Remover uma tarefa indesejada ou incorreta
> **node ./tdlm.js**  remove [TITULO] | [UUID]

Listar todas as tarefas
> **node ./tdlm.js**  list

Definir uma tarefa como finalizada
> **node ./tdlm.js** finish [UUID] | [TITLE]

Definir uma tarefa como pendente
> **node ./tdlm.js** pending [UUID] | [TITLE]

Listar as tarefas finalizadas
> **node ./tdlm.js**  listfinished

Listar as tarefas pendentes
> **node ./tdlm.js**  listpending



Feito por: [@ClCaldd](https://github.com/ClCaldd)
