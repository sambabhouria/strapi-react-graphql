import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'



// import useFetch from '../hooks/useFetch'




const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
        data {
            attributes {
              title,
              rating,
              body,
              categories {
                data {
                    id,
                    attributes {
                      name
                    }
                  },
            }
            },
            id,
        }
    },
  }
`

export default function ReviewDetails() {
  const { id } = useParams()

  // rest api call :

  //   const { loading, error, data } = useFetch('http://localhost:1337/api/reviews/' + id)

  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  // for res api 
  //   console.log(data)
  const {review} = data;
  
  // for graphq
  console.log(review)

  return (
    <div className="review-card">
      <div className="rating">{review?.data?.attributes?.rating}</div>
      <h2>{review?.data?.attributes?.title}</h2>

      {/* <small>console list</small> */}

      {review?.data?.attributes?.categories?.data?.map(c => (
        <small key={c.id}>{c.attributes?.name}</small>
      ))}

      <p>{review?.data?.attributes?.body}</p>
    </div>
  )
}