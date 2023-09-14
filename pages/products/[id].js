import fs from 'fs'
import path from 'path'

export default function ProductDetailPage({ product }) {
  // with fallback: true
  if (!product) {
    return <p>Loading...</p>
  }
  const { title, description } = product
  return (
    <>
      <h1>title: {title}</h1>
      <p>description: {description}</p>
    </>
  )
}

export async function getStaticProps({ params }) {
  const id = params.id
  const products = getData()
  const product = products.find((product) => product.id === id)
  // with fallback: true if no product go 404 page
  if (!product) {
    return { notFound: true }
  }

  return {
    props: {
      product,
    },
  }
}

export async function getStaticPaths() {
  const products = getData()
  const pathWithParams = products.map((product) => ({ params: { id: product.id } }))
  return {
    // paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
    // paths: [{ params: { id: '1' } }],
    paths: pathWithParams,
    // https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths#how-does-getstaticprops-run-with-regards-to-getstaticpaths
    fallback: true,
    // fallback: false,
    // fallback: 'blocking',
  }
}

function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  return JSON.parse(fs.readFileSync(filePath)).products
}
