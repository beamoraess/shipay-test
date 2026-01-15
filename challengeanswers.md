# Shipay Front-End Engineer Challenge

Este repositório contém a resolução do desafio técnico para a vaga de Front-End Engineer na Shipay.  
As respostas estão organizadas por seção para facilitar a avaliação.

---

## 1. Filtro de itens por texto (React SPA)

### Enunciado

1.- Você recebeu uma atividade para adicionar uma funcionalidade em uma página SPA React simples que lista uma coleção de itens (os produtos transacionais da Shipay). Sua tarefa é implementar a seguinte funcionalidade:

**Funcionalidade a ser desenvolvida:** Filtro de itens por texto.

**Requisitos:**

    a. Adicione um campo de input de texto na tela onde a lista é exibida;
    b. À medida que o usuário digita nesse campo, a lista de itens deve ser filtrada dinamicamente para exibir apenas os itens cujo nome/título contenha o texto digitado;
    c. A filtragem deve ser case-insensitive (ignorar maiúsculas/minúsculas);
    d. Mantenha a estrutura de componentes existente, criando novos componentes se julgar necessário;
    e. Preocupe-se com a clareza do código, boas práticas de React (uso de estado, props, hooks como ```useState``` e ```useEffect``` de forma apropriada) e componentização;

### Resolução

Neste repositório, a implementação se encontra na pasta **shipay-filter**.

A aplicação pode ser acessada no link do Netlify:  
https://shipay-filter.netlify.app/

---

## 2. Avaliação de Pull Request

### Enunciado

2- Seu colega solicitou a avaliação de uma Pull Request para que ele possa seguir com o deploy para os testes em Sandbox. Por favor, avalie a PR e faça as ponderações pertinentes, se necessário.

### Código analisado

```JavaScript
# Linguagem: React

// UserManagement.js
import React from 'react';

class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' }
      ],
      newUserName: '',
      newUserEmail: ''
    };
  }

// Utilizar setState pra não mutar o state direto com arrow function: this.setState({ newUserName: event.target.value });
  handleNameChange(event) {
    this.state.newUserName = event.target.value;
  }

// Utilizar setState pra não mutar o state direto com arrow function: this.setState({ newUserEmail: event.target.value });
  handleEmailChange(event) {
    this.setState({ newUserEmail: event.target.value });
  }

// remover forcedUpdate e push e utilizar spread operator [...users, newUser] dentro do setState, padrão de imutabilidade do React
  addUser() {
    const newUser = {
      id: this.state.users.length + 1,
      name: this.state.newUserName,
      email: this.state.newUserEmail
    };

    this.state.users.push(newUser);
    this.forceUpdate();

  }

  render() {
    return (
      <div>
        <h2>Gerenciamento de Usuários</h2>
        <div>
          <input
            type="text"
            placeholder="Nome do usuário"
            value={this.state.newUserName}
            // Input sem onChange
            // onChange={(e) => this.handleNameChange(e)}
          />
          <input
            type="email"
            placeholder="Email do usuário"
            value={this.state.newUserEmail}
            onChange={(e) => this.handleEmailChange(e)}
          />
          <button onClick={() => this.addUser()}>Adicionar Usuário</button>
        </div>
        <ul>
          {this.state.users.map(user => (
            <li>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// Dica: uso de hooks ao invés de classes deixa o código mais limpo

export default UserManagement;

```

### Resolução / Ponderações

Utilizar setState para não mutar o state diretamente

Remover forceUpdate

Utilizar o spread operator ([...]) para manter imutabilidade

Input controlado deve possuir onChange

Uso de hooks deixaria o código mais limpo

---

## 3. Análise de Bug – Listagem de Produtos

### Enunciado

Nossos analistas de qualidade reportaram uma falha na página de listagem de produtos Shipay. Um card reportando o bug foi atribuído à você com a \***Stack Trace**\* a seguir.

```
TypeError: Cannot read properties of null (reading 'map')
  at ProductDisplay (http://localhost:3000/static/js/main.chunk.js:XXX:YY)
  at renderWithHooks (http://localhost:3000/static/js/vendors~main.chunk.js:AAAA:BB)
  at mountIndeterminateComponent (http://localhost:3000/static/js/vendors~main.chunk.js:BBBB:CC)
  ... (outras linhas do stack trace)

```

### Identificação do problema

O problema nesse caso é que estamos tentando iterar com o map uma lista (provavelmente lista de produtos) que está retornando nula.

### Explicação

O estado inicial pode estar vindo nulo ou há um erro ou falha na api que recebe essas propriedades.

### Sugestão de correção

Antes de iterar a lista podemos verificar se ela existe, utilizando interrogação.

Exemplo:

```

{products?.map(product =>
......
)}

```

---

### 4. Autenticação Server Side e Otimização de Performance

## Enunciado

Você ficou responsável por desenvolver um componente que será utilizado por uma aplicação Server Side em React. Essa aplicação irá consumir alguns endpoints de APIs para manipular informações de um formulário de cadastro de oportunidades de vendas (Leads) para novos clientes.
Os endpoints da API por serem expostos publicamente, solicitam um token OAuth JWT com duração de uma hora. Consultando a documentação disponibilizada a seguir, sugira a implementação da autenticação e geração do token JWT para ser utilizada pela aplicação/formulário server side.
O que você poderia propor para otimização de performance no caso do consumo de múltiplos endpoints da API para a utilização do formulário de leads?

