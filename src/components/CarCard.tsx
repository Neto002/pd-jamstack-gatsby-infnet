import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { CarMdxFrontmatter } from "../interfaces/CarMdx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  background: white;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const Price = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: #2c5282;
  margin: 0.5rem 0;
`;

const Details = styled.div`
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
`;

const CarCard: React.FC<CarMdxFrontmatter> = ({
  title,
  slug,
  price,
  year,
  km,
  hero_image,
  hero_image_alt,
}) => {
  return (
    <Link to={`/carros/${slug}`} style={{ textDecoration: "none" }}>
      <Card>
        {hero_image && (
          <GatsbyImage
            image={getImage(hero_image)!}
            alt={hero_image_alt}
            style={{ height: "200px", width: "100%", objectFit: "cover" }}
          />
        )}
        <CardContent>
          <Title>{title}</Title>
          <Price>R$ {price.toLocaleString("pt-BR")}</Price>
          <Details>
            <span>{year}</span>
            <span>{km.toLocaleString("pt-BR")} km</span>
          </Details>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CarCard;
