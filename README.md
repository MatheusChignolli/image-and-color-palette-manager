# Image and Color Palette Manager

Um sistema para gerenciar imagens e cores para seus projetos de marketing ou design, salvando referências de forma fácil e organizada.

## Instalação e execução do projeto

Faça um fork do projeto:

```bash
git fork https://github.com/MatheusChignolli/image-and-color-palette-manager.git
```

Instale as dependências utilizando o gerenciador de pacotes que preferir:

```bash
npm install
```

Rode o projeto em modo de desenvolvimento:

```bash
npm run dev
```

## Design de Sistema

**Observação:** Muitos itens relacionados ao sistema são reutilizados para os dois módulos, imagem e paleta de cores, portanto durante o documento vou me referir a imagem e/ou paleta de cores como ENTIDADE ou ITEM, indicando ambos módulos.

### 1. Arquitetura Geral

O projeto está estruturado com [App Router](https://nextjs.org/docs/app) do NextJS, com isso temos as seguintes pastas e suas respectivas responsabilidades

- **app:** Responsável por gerencial a aplicação por completo, indicando páginas e até mesmo APIs.
- **components:** Responsável por organizar componentes que são reutilizados. Como o projeto não possui muitos componentes distintos então não foram criados sub diretórios mas se caso a pasta de componentes ficar inflada de arquivos então é bom revisar e se possível organizar em sub camadas de componentes reutilizáveis.
- **constants:** Responsável por organizar valores constantes utilizados globalmente pela aplicação, são valores fixos e que nunca variam. Um diretório excelente para centralizar tais valores e diminuir a manutenção de algum dados repetido entre vários arquivos.
- **storage:** Responsável por organizar os hooks utilizados para gerenciar os dados da aplicação no local storage.
- **types:** Responsável por organizar arquivos destinados a tipagens dos dados da aplicação, tipagens que serão compartilhadas ou que são de entidades chaves da do sistema devem estar aqui para evitar uma escavação de código a fim de encontrar quais dados são utilizados e como são estruturados.
- **utils:** Responsável por organizar utilitários compartilhados, podendo ser funções que auxiliam no manuseio de dados em geral. Deixar tais funções com lógicas de negócio ou que podem ser grande visualmente pode atrapalhar e até inflar componentes que deveriam ser simples de ler e dar manutenção.
- **/\_components:** Diretórios responsáveis por organizar componentes utilizados dentro de contextos específicos que não são reutilizados em outros locais ou são reutilizados dentro de um contexto pequeno.

#### Fluxo dos componentes, páginas e dados

image

### 2. Componentes principais

- **Cabeçalho:** Responsável por exibir links para a tela de listagem de imagens, listagem de paleta de cores, gerenciamento de tags e gerenciamento de grupos, assim como também um link para a página inicial.

- **Filtro:** Responsável por adicionar parâmetros de pesquisa na URL e com isso cada listagem de entidade vai utilizar esses parâmetros para filtrar os dados, componente reaproveitado para a listagem de paleta de cores e imagens.

- **Card da entidade:** Responsável por apresentar o conteúdo na listagem tanto de paleta de cores como também a de imagens, mudando apenas o conteúdo entre uma image ou as cores da paleta como destaque. Esse componente também:

  - Possui um botão para copiar o conteúdo para a área de transferência do dispositivo.
  - Possui um botão para compartilhar o conteúdo utilizando a ferramenta nativa de compartilhamento do dispositivo.
  - Possui um botão para abrir os comentários relacionado ao item.
  - Exibe o nome do item, as tags relacionadas, os grupos relacionados e a última data de atualização.
  - Ao clicar redireciona para a tela de edição do item.

- **Modal de gerenciamento de grupos:** Responsável por criar novos grupos e listar os grupos já criados, além de permitir editá-los ou exclui-los. Quando um grupo é excluído é feito um processo em cascata para remover o grupo excluído das entidades de imagens e paleta de cores.

  - O nome do grupo pode ter no máximo 25 caracteres.

- **Modal de gerenciamento de tags:** Responsável por criar novas tags e listar as tags já criadas, além de permitir editá-las ou exclui-las. Quando uma tag é excluída é feito um processo em cascata para remover o tag excluída das entidades de imagens e paleta de cores.

  - O nome da tag pode ter no máximo 25 caracteres.

- **Formulário de criação de imagem:** Responsável por receber informações como Nome da imagem (Máximo de 25 caracteres), URL da imagem, tags (Máximo de 5 tags vinculadas) e grupos (Máximo de 5 grupos vinculados).

- **Formulário de criação de paleta de cor:** Responsável por receber informações como Nome da paleta de cor (Máximo de 25 caracteres), cores com seus respectivos nomes customizados (Máximo de 5 cores por paleta de cor), tags (Máximo de 5 tags vinculadas) e grupos (Máximo de 5 grupos vinculados).

- **Formulário de edição de imagem/paleta de cor:** Este possui as mesmas funcionalidades que o formulário de criação das respectivas entidades mas possui de forma extra uma área de deleção da entidade e também um botão para abrir os comentários relacionados ao item.

- **Modal de comentários:** Responsável por listar os comentários relacionados a entidade, exibindo o conteúdo, quando o comentário foi criado e também possibilitando a deleção do comentário. E também possibilitando a adição de novos comentários.

- **Página 404:** Responsável por mostrar uma mensagem amigável quando o usuário acessar uma página inexistente.

- **Página genérica de error:** Responsável por mostrar uma mensagem amigável quando acontecer algum erro inesperado na aplicação.

- **Página de loading:** Responsável por mostrar o estado de carregamento da aplicação.

### 3. Estratégia de Gerenciamento de Dados

#### Persistência dos dados

Os dados são salvo no local storage para que sejam persistidos no dispositivo do usuário e com isso seja possível gerenciá-los de uma forma que não se percam. Uma outra abordagem seria utilizar o IndexDB mas optei pelo local storage por ser mais simples e rápido e também por que os dados salvos, em baixa escala, não são grandes o suficiente para ultrapassar o limite do local storage de 5MB.

Com certeza a melhor abordagem seria utilizar um banco de dados para que nenhum dado tenha o risco de se perder pelo fato de ficar apenas do lado do _client_.

E para facilitar o uso do local storage foi utilizado a biblioteca [Zustand](https://zustand-demo.pmnd.rs/), com uma API simples de implementação e funcionando de forma reativa quando os dados são transitado, tendo uma experiência similar ao usar os hooks do React.

#### Busca e filtragem

Os dados armazenados no local storage são buscados e exibidos assim que a tela de listagem é renderizada. Para complementar com a filtragem desses dados está sendo utilizados os parâmetros de busca presentes na URL da página, dessa forma basta que durante a listagem dos dados os parâmetros sejam consumidos e utilizados para efetuar a validação na listagem.

O filtro é feito durante a execução, ou seja, todos os itens são retornados para o componente e então o componente de listagem efetua o filtro, os dados não vêm filtrado do local storage ou são filtrados pela função que os busca do local storage.

Uma ideia para melhorar a organização da filtragem é tirar a lógica de filtragem do componente e passar para um função mas em questão de performance não há ganhos pois tal função continua acontecendo do lado do _client_, ao invés de já retornar os dados filtrados por um banco de SQL/no SQL.

Um dado que não foi utilizado para filtrar os itens mas que pode ser valioso para o usuário é a data de criação e/ou data de atualização, tais dados estão inseridos na aplicação mas não foram utilizados nessa versão.

#### Estrutura dos dados

Exemplificando os dados com tipagens utilizando Typescript:

```ts
interface Tag {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  color: string
}

interface Group {
  id: string
  createdAt: string
  updatedAt: string
  name: string
}

type Comment = {
  id: string
  createdAt: string
  updatedAt: string
  content: string
}

type Color = {
  id: string
  name: string
  hex: string
}

interface ColorPalette {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  colors: Color[]
  tags: string[]
  groups: string[]
  comments: Comment[]
}

interface Image {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  tags: string[]
  groups: string[]
  content: string
  comments: Comment[]
}
```

### 4. Decisões técnicas

#### Tecnologias

Para está aplicação foram utilizadas as seguintes tecnologias:

- [NextJS](https://nextjs.org/): Framework versátil que utiliza ReactJS para a construção de aplicações com o Frontend e Javascript/Typescript para o Backend. Além de ser uma tecnologia amplamente utilizada e com uma comunidade grande, o que facilita quando existem problemas ou compartilhamento de conhecimento
- [TailwindCSS](https://tailwindcss.com/): Framework CSS para facilitar a estilização de componentes.
- [DaisyUI](https://daisyui.com/): Biblioteca de componente que utiliza TailwindCSS, foi escolhida por ser simples e conseguir diminuir os parâmetros passados para as classes dos componentes, criando componentes menores mas ainda assim funcionais e agradáveis.
- [Prettier](https://prettier.io/): Formatador de código, ajuda na padronização do texto no editor de texto, deixando o código formatado.
- [Eslint](https://eslint.org/): Ferramenta que ajuda a analisar de forma estática o código e ajuda a utilizar padrões nas linguagens utilizadas, mitigando padrões distintos (Que funcionem mesmo sendo diferentes) e padronizando o código.
- [Zustand](https://zustand-demo.pmnd.rs/): Biblioteca para gerenciar estado globalmente, comentado na área de gerenciamento e persistência dos dados.
- [UUID](https://github.com/uuidjs/uuid): Foi utilizado o UUID v4 para gerar IDs relacionados as entidades em geral, facilitando a identificação de cada item e também mitigando casos de itens com ids muito simples ou até mesmo duplicados.
- [React colorful](https://omgovich.github.io/react-colorful/): Seletor de cores, utilizado para o usuário selecionar as cores das paletas de cores.
- [React Hot Toast](https://react-hot-toast.com/): Componente de notificações, foi escolhido pois é simples, amigável e o leve. Um ponto relevante: Em projeto maiores eu criar o próprio estilo de toast, utilizando a lógica dessa mesma lib, no caso desse projeto o estilo foi mantido pela simplicidade e por não gerar um grande valor em tal mudança.
- [React hook form](https://tanstack.com/form/latest): Biblioteca para gerenciar o estado de um formulário. Ela foi utilizada por que recentemente foi lançada a v1, por ser simples, possuir uma implementação que não precisa de muito código e também por ser da [Tanstack](https://tanstack.com/), software open-source com diversas bibliotecas utilitárias para gerenciamento de funcionalidades básicas como o controle de um formulários, requisições e outros. Uma oportunidade para testar a nova biblioteca e entender se ela é boa ou não.
- [Netlify](https://www.netlify.com/): Responsável por hospedar com uma limitação do plano gratuito boa para projetos menores e MVPs.

#### Testes

A aplicação não possui testes unitários no momento pois o prazo para o desenvolvimento não permitiu tal adição, foi **priorizado o desenvolvimento dos módulos principais** e suas funcionalidades para que fosse possível lançar a aplicação a tempo, principalmente por ser um MVP e ter como premissa entender como os os usuários vão abraçar a ideia os testes foram planejados para a proxima atualização, com melhorias de feedbacks coletados pelo MVP.

#### Componentes

Muitos componentes foram reutilizados para evitar duplicação de código e principalmente complexidade nos arquivos, o que dificulta a leitura e manutenção do mesmo. Pelo fato da aplicação possuir dois módulos muito similares então o compartilhamento de componentes é algo simples de ser feito e com isso adicionar novos módulos acaba sendo uma tarefa fácil pois já existem ferramentas criadas e que poder ser reutilizadas a qualquer momento.

### 5. Considerações

Essa área será utilizada para justificar lógicas da aplicação em geral:

- O uso do Eslint, como já mencionado, é essencial para manter o código padronizado, principalmente em times de 2 pessoas ou mais, dessa forma padrões de escrita são criados e tudo fica organizado.
- O uso da biblioteca DaisyUI foi uma escolha inesperada, utilizei-a pois nunca tinha usado em outro projeto e a primeira vista é simples e amigável. De qualquer forma, com o MVP criado entendo que existem possíveis melhorias na UI que possam ser relevantes para o usuários final, como:
  - Escolha de cores sóbrias para o tema ou cores não tão vibrantes pelo fato da aplicação trabalhar com imagens e paleta de cores então ter um tema que tem muita cor pode atrapalhar.
  - Mudança do estilo dos componentes para algo fluído e simples, por mais que o modo como foi feito os botões e texto são auto explicativos muitas vezes com feedbacks de usuários é possível entender o que é prioritário e o que nem é utilizado, iniciando um processo de mudança da UI para consequentemente evoluir a experiência do usuário. Um ponto relevante da aplicação é o uso de Tooltips em botões que possuem apenas ícone, podem ajudar bastante no uso dos usuários quando não sabem o que o botão faz por não compreender o ícone e então não querem clicar para descobrir.
  - Adicionar uma funcionalidade para que o usuário escolha o tema entre claro e escuro da aplicação, deixando a gosto de que utilizar decidir como prefere visualizar o sistema visualmente.
- Uma evolução significativa para a aplicação é adicionar um modelo de autenticação por usuário e consequentemente utilizar um banco de dados para evoluir a persistência dos dados. Para isso uma coisa importante é o uso de um meio de autenticação seguro, normalmente prezo por usar algo como JWT ou até mesmo JWE como NextJS e Auth0 (Ou outra tecnologia que já forneça o gerenciamento de usuários e autenticação), dessa forma o token fica encriptado e as APIs são responsáveis por retornar os dados necessários.
- Nessa primeira versão não foram adicionadas melhorias de usabilidade para pessoas que possuem limitações físicas ou mentais, é um assunto bastante importante para conseguir incluir as pessoas cada vez mais e tornar a aplicação com um uso para todos sem problemas de uso.
- Pensando em um MVP para um possível aplicação que será paga foram tomadas algumas decisões pequenas mas que abrem margem para possibilidades no futuro
  - Restringir o seletor de cor para a paleta de cores apenas por um componente de arrastar e soltar, sem possibilitar a digitação de uma cor RGB ou HEX. Tal funcionalidade para inserir uma cor específica pode ser adicionada em uma versão PRO.
  - Limitar o número de TAGs e Grupos vinculados às imagens e/ou paleta de cores, tal limitação pode ser aumentada em uma versão PRO.
  - Limitar o número de caracteres de nomes das imagens, paleta de cores, tags e grupos, essa limitação pode ser aumentada ou removida em uma versão PRO.
  - Não foi adicionado uma limitação para o número máximo de imagens e/ou paleta de cores mas o mesmo também pode ser feito e utilizado para uma versão PRO.
- Comentando sobre as limitações do item anterior, um ponto levado em consideração é que iniciar uma aplicação com limitações é um modelo seguro e inteligente para comprovar um produto, dessa forma barreiras são criadas para limitar qualquer pessoa mal intencionada e também restringir o leque de opções para os usuários, de certa forma isso pode ser benéfico pois quando um usuário tem muitas opçÕes ele não sabe o que fazer, agora quando é restringido a aplicação consegue conduzir a ação do usuário. Uma segurança lógica e em momento de execução, nem sempre a segurança dos sistemas são apenas ataques nas APIs e afins, muitas vezes pequenas restrições de negócio e produto podem ajudar muito, até mesmo a entender o próprio produto.
- Uma ideia que não foi aplicada nessa versão é a implementação da internacionalização, organizando os textos utilizados na aplicação em arquivos de linguas diferentes, abrangendo mais usuários e também tornando a manutenção de tradução fácil.
- Como evolução de uma aplicação com APIs também se dá como necessário um bom gerenciamento dos retornos das APIs, se fazendo necessário funções que padronizem erros e código retornados. Como por exemplo: Independente do erro, se for 404 ou 5xx, redirecionar o usuário para uma página específica com uma mensagem amigável ao invés de deixá-lo sem entender o por que de uma ação não ter feito nada no sistema.
- Melhorias para serem adicionar em uma próxima versão são informação do Open Graph, melhorando o SEO do site.
- Utilizando a página de loading como um bom exemplo de experiência por demonstrar ao usuário o estado da aplicação (O que algo está carregando) também foram adicionados em algumas ações o loading nos botões de submissão para evitar clique duplo e também exibir o que a ação que o usuário acabou de fazer está carregando. Pelo fato do armazenamento de dados utilizar o local storage então componentes de loading podem quase nem ser exibidos, por se tratar de um dado que é salvo no lado do _client_ e utilizado por ele mesmo mas em aplicações que possuem 1 ou mais requisições que possam demorar é importante existir algo visual que exemplifique essa demora e explique para o usuário o que está carregando, podendo ser um texto com efeitos simples, _Skeletons_, algo interativo ou até mesmo textos que mudam conforme o dado que está acontecendo do lado do serviço em tempo real.
- Sobre experiência do usuário também é bastante importante ter alguma interação que explique o que são as coisas na aplicação, seja um Tour ou até mesmo vídeos demonstrativos, nessa primeira versão foram adicionados 2 vídeos sobre cada módulo mas de fato mais vídeos e demonstrações podem se fazer necessárias para que os usuários utilizem o sistema da melhor forma.
- Com relação a segurança é muito importante que as aplicações Frontend possuam do lado do servidor _Request Headers_ que inibam ataques prejudiciais para a aplicação como XSS e outros. Foram adicionadas políticas headers como Content-Security-Policy, X-Frame-Options, Referrer-Policy ePermissions-Policy. Foi utilizado o seguinte site para validar tais headers: [Link](https://securityheaders.com/?q=https%3A%2F%2Fimage-and-color-palette-manager.netlify.app%2F&followRedirects=on). É possível também melhorar ainda mais a segurança de scripts e conteúdos de terceiros de forma segura utilizando _Nonce_ no NextJS. O nonce (Número Único Usado Uma Vez) é um valor aleatório e único gerado a cada requisição, usado para permitir a execução segura de scripts e estilos inline sem precisar do 'unsafe-inline' no Content Security Policy (CSP).
- Tomando o gancho do item anterior, para o MVP não temos um domínio amigável pois o time de marketing está decidindo e estudando um domínio bacana, para não retardar o lançamento foi utilizado um domínio temporário da Netlify.