### Resolução – Autenticação

- A autenticação não deve acontecer no client, guardaria as access_key e secret_key em variáveis de ambiente no servidor em um arquivo .env. Criaria uma função pra buscar o token no enpoint POST/ auth
- Quando o servidor precisar chamar a API, ele garante primeiro se o access_token é válido. Esse access_token guardaria em memória junto com o tempo de expiração.
- Se o token for válido, eu reutilizo. Se expirado, faço uma nova chamada no /auth pra pegar outro token.
- Se algum endpoint voltar 401, eu trataria como token inválido/expirado, geraria um novo token e tentaria mais uma vez a mesma requisição.

### Resolução – Performance

Para o caso de formulários, eu buscaria esses dados usando Promise.all já com o token reduzindo o tempo de carregamento. Exemplo se tivessemos 3 endpoints:

```
const [segmentsRes, ufsRes, fieldsRes] = await Promise.all([
apiFetch("/segments"),
apiFetch("/ufs"),
apiFetch("/lead/form-fields"),
]);

const [segments, ufs, fields] = await Promise.all([
segmentsRes.json(),
ufsRes.json(),
fieldsRes.json(),
]);

```

---

### 5. Arquitetura Backend For Frontend (BFF)

## Enunciado

Imagine que você trabalha em uma empresa de streaming de vídeos. A empresa deseja aprimorar e expandir suas interfaces de cliente e precisa que você desenhe uma solução utilizando o padrão Back for Front-end (BFF).\*\*

Atualmente, a empresa possui os seguintes microsserviços (MS) no back-end:

MS de Catálogo: Fornece informações sobre filmes e séries (título, sinopse, elenco, classificações, etc.).
MS de Usuários: Gerencia dados dos usuários (perfis, preferências, histórico de visualização).
MS de Streaming: Responsável pela entrega do vídeo em si.

As interfaces de cliente são:

a. Aplicação Web: Deve exibir uma grande quantidade de informações do catálogo na tela inicial, recomendações personalizadas e histórico detalhado.
b. Aplicação Mobile (iOS/Android): Deve ter uma interface mais leve, otimizada para telas menores e conexões de dados potencialmente mais lentas, focando em funcionalidades essenciais e carregamento rápido de listas de vídeos.
c. Aplicação para Smart TVs: Precisa de uma navegação simples, otimizada para controle remoto, e foco na qualidade de imagem e informações essenciais do vídeo antes da reprodução.

Considerando o cenário acima, por favor, responda às seguintes perguntas:

### Conceito do BFF:

BFF é um backend designado para cada front especifíco, ao invés de cada dispositivo chamar microserviços diferentes existe um backend intermedário que faz isso por ele.

### Design da Solução: Você implementaria um único BFF para todos os clientes ou múltiplos BFFs? Justifique sua escolha.

Faria um BFF por tipo de cliente (multiplos BFFs), porque se as necessidades divergem um BFF só fica sobrecarregado exceções por no mobile ser de um jeito, na tv de outro, deixando-o mais dificil de manter.

### Diagrama Simplificado

### Distribuição de Lógicas e Responsabilidades:

Para cada um dos exemplos de lógica/tarefa abaixo, indique onde você acredita que ela seria predominantemente implementada (no cliente, no BFF ou nos microsserviços de back-end) e justifique brevemente

### a) Lógica para renderizar os botões e o layout da interface do usuário em cada dispositivo.

Responsabilidade do Front end porque o foco está no cliente, só o cliente sabe como a tela funciona.

### b) Lógica para agregar dados do MS de Catálogo e do MS de Usuários para montar a tela de "Recomendações Personalizadas" para a versão Web, que exibe muitos detalhes.

No BFF Web, porque ele vai buscar isso no microsserviço, junta tuido e manda uma resposta pronta só para Web com os detalhes que precisamos.

### c) Lógica para buscar uma lista simplificada de "Novos Lançamentos" para a aplicação Mobile, contendo apenas título, imagem de capa e duração.

No BFF Mobile, o microsserviço de catálogo tem todos os dados de lançamento mas quem decide que só queremos titulo + capa + duração é o BFF Mobile.

### d) Lógica de negócio principal para registrar que um usuário assistiu a um vídeo (atualizar histórico).

Ficaria em um microsserviço de Usuário/Histórico, porque tudo que altera dados importantes do sistema fica no microsserviço.

### e) Lógica para adaptar a qualidade do stream de vídeo (MS de Streaming) com base na velocidade da conexão do usuário Mobile.

Ficaria em um microsserviço de Streaming, com o Cliente (Mobile) detectando a velocidade de conexão do usuário e microserviço forncendo o video em qualidades diferentes.

### f) Validação de formato de e-mail no formulário de cadastro no cliente Web.

No Cliente (Web), para que o front valide o formato com feedback visual e no Microsserviço para segurança e dados corretos, o BFF só repassaria.

---
