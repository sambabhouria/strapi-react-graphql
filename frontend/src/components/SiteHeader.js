import React from 'react'
import {Outlet, Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id,
        attributes {
          name
        }
      },
    }
  }
`

export default function SiteHeader() {

  const { loading, error, data } = useQuery(CATEGORIES)

  if (loading) return <p>Loading categories...</p>
  if (error) return <p>Error fetching categories</p>
  
  const {categories } = data; 
  console.log("🚀 ~ file: SiteHeader.js:25 ~ SiteHeader ~ categories:", categories)

  return (
    <div className="site-header">
      <Link to="/"><h1>Reviews</h1></Link>
      <nav className="categories">
        <span>Filter reviews by category:</span>
        {categories?.data.map(category => (
          <Link key={category.id} to={`/category/${category.id}`}>
            {category?.attributes.name}
          </Link>
        ))}
      </nav>

      {/* An <Outlet> renders whatever child route is currently active,
        so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  )
}