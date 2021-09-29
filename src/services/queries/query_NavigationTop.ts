import { gql } from "graphql-request";

export const query_NavigationTop = gql`
  query NavigationTop {
    NavigationTop {
      logo {
        ... on Asset {
          id
          src
          title
          originalName
          originType
          keywords
          dominantColor
          description
          copyright
          author
        }
      }
      items {
        ... on NavigationItem {
          id
          slug
          title
          description
          items {
            ... on Category {
              id
              items {
                ... on Article {
                  id
                  body {
                    ... on Text {
                      id
                      title
                      text
                    }
                    ... on Asset {
                      id
                      title
                      src
                      originalName
                      originType
                      dominantColor
                      description
                      keywords
                      copyright
                      author
                    }
                  }
                  tags {
                    ... on ArticleTag {
                      id
                      key
                    }
                  }
                  slug
                  headline
                }
              }
              slug
              title
            }
          }
        }
      }
    }
  }
`;
