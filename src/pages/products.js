import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";

export default function Products({
  data: {
    allContentfulProduct: { edges: products },
  },
}) {
  return (
    <Layout>
      <div>
        {products.map(({ node: { id, slug, name, image: { fluid } } }) => (
          <div key={id}>
            <h2>Garb products</h2>
            <Link to={`/products/${slug}`}>
              <h3>{name}</h3>
            </Link>
            <Img style={{ maxWidth: 400 }} fluid={fluid} />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const query = graphql`
  {
    allContentfulProduct {
      edges {
        node {
          id
          slug
          name
          image {
            fluid(maxWidth: 400) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;
