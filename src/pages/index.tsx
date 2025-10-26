import React from "react";
import { Link, HeadFC, PageProps, graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import CarCard from "../components/CarCard";

const Hero = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("/hero-bg.jpg") center/cover;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const Cta = styled(Link)`
  display: inline-block;
  background-color: #2ecc71;
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #27ae60;
  }
`;

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
`;

const CarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

interface IndexPageProps {
  data: {
    allMdx: {
      nodes: Array<{
        id: string;
        frontmatter: {
          title: string;
          preco: number;
          km: number;
          ano: number;
          imagem: any;
        };
      }>;
    };
  };
}

const IndexPage: React.FC<PageProps<IndexPageProps["data"]>> = ({ data }) => {
  return (
    <Layout>
      <Hero>
        <HeroTitle>Encontre o Carro dos Seus Sonhos</HeroTitle>
        <HeroSubtitle>
          Os melhores carros seminovos e usados com garantia de procedência
        </HeroSubtitle>
        <Cta to="/contato">Entre em Contato</Cta>
      </Hero>

      <Section>
        <SectionTitle>Veículos em Destaque</SectionTitle>
        <CarGrid>
          {data.allMdx.nodes.map((car) => (
            <CarCard
              key={car.id}
              title={car.frontmatter.title}
              slug={car.id}
              price={car.frontmatter.preco}
              year={car.frontmatter.ano}
              km={car.frontmatter.km}
              image={car.frontmatter.imagem}
            />
          ))}
        </CarGrid>
      </Section>
    </Layout>
  );
};

export const query = graphql`
  query HomePage {
    allMdx(sort: { frontmatter: { data: DESC } }, limit: 5) {
      nodes {
        id
        frontmatter {
          title
          preco
          km
          ano
          imagem {
            childImageSharp {
              gatsbyImageData(
                width: 300
                height: 200
                transformOptions: { fit: COVER }
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>AutoStore - Seu Carro Novo Está Aqui</title>
    <meta
      name="description"
      content="Encontre os melhores carros seminovos e usados com as melhores condições do mercado."
    />
  </>
);
