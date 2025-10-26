import React from "react";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

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

interface CarCardProps {
  title: string;
  slug: string;
  price: number;
  year: number;
  km: number;
  image?: any;
}

const CarCard: React.FC<CarCardProps> = ({
  title,
  slug,
  price,
  year,
  km,
  image,
}) => {
  const carImage = getImage(image);

  return (
    <Link to={`/carros/${slug}`} style={{ textDecoration: "none" }}>
      <Card>
        {carImage && (
          <GatsbyImage
            image={carImage}
            alt={title}
            style={{ height: "200px", width: "100%" }}
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
