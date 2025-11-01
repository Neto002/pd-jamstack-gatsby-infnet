import React from "react";
import { graphql, HeadFC } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { CarMdxFrontmatter } from "../../interfaces/CarMdx";
import Layout from "../../components/layout/Layout";

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
      frontmatter: CarMdxFrontmatter;
      body: string;
    };
  };
  children?: React.ReactNode;
}

const CarTemplate: React.FC<CarPageProps> = ({ data, children }) => {
  const { frontmatter } = data.mdx;
  console.log(frontmatter.hero_image);

  return (
    <Layout>
      <CarContainer>
        <CarHeader>
          <Title>{frontmatter.title}</Title>
          <Price>R$ {frontmatter.price.toLocaleString("pt-BR")}</Price>
          <Details>
            <span>Ano: {frontmatter.year}</span>
            <span>
              Quilometragem: {frontmatter.km.toLocaleString("pt-BR")} km
            </span>
          </Details>
        </CarHeader>

        {frontmatter.hero_image && (
          <ImageContainer>
            <GatsbyImage
              image={getImage(frontmatter.hero_image)!}
              alt={frontmatter.hero_image_alt}
            />
          </ImageContainer>
        )}

        <Content>{children}</Content>
      </CarContainer>
    </Layout>
  );
};

export const query = graphql`
  query CarTemplate($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        slug
        date
        price
        km
        year
        description
        hero_image
        hero_image_alt
      }
      body
    }
  }
`;

export default CarTemplate;

export const Head: HeadFC<CarPageProps["data"]> = ({ data }) => (
  <>
    <title>{data.mdx.frontmatter.title} - AutoStore</title>
    <meta name="description" content={data.mdx.frontmatter.description} />
  </>
);
