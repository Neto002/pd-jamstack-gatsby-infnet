# AutoStore (pd-jamstack-gatsby-infnet)

Projeto exemplo: um site JAMstack com Gatsby + MDX para publicar anúncios de veículos.

Este repositório contém um site estático construido com Gatsby (TypeScript) que usa MDX para o conteúdo das páginas de veículos, `gatsby-plugin-image` para imagens otimizadas e `styled-components` para estilos.

## Principais funcionalidades

- Páginas de veículo geradas automaticamente a partir de arquivos em `content/carros` (MDX).
- Imagens otimizadas com `gatsby-plugin-image` / `gatsby-plugin-sharp`.
- Tipagem TypeScript com `graphqlTypegen` habilitado para melhor DX.
- Páginas: `index`, `contato`, `sobre`, e templates para `carros`.

## Tecnologias

- Gatsby ^5 (React)
- TypeScript
- MDX (`gatsby-plugin-mdx`)
- gatsby-plugin-image / gatsby-plugin-sharp
- styled-components
- Formik + Yup (formulário de contato)

## Requisitos

- Node 18+ recomendado
- npm ou yarn

## Instalação

1. Instale dependências:

```bash
npm install
# ou
yarn
```

2. Rode em desenvolvimento:

```bash
npm run develop
# ou
gatsby develop
```

3. Build de produção:

```bash
npm run build
```

4. Servir o build localmente:

```bash
npm run serve
```

## Scripts úteis

- `npm run develop` / `start` — inicia o servidor de desenvolvimento
- `npm run build` — gera os arquivos estáticos
- `npm run serve` — serve o build gerado
- `npm run clean` — limpa cache do Gatsby
- `npm run typecheck` — executa o TypeScript checker (não emite arquivos)

## Estrutura do projeto (resumida)

- `content/carros/` — arquivos `.mdx` para cada anúncio (frontmatter + conteúdo MDX)
- `src/pages/` — páginas React/TSX (ex.: `index.tsx`, `contato.tsx`, `sobre.tsx`, `carros/{mdx.frontmatter__slug}.tsx`)
- `src/components/` — componentes compartilhados (`layout`, `CarCard`, etc.)
- `static/images/` — imagens estáticas (opcionais)
- `gatsby-config.ts` — config do Gatsby (plugins, source-filesystem)
- `gatsby-node.ts` — personalizações do build (aqui definimos schema customizado)

## Como escrever um anúncio (MDX)

Coloque um arquivo MDX em `content/carros/<slug>.mdx` com frontmatter que inclua pelo menos:

```yaml
---
title: "Honda Civic 2023"
slug: "honda-civic-2023"
date: "2023-10-26"
price: 120000
km: 15000
year: 2023
description: "Descrição resumida"
hero_image: "/images/civic-2023.jpg" # ou caminho relativo
hero_image_alt: "Imagem Honda Civic 2023"
---
Conteúdo em MDX aqui...
```

Observações:

- O projeto já contém exemplos em `content/carros/`.
- Se você usar caminhos relativos para `hero_image`, o `gatsby-node.ts` espera `File @fileByRelativePath` (veja seção abaixo).

## GraphQL — query de exemplo

Exemplo de query usada na listagem de carros (página `Carros`):

```graphql
query CarrosPage {
  allMdx(sort: { frontmatter: { date: DESC } }) {
    nodes {
      id
      frontmatter {
        title
        slug
        date
        price
        km
        year
        description
        hero_image {
          childImageSharp {
            gatsbyImageData(width: 600, placeholder: BLURRED)
          }
        }
        hero_image_alt
      }
    }
  }
}
```

## Adicionando imagens

- Para que o GraphQL resolva `hero_image.childImageSharp`, coloque imagens referenciadas por caminho relativo (p.ex. `./foo.jpg`) ao lado do arquivo MDX.

## Visualização do projeto

O projeto é publicado automaticamente a cada commit realizado na branch "main" na plataforma Netlify.

Para visualizá-lo, acesse o link https://pd-jamstack-gatsby-infnet.netlify.app/
