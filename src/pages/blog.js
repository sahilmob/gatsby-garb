import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";

export default function Blog() {
  const {
    allMarkdownRemark: { edges, totalCount },
  } = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        totalCount
        edges {
          node {
            id
            excerpt
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <h1 style={{ display: "inline-block", borderBottom: "1px solid" }}>
        Gatsby Garb blog
      </h1>
      <>
        <h4>{totalCount} Posts</h4>
        {edges.map(
          ({
            node: {
              id,
              excerpt,
              frontmatter: { title, date },
            },
          }) => (
            <div key={id}>
              <h3>
                {title}
                <span style={{ color: "#bbb" }}> - {date}</span>
              </h3>
              <p>{excerpt}</p>
            </div>
          )
        )}
      </>
    </Layout>
  );
}
