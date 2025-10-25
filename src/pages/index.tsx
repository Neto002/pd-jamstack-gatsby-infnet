import * as React from "react";
import { Link, type HeadFC, type PageProps } from "gatsby";
import Layout from "../components/layout";
import Teste from "../components/teste";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout titulo="Home Page">
      <h1>Olá Mundo Gatsby!</h1>
      <p>Iniciando com os primeiros componentes do React no Gatsby.</p>
      <Teste nome="Machado de Assis" />
      <Link to="/about">Sobre</Link>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
