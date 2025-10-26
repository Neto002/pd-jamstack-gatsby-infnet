import React from "react";
import { graphql, HeadFC } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import { MDXRenderer } from "gatsby-plugin-mdx";

const CarContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const CarHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Price = styled.div`
  font-size: 2rem;
  color: #2ecc71;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Details = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  color: #666;
`;

const ImageContainer = styled.div`
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
`;

const Content = styled.div`
  color: #333;
  line-height: 1.6;

  h2 {
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
  }

  ul {
    margin-left: 1.5rem;
  }
`;

interface CarPageProps {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        preco: number;
        km: number;
        ano: number;
        descricao: string;
        imagem: {
          childImageSharp: {
            gatsbyImageData: any;
          };
        };
      };
      body: string;
    };
  };
}

const CarTemplate: React.FC<CarPageProps> = ({ data }) => {
  const { frontmatter } = data.mdx;
  const image = getImage(frontmatter.imagem);

  return (
    <Layout>
      <CarContainer>
        <CarHeader>
          <Title>{frontmatter.title}</Title>
          <Price>R$ {frontmatter.preco.toLocaleString("pt-BR")}</Price>
          <Details>
            <span>Ano: {frontmatter.ano}</span>
            <span>
              Quilometragem: {frontmatter.km.toLocaleString("pt-BR")} km
            </span>
          </Details>
        </CarHeader>

        {image && (
          <ImageContainer>
            <GatsbyImage image={image} alt={frontmatter.title} />
          </ImageContainer>
        )}

        <Content>
          {MDXRenderer !== undefined && MDXRenderer ? (
            // MDXRenderer is provided by gatsby-plugin-mdx in most setups
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          ) : (
            // Fallback: avoid runtime crash if MDXRenderer is not available
            <div className="mdx-fallback">
              <pre style={{ whiteSpace: "pre-wrap" }}>{data.mdx.body}</pre>
            </div>
          )}
        </Content>
      </CarContainer>
    </Layout>
  );
};

export const query = graphql`
  query CarTemplate($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        preco
        km
        ano
        descricao
        imagem
      }
      body
    }
  }
`;

export default CarTemplate;

export const Head: HeadFC<CarPageProps["data"]> = ({ data }) => (
  <>
    <title>{data.mdx.frontmatter.title} - AutoStore</title>
    <meta name="description" content={data.mdx.frontmatter.descricao} />
  </>
);
