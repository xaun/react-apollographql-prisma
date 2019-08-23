import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

export const Feed = () => {
  const { loading, error, data } = useQuery(gql`
    {
      feed {
        title
      }
    }
  `)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return data.feed.map((title, index) => (
    <div key={index}>
      <p>{title}</p>
    </div>
  ))
}
