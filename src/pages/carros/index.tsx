import React, { useState } from "react";
import { graphql, HeadFC, PageProps, useStaticQuery } from "gatsby";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import Layout from "../../components/layout/Layout";
import CarCard from "../../components/CarCard";
import { DataMdx } from "../../interfaces/DataMdx";
import { CarMdx } from "../../interfaces/CarMdx";

const PageHeader = styled.div`
  background-color: #f5f5f5;
  padding: 2rem 0;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
`;

const FiltersSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FilterForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const Input = styled(Field)`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2ecc71;
  }
`;

const Select = styled(Field)`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #2ecc71;
  }
`;

const CarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => (props.isActive ? "#2ecc71" : "#ddd")};
  background-color: ${(props) => (props.isActive ? "#2ecc71" : "white")};
  color: ${(props) => (props.isActive ? "white" : "#333")};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#27ae60" : "#f5f5f5")};
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;

interface CarrosPageProps {
  data: DataMdx<CarMdx>;
}

const ITEMS_PER_PAGE = 9;

const CarrosPage: React.FC<PageProps<CarrosPageProps["data"]>> = () => {
  const data = useStaticQuery<DataMdx<CarMdx>>(graphql`
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
  `);

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    precoMin: "",
    precoMax: "",
    anoMin: "",
    anoMax: "",
    kmMin: "",
    kmMax: "",
  });

  const allCars = data.allMdx.nodes;

  // Aplicar filtros
  const filteredCars = allCars.filter((car) => {
    const { precoMin, precoMax, anoMin, anoMax, kmMin, kmMax } = filters;

    if (precoMin && precoMin !== "" && car.frontmatter.price < Number(precoMin))
      return false;
    if (precoMax && precoMax !== "" && car.frontmatter.price > Number(precoMax))
      return false;
    if (anoMin && anoMin !== "" && car.frontmatter.year < Number(anoMin))
      return false;
    if (anoMax && anoMax !== "" && car.frontmatter.year > Number(anoMax))
      return false;
    if (kmMin && kmMin !== "" && car.frontmatter.km < Number(kmMin))
      return false;
    if (kmMax && kmMax !== "" && car.frontmatter.km > Number(kmMax))
      return false;

    return true;
  }); // Calcular paginação

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCars = filteredCars.slice(startIndex, endIndex);

  return (
    <Layout>
      <PageHeader>
        <PageTitle>Nossos Carros</PageTitle>
      </PageHeader>

      <FiltersSection>
        <Formik
          initialValues={filters}
          enableReinitialize
          onSubmit={(values) => {
            setFilters(values);
            setCurrentPage(1);
          }}
        >
          {({ values, setFieldValue, submitForm }) => (
            <FilterForm
              onChange={() => {
                // Atrasar o submit para dar tempo de digitar
                setTimeout(submitForm, 500);
              }}
            >
              <FilterGroup>
                <Label>Preço Mínimo</Label>
                <Input
                  type="number"
                  name="precoMin"
                  placeholder="R$"
                  value={values.precoMin}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("precoMin", e.target.value);
                  }}
                />
              </FilterGroup>
              <FilterGroup>
                <Label>Preço Máximo</Label>
                <Input
                  type="number"
                  name="precoMax"
                  placeholder="R$"
                  value={values.precoMax}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("precoMax", e.target.value);
                  }}
                />
              </FilterGroup>
              <FilterGroup>
                <Label>Ano Mínimo</Label>
                <Input
                  type="number"
                  name="anoMin"
                  placeholder="Ex: 2020"
                  value={values.anoMin}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("anoMin", e.target.value);
                  }}
                />
              </FilterGroup>
              <FilterGroup>
                <Label>Ano Máximo</Label>
                <Input
                  type="number"
                  name="anoMax"
                  placeholder="Ex: 2024"
                  value={values.anoMax}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("anoMax", e.target.value);
                  }}
                />
              </FilterGroup>
              <FilterGroup>
                <Label>KM Mínimo</Label>
                <Input
                  type="number"
                  name="kmMin"
                  placeholder="Ex: 0"
                  value={values.kmMin}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("kmMin", e.target.value);
                  }}
                />
              </FilterGroup>
              <FilterGroup>
                <Label>KM Máximo</Label>
                <Input
                  type="number"
                  name="kmMax"
                  placeholder="Ex: 100000"
                  value={values.kmMax}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("kmMax", e.target.value);
                  }}
                />
              </FilterGroup>
            </FilterForm>
          )}
        </Formik>
      </FiltersSection>

      <CarGrid>
        {currentCars.map((car) => (
          <CarCard
            key={car.id}
            title={car.frontmatter.title}
            slug={car.frontmatter.slug}
            date={car.frontmatter.date}
            price={car.frontmatter.price}
            year={car.frontmatter.year}
            km={car.frontmatter.km}
            description={car.frontmatter.description}
            hero_image={car.frontmatter.hero_image}
            hero_image_alt={car.frontmatter.hero_image_alt}
          />
        ))}
      </CarGrid>

      {totalPages > 1 && (
        <Pagination>
          <PageButton
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </PageButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PageButton
              key={page}
              isActive={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PageButton>
          ))}
          <PageButton
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            Próximo
          </PageButton>
        </Pagination>
      )}
    </Layout>
  );
};

export default CarrosPage;

export const Head: HeadFC = () => (
  <>
    <title>Carros - AutoStore</title>
    <meta
      name="description"
      content="Confira nossa seleção de carros seminovos e usados com garantia de procedência."
    />
  </>
);
