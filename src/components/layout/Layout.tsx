import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import "./layout.css";

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;
  flex: 1;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Main>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </Main>
  );
};

export default Layout;
