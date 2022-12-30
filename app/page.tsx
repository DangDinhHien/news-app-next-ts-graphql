import React from 'react'
import { categories } from '../constants';
import fetchNews from '../lib/fetchNews';
import NewsList from './NewsList';

async function Homepage() {
  // Fetch new data
  const news: NewsResponse = await fetchNews(categories.join(','));

  return (
    <div>
      <NewsList news={news} />
    </div>
  )
}

export default Homepage