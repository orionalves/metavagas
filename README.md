# Metavagas

## Api de buscas de vagas de emprego.

```
A API permite buscas por nome, tecnologia, cidade, tipo de trabalho, regime de contrato, tamanho da empresa, nível de experiência ou salário.
```

### Detalhes:

Api está testada e inversão de dependências.
Foi criada com nodejs e TypeScript.
Está acessível via: https://metavagas.onrender.com/ e https://glamorous-boa-fatigues.cyclic.cloud/

### Funcionalidades:

[✓] Cadastrar usuário.

[✓] Login.

[✓] Buscar vagas utilizando múltiplos filtros.

[✓] Registro quando ocorre busca por tecnologia.

[✓] Mostrar as 5 tecnologias mais buscadas.

[✓] Mostrar as 5 cidades que mais procuram a tecnologia mais buscada.

[✓] Usuário pode cadastrar vaga.

[✓] Atualizar nome e senha de usuário.

[✓] Favoritar vagas.

[✓] Histórico das últimas buscas.

[✓] Paginação.

### Como usar?

*Autenticação via baerer token*

Passar no header: 
```
Authorization: Bearer ${token}
```

[✓] **Cadastrar usuário:**

🟢 POST /signup

Passar json no body contendo name, email e password.

Ex.

```
{
  "name": "Nome Completo",
  "email": "email@valido.com",
  "password": "senhade8dígitos"
}
```

Ex. sucesso:

```
{
    "error": false,
    "message": "✔️ Ok: User created!",
    "status": 201
}
```

[✓] **Autenticar usuário:**

🟢 POST /login

*validar com usuário já cadastrado*

Passar json no body contendo email e password.

Ex.

```
{
  "email": "email@valido.com",
  "password": "senhade8dígitos"
}
```

Ex. sucesso:

```
{
    "id": "65100eda0acec1a85b204b9b",
    "name": "Nome Completo",
    "email": "email@valido.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGUyIiwiZW1haWwiOiJ0ZXN0ZTJAdGVzdGUuY29tIiwiaWF0IjoxNjk3OTc1NTg5LCJleHAiOjE2OTc5NzU4ODl9.mn6Q603htLeWXacITFO4VBEwVlOY2RlRNbSc7ZbMAEc"
}
```

[✓] **Buscar vagas**

🟣 GET /:id/jobs

*necessita autenticação*

Substituir :id pelo id do usuário autenticado.

Passar parâmetros buscados via query.

```
position: Nome da vaga
technologies[]: Nome da tecnologia
city: Cidade
jobType: Tipo de trabalho: 'remote', 'office' ou 'hybrid'
workRegime: Regime de contrato: 'clt' ou 'pj'
companySize: Tamanho da empresa: 'small', 'mid-level' ou 'large'
minSalary: Valor mínimo de salário.
maxSalary: Valor máximo de salário.
experienceLevel: Nível de experiência: 'junior', 'mid-level' ou 'senior'
```

Ex. query
```
/65100eda0acec1a85b204b9b/jobs?position=Web%20Developer&technologies%5B%5D=javascript&city=Salvador&jobType=remote&workRegime=clt&experienceLevel=senior&minSalary=5000&maxSalary=10000&technologies%5B%5D=html&technologies%5B%5D=css&companySize=mid-level
```

Ex. sucesso
```
{
	"_id": "65283ba9272bd4ccb1639e35",
	"position": "Web Developer",
	"company": "Tech Solutions",
	"city": {
		"name": "Salvador",
		"uf": "BA"
	},
	"link": "https://example.com/job1",
	"jobType": "remote",
	"workRegime": "clt",
	"companySize": "mid-level",
	"salary": 8000,
	"experienceLevel": "senior",
	"description": "Procuramos um desenvolvedor web experiente para se juntar à nossa equipe.",
	"technologies": [
		{
			"name": "javascript"
		},
		{
			"name": "react"
		},
		{
			"name": "nodejs"
		}
	]
}
```

*Quanto menor opções na query, maior chance de retorno.*

[✓] **Mostrar as 5 tecnologias mais buscadas**

🟣 GET /trends/techs

Retorna as 5 tecnologias mais buscadas por todos os usuários.

[✓] **Mostrar as 5 cidades que mais procuram a tecnologia.**

🟣 GET /trends/:id/cities

Retorna as 5 cidades que mais buscam a tecnologia.

Substituir :id pelo id da tecnologia.

*Para conseguir o id da technologia mais buscada basta pegar o retorno do get /trends/tech*

```
$.[0].technology._id
```

[✓] **Cadastrar vaga.**

🟢 POST /jobs

*necessita autenticação*

Passar json no body contendo position, company, technologies, city, link, jobType, workRegime, companySize, salary, experienceLevel e description.

Ex.

```
{
  "position": "Buscador de vagas",
  "company": "Tech Solutions",
  "technologies": ["nodejs", "javascript"],
  "city": "Recife",
  "link": "https://example.com/job1",
  "jobType": "remote",
  "workRegime": "clt",
  "companySize": "mid-level",
  "salary": 8000,
  "experienceLevel": "senior",
  "description": "Procuramos um desenvolvedor web experiente para se juntar à nossa."
}
```



🟡 PATCH

### Detalhes Adicionais

- **Autor:** [Orion Alves]
- **Contato:** orionalves@skiff.com
- **Telefone** +55 71 9 9369-4649