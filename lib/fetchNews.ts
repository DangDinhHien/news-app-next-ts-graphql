import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  // Graph QL
  const query = gql`
    query MyQuery (
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "gb"
        sort: "published_desc"
        keywords: $keywords
      ) {
        pagination {
          count
          limit
          offset
          total
        }
        data {
          author
          country
          category
          description
          image
          language
          source
          published_at
          title
          url
        }
      }
    }
  `;

  // Fetch with next 13 caching 
  const res = await fetch('https://cabofrio.stepzen.net/api/hissing-quokka/__graphql', {
    method: 'POST',
    cache: isDynamic ? 'no-cache': 'default',
    next: { revalidate: isDynamic ? 0 : 20 },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        access_key: process.env.MEDISTACK_API_KEY,
        categories: category,
        keywords: keywords,
      }
    })
  })

  console.log("LOADI NEW DSAAT", category, keywords);

  const newsResponse = await res.json();

  const news = sortNewsByImage(newsResponse.data.myQuery);

  return news;
}

export default fetchNews;
