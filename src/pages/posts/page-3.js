import React from "react";
import { Link } from "gatsby";

import Layout from "../../components/layout";

export default () => {
  return (
    <Layout>
      <div>
        <h1>Hello from page 3!</h1>
        <Link to="/page-2">Go to page 2</Link>
      </div>
    </Layout>
  );
};
