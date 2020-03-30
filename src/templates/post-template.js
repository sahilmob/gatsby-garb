import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

export default function PostTemplate({
  data: {
    markdownRemark: {
      frontmatter: { title },
      html,
    },
  },
}) {
  return (
    <Layout>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
