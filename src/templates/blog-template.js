import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";

export default function Blog({
  data: {
    allMarkdownRemark: { edges, totalCount },
  },
  pageContext: { currentPage, isFirstPage, isLastPage, totalPages },
}) {
  const nextPage = `/blog/${String(currentPage + 1)}`;
  const prevPage =
    currentPage - 1 === 1 ? "/blog" : `/blog/${String(currentPage - 1)}`;
  return (
    <Layout>
      <h1 style={{ display: "inline-block", borderBottom: "1px solid" }}>
        Gatsby Garb blog
      </h1>
      <div>
        <h4>{totalCount} Posts</h4>
        {edges.map(
          ({
            node: {
              id,
              excerpt,
              frontmatter: { title, date },
              fields: { slug },
            },
          }) => (
            <div key={id}>
              <h3>
                <Link to={`/posts/${slug}`}>{title}</Link>
                <span style={{ color: "#bbb" }}> - {date}</span>
              </h3>
              <p>{excerpt}</p>
            </div>
          )
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            maxWidth: 300,
            margin: "0 auto",
          }}
        >
          {!isFirstPage && (
            <Link to={prevPage} rel="prev">
              Prev Page
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <Link key={index} to={`/blog/${index === 0 ? "" : index + 1}`}>
              {index + 1}
            </Link>
          ))}
          {!isLastPage && (
            <Link to={nextPage} rel="next">
              Next Page
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(skip: $skip, limit: $limit) {
      totalCount
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
