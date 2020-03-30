import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";

export default function ProductTemplate({
  data: {
    contentfulProduct: { name, description, image, createdAt },
  },
}) {
  return (
    <Layout>
      <div style={{ marginLeft: "0 auto", width: "100%", textAlign: "center" }}>
        <h2>
          {name} <span style={{ color: "#ccc" }}>Added on {createdAt}</span>{" "}
        </h2>
        <p>{description}</p>
        <Img style={{ margin: "0 auto", maxWidth: 600 }} fluid={image.fluid} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      name
      description
      price
      createdAt(formatString: "MMMM Do, YYYY")
      image {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`;
