import { useState, useEffect } from 'react'
import useSWR from 'swr'

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales)
  // const [isLoading, setIsLoading] = useState(false)

  const { data, error, isLoading } = useSWR('https://json.extendsclass.com/bin/8d20197934b7', fetch)
  
  useEffect(() => {
    async function getSales() {
      if (data) {
        try {
          const _data = await data.json()
          setSales(_data.sales)
        }catch(err) {
          console.log(err)
        }
      }
    }
    getSales()
  }, [data])
    
  // useEffect(() => {
  //   setIsLoading(true)
  //   fetch('https://json.extendsclass.com/bin/8d20197934b7')
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then(({ sales }) => {
  //       setSales(sales)
  //       setIsLoading(false)
  //     })
  // }, [])

  if (error) {
    return <p>Failed to load</p>
  }
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (!sales) {
    return <p>No data yet</p>
  }
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.name} - ${sale.volume}
        </li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://json.extendsclass.com/bin/8d20197934b7')
  const {sales} = await response.json()
  return {
    props: {
      sales
    }
  }
}
