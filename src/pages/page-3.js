import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";

export default () => {
  const {
    allFile: { edges },
  } = useStaticQuery(graphql`
    {
      allFile {
        edges {
          node {
            relativePath
            size
            extension
          }
        }
      }
    }
  `);
  return (
    <Layout>
      <div>
        <h3>Image file data</h3>
        <table>
          <thead>
            <tr>
              <th>Relative Path</th>
              <th>Size</th>
              <th>Extension</th>
            </tr>
          </thead>
          <tbody>
            {edges.map(({ node: { relativePath, size, extension } }, i) => (
              <tr key={i}>
                <td>{relativePath}</td>
                <td>{size}</td>
                <td>{extension}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>Hello from page 3!</h1>
        <Link to="/page-2">Go to page 2</Link>
      </div>
    </Layout>
  );
};
