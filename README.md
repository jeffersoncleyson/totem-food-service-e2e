## Testes de e2e - Totem Food Service

---

### Setup

---

1 - Configuração inicial do ambiente 

```
  node v19.7.0
  yarn 1.22.10
```

2 - Instalar as extensões no Visual Studio Code

```
https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
```

3 - Instalar dependências do projeto

```
yarn install
```

---

### Execução dos testes

---

1 - Acesse a raiz do projeto

2 - Execute os testes passando o alias presente no package.json

```
  yarn run test
```

3 - Após a execução é possível visualizar o relatório do cucumber em HTML, para gerar executar o comando abaixo:
```
  yarn run generate-report
```

---

**Lembrete:** Antes de subir um commit para o repositório, lembre-se de remover as tags usadas para a depuração.
