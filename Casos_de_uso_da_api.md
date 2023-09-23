### **Casos de Uso da API**:

1. **Caso de Uso 1**: **Cadastro de Usuário**
   - **Ator**: Cliente da API.
   - **Descrição**: Cliente da API envia uma requisição POST com nome, email e senha para registrar um novo usuário.
   - **Fluxo Principal**:
     1. Cliente da API envia uma requisição POST para o endpoint `/users` com um payload contendo nome, email e senha.
     2. API valida os dados e cria um novo usuário.
     3. API retorna uma resposta com status 201 (Created) e os detalhes do usuário registrado.

2. **Caso de Uso 2**: **Busca de Vagas**
   - **Ator**: Cliente da API.
   - **Descrição**: Cliente da API envia uma requisição GET com parâmetros de filtro para buscar vagas.
   - **Fluxo Principal**:
     1. Cliente da API envia uma requisição GET para o endpoint `/jobs` com os parâmetros de filtro desejados.
     2. API processa a busca com base nos filtros fornecidos.
     3. API retorna uma lista de vagas que se enquadram nos critérios de busca.

3. **Caso de Uso 3**: **Cadastro de Vagas**
   - **Ator**: Cliente da API.
   - **Descrição**: Cliente da API envia uma requisição POST com detalhes da vaga para cadastrá-la.
   - **Fluxo Principal**:
     1. Cliente da API envia uma requisição POST para o endpoint `/jobs` com um payload contendo detalhes da vaga.
     2. API valida os dados e registra a nova vaga.
     3. API retorna uma resposta com status 201 (Created) e os detalhes da vaga registrada.

4. **Caso de Uso 4**: **Registro de Buscas por Tecnologia e Cidade**
   - **Ator**: Cliente da API.
   - **Descrição**: Ao realizar uma busca, a API registra automaticamente a contagem de buscas por tecnologia e cidade.
   - **Fluxo Principal**:
     1. Durante a busca de vagas, a API incrementa um contador para a tecnologia e cidade especificada na tabela de contagens.
     2. API retorna uma resposta com as vagas encontradas.

5. **Caso de Uso 5**: **Busca pelas 5 Tecnologias Mais Procuradas**
   - **Ator**: Cliente da API.
   - **Descrição**: Cliente da API solicita uma lista das 5 tecnologias mais buscadas.
   - **Fluxo Principal**:
     1. Cliente da API envia uma requisição GET para o endpoint `/trends/technologies`.
     2. API retorna uma lista com as 5 tecnologias mais procuradas.

6. **Caso de Uso 6**: **Busca pelas 5 Cidades para uma Tecnologia Específica**
   - **Ator**: Cliente da API.
   - **Descrição**: Cliente da API solicita uma lista das 5 cidades que mais buscam por uma tecnologia específica.
   - **Fluxo Principal**:
     1. Cliente da API envia uma requisição GET para o endpoint `/trends/cities` com o parâmetro da tecnologia desejada.
     2. API retorna uma lista com as 5 cidades que mais procuraram pela tecnologia especificada.