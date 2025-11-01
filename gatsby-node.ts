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
      descricao: String
      imagem: String
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

  // Helper to slugify strings (remove diacritics, non-alphanum -> '-', trim)
  const slugify = (input: string) =>
    input
      .toString()
      .normalize("NFKD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .toLowerCase();

  const slugCounts: Record<string, number> = {};

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors);
  }

  const nodes = result.data?.allMdx?.nodes || [];

  for (const node of nodes) {
    // try to derive a stable slug: prefer frontmatter.slug if present, then filename, then id
    // fetch frontmatter.slug (safe way using a small query)
    const fRes = await graphql<{
      mdx: { frontmatter?: { slug?: string } };
    }>(
      `
        query ($id: String!) {
          mdx(id: { eq: $id }) {
            frontmatter {
              slug
            }
          }
        }
      `,
      { id: node.id }
    );

    const fmSlug = fRes.data?.mdx?.frontmatter?.slug;
    const contentPath = node.internal?.contentFilePath || "";
    const fileName = contentPath ? path.basename(contentPath) : "";
    const namePart = fileName
      ? fileName.replace(path.extname(fileName), "")
      : "";

    const rawSlug = fmSlug || namePart || node.id;
    let slug = slugify(rawSlug);
    if (!slug) slug = node.id;

    // ensure unique slugs (append counter when necessary)
    if (slugCounts[slug]) {
      slugCounts[slug] += 1;
      slug = `${slug}-${slugCounts[slug]}`;
    } else {
      slugCounts[slug] = 1;
    }

    createPage({
      path: `/carros/${slug}`,
      component: path.resolve("./src/templates/car-template.tsx"),
      context: {
        id: node.id,
        slug,
      },
    });

    // create a redirect from the old id-based path to the new slug path to avoid 404s
    // this helps if any links or old deploys used the node.id URL
    if (actions.createRedirect) {
      actions.createRedirect({
        fromPath: `/carros/${node.id}`,
        toPath: `/carros/${slug}`,
        isPermanent: true,
        redirectInBrowser: true,
      });
    }
  }
};
