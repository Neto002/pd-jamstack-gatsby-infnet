import React from "react";
import { HeadFC } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout/Layout";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  color: #444;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;
`;

const ListItem = styled.li`
  color: #444;
  margin-bottom: 0.5rem;
  line-height: 1.6;
`;

const SobrePage: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <PageHeader>
          <Title>Sobre a AutoStore</Title>
          <Subtitle>
            Sua melhor escolha em carros seminovos e usados desde 2010
          </Subtitle>
        </PageHeader>

        <Section>
          <SectionTitle>Nossa História</SectionTitle>
          <Text>
            Fundada em 2010, a AutoStore nasceu com o objetivo de revolucionar o
            mercado de carros seminovos e usados. Nossa missão sempre foi clara:
            oferecer veículos de qualidade com total transparência e segurança
            para nossos clientes.
          </Text>
          <Text>
            Ao longo destes anos, construímos uma reputação sólida baseada em
            confiança e excelência no atendimento. Cada veículo em nosso estoque
            passa por rigorosas inspeções e é cuidadosamente selecionado para
            garantir a máxima satisfação de nossos clientes.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Nossos Diferenciais</SectionTitle>
          <List>
            <ListItem>
              Garantia estendida em todos os veículos comercializados
            </ListItem>
            <ListItem>
              Inspeção completa com mais de 100 itens verificados
            </ListItem>
            <ListItem>Transparência total no histórico dos veículos</ListItem>
            <ListItem>Financiamento com as melhores taxas do mercado</ListItem>
            <ListItem>
              Equipe especializada e treinada para melhor atendimento
            </ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Compromisso com Qualidade</SectionTitle>
          <Text>
            Nossa equipe é composta por profissionais altamente qualificados e
            apaixonados por automóveis. Investimos constantemente em treinamento
            e tecnologia para oferecer o melhor serviço possível.
          </Text>
          <Text>
            Todos os veículos comercializados pela AutoStore passam por uma
            rigorosa inspeção técnica e documental, garantindo total segurança e
            tranquilidade na sua compra.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Localização</SectionTitle>
          <Text>
            Estamos localizados em uma área de fácil acesso, com amplo
            estacionamento e estrutura moderna para melhor atender nossos
            clientes. Venha nos visitar e confira nosso estoque de veículos
            premium.
          </Text>
          <Text>
            Endereço: Av. das Concessionárias, 1000 - Rio de Janeiro, RJ
            <br />
            Telefone: (21) 5555-5555
            <br />
            Email: contato@autostore.com.br
          </Text>
        </Section>
      </PageContainer>
    </Layout>
  );
};

export default SobrePage;

export const Head: HeadFC = () => (
  <>
    <title>Sobre - AutoStore</title>
    <meta
      name="description"
      content="Conheça a história da AutoStore, sua melhor escolha em carros seminovos e usados. Compromisso com qualidade e satisfação do cliente desde 2010."
    />
  </>
);
