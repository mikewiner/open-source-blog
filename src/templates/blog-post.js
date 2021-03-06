import React from "react"
import { Link, graphql } from "gatsby"
import styled from "@emotion/styled"
import { colors } from "../style/theme"
import SEO from "../components/Seo"
import Bio from "../components/Bio"
import Layout from "../components/Layout"

const NavLinks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  a {
    color: ${colors.main};
  }
`
const BlogPost = styled.article`
  blockquote {
    font-style: italic;
    padding: 0.5em 10px;
    border-left: 0.32rem solid #47b8d4;
    background: #f9f9f9;
  }
  h1 {
    color: ${colors.main};
    margin: 0;
  }
  p {
    margin: 1rem 0;
  }
  b {
    color: ${colors.main};
  }
  /* figure {
    margin: 0rem 0;
  } */
  figcaption {
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    font-style: italic;
    text-align: center;
  }
  @media (max-width: 500px) {
    figure {
      margin: 0rem 0;
    }
  }
`
const BlogName = styled.h3`
  a:hover,
  a:visited,
  a:link,
  a:active {
    color: black;
    text-decoration: none;
  }
`
const BlogHeader = styled.div`
  p {
    font-style: italic;
    margin: 0rem 0rem;
  }
`

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <BlogName>
        <Link to="/">Mike W's Blog</Link>
      </BlogName>
      <BlogPost>
        <BlogHeader>
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.description}</p>
          <small>{post.frontmatter.date}</small>
        </BlogHeader>
        <hr
          style={{
            border: `${colors.main} solid 1px`,
            margin: `5px 0px`,
            width: `60%`,
          }}
        />
        <br />
        <section dangerouslySetInnerHTML={{ __html: post.html }} />

        <hr
          style={{ border: `${colors.main} solid 1px`, margin: `30px 0px` }}
        />
        <footer>
          <Bio />
        </footer>
      </BlogPost>

      <nav>
        <NavLinks>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
          <li>
            <Link to="/" rel="next">
              Let's go Home{" "}
              <span role="img" aria-label="home">
                🏠
              </span>
            </Link>
          </li>
        </NavLinks>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
