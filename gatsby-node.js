const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const PostTemplate = path.resolve("./src/templates/post-template.js");
const BlogTemplate = path.resolve("./src/templates/blog-template.js");
const ProductTemplate = path.resolve("./src/templates/product-template.js");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "posts" });
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const {
    data: {
      allMarkdownRemark: { edges },
      allContentfulProduct: { edges: products },
    },
  } = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }

      allContentfulProduct {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  edges.forEach(
    ({
      node: {
        fields: { slug },
      },
    }) => {
      createPage({
        path: `posts${slug}`,
        component: PostTemplate,
        context: {
          slug,
        },
      });
    }
  );

  const perPage = 2;
  const totalPages = Math.ceil(edges.length / perPage);
  Array.from({ length: totalPages }).forEach((_, i) => {
    const currentPage = i + 1;
    const isFirstPage = i === 0;
    const isLastPage = currentPage === totalPages;

    createPage({
      path: isFirstPage ? "/blog/" : `/blog/${currentPage}`,
      component: BlogTemplate,
      context: {
        limit: perPage,
        skip: i * perPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages,
      },
    });
  });

  products.forEach(({ node: { slug } }) => {
    createPage({
      path: `/products/${slug}`,
      component: ProductTemplate,
      context: {
        slug,
      },
    });
  });
};
