const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const PostTemplate = path.resolve("./src/templates/post-template.js");
const BlogTemplate = path.resolve("./src/templates/blog-template.js");

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
    },
  } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
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

  edges.forEach((_, i, edgesArray) => {
    const totalPages = edgesArray.length;
    const perPage = 1;
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
};
