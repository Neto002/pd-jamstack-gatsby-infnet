# AutoStore - Site de Revenda de Automóveis

Este é um site de revenda de automóveis desenvolvido com Gatsby para o curso de pós-graduação.

## 🚗 Funcionalidades

- Listagem de carros com imagens otimizadas
- Páginas individuais para cada veículo
- Formulário de contato responsivo com validação
- SEO otimizado com metadados e sitemap
- Design responsivo

## 🛠️ Tecnologias Utilizadas

- Gatsby
- TypeScript
- Styled Components
- MDX para conteúdo
- Formik e Yup para formulários
- GraphQL para consultas de dados

## 📦 Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/Neto002/pd-jamstack-gatsby-infnet.git
cd pd-jamstack-gatsby-infnet
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:

```bash
npm run develop
```

4. Acesse http://localhost:8000

## 🚀 Deploy

O site é automaticamente implantado no Netlify através do GitHub Actions quando há um push na branch main.

Para configurar o deploy:

1. Crie uma conta no Netlify
2. Conecte seu repositório do GitHub
3. Configure as seguintes variáveis de ambiente no GitHub:
   - NETLIFY_AUTH_TOKEN
   - NETLIFY_SITE_ID

## 📝 Estrutura do Projeto

- `/content/carros/`: Arquivos MDX dos veículos
- `/src/components/`: Componentes React reutilizáveis
- `/src/pages/`: Páginas do site
- `/src/templates/`: Templates para páginas geradas dinamicamente
- `/src/images/`: Imagens do site

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## 📄 Licença

Este projeto está sob a licença MIT.
