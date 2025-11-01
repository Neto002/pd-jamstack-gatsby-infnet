import { IGatsbyImageData } from "gatsby-plugin-image";

export interface CarMdx {
  id: string;
  frontmatter: CarMdxFrontmatter;
}

export interface CarMdxFrontmatter {
  title: string;
  slug: string;
  date: string;
  price: number;
  km: number;
  year: number;
  description: string;
  hero_image: IGatsbyImageData;
  hero_image_alt: any;
}
