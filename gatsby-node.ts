import { GatsbyNode } from "gatsby";
import path from "path";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }

    type MdxFrontmatter {
      title: String!
      data: Date @dateformat
      preco: Float!
      km: Float!
      ano: Int!
      descricao: String!
      imagem: File @fileByRelativePath
    }
  `);
  };

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;

  const result = await graphql<{
    allMdx: {
      nodes: Array<{
        id: string;
        internal: {
          contentFilePath: string;
        };
      }>;
    };
  }>(`
    query GetAllMdxPages {
      allMdx {
        nodes {
          id
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors);
  }

  result.data?.allMdx.nodes.forEach((node) => {
    createPage({
      path: `/carros/${node.id}`,
      component: path.resolve("./src/templates/car-template.tsx"),
      context: {
        id: node.id,
      },
    });
  });
};
