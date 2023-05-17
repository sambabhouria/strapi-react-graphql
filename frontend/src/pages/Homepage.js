import React from 'react'
// import useFetch from '../hooks/useFetch'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import { useQuery, gql } from '@apollo/client'

const REVIEWS = gql`
  query GetReviews {
    reviews {
        data {
          id,
          attributes {
            title,
            rating,
            body,
            categories {
                data {
                  id, 
                  attributes {
                    name,
                  }
                }
            }
          }
        }
    }
  }
`

export default function Homepage() {

//  const { loading, error, data } = useFetch('http://localhost:1337/api/reviews')

 const { loading, error, data } = useQuery(REVIEWS)
 

 if (loading) return <p>Loading...</p>
 if (error) return <p>Error :(</p>

 // rest api call 
// console.log(data)

// graphql call 

const {reviews } = data; 
console.log("reviews=>", reviews)
console.log("data=>" , reviews.data)

  return (
    <div>
         
         {/* REST API CALL  */}
        {/* {data?.map(review => (
        <div key={review.id} className="review-card">
          <div className="rating">{review?.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>
          
          <small>console list</small>

          <p>{review?.attributes.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))} */}
        {/* graphql call  */}
           {reviews?.data?.map(review => (
            <div key={review.id} className="review-card">
            <div className="rating">{review?.attributes.rating}
            </div>
            <h2>{review.attributes.title}</h2>

            {review?.attributes?.categories?.data.map(c => (
              <small key={c.id}>{c?.attributes?.name}</small>
            ))}

            <p><ReactMarkdown>{review?.attributes.body.substring(0, 200)}</ReactMarkdown>...</p>
            <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}