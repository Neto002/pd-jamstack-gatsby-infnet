import React from "react";
import { HeadFC } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout/Layout";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Lead = styled.p`
  color: #555;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
`;

const Section = styled.section`
  margin-bottom: 1.5rem;
  color: #333;
  line-height: 1.6;
`;

const SobrePage: React.FC = () => {
  return (
    <Layout>
      <Container>
        <Title>Sobre a AutoStore</Title>
        <Lead>
          Somos uma plataforma dedicada a conectar compradores e vendedores de
          veículos com transparência e segurança.
        </Lead>

        <Section>
          <h2>Nossa missão</h2>
          <p>
            Oferecer listagens claras, fotos de qualidade e informações
            confiáveis para que você encontre o veículo certo com confiança.
          </p>
        </Section>

        <Section>
          <h2>O que oferecemos</h2>
          <ul>
            <li>
              Listagens detalhadas com histórico e características do veículo
            </li>
            <li>Fotos otimizadas para visualização em desktop e mobile</li>
            <li>Suporte ao cliente para dúvidas e negociações</li>
          </ul>
        </Section>

        <Section>
          <h2>Contato</h2>
          <p>
            Para mais informações, acesse a página de contato ou envie uma
            mensagem através do formulário.
          </p>
        </Section>
      </Container>
    </Layout>
  );
};

export default SobrePage;

export const Head: HeadFC = () => (
  <>
    <title>Sobre - AutoStore</title>
    <meta
      name="description"
      content="Saiba mais sobre a AutoStore: missão, serviços e como entrar em contato."
    />
  </>
);
// file cleaned: kept the Portuguese `SobrePage` only
