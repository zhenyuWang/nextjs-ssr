import fs from 'fs'
import path from 'path'

export default function Home({ products }) {
  return <ul>{products.map((product) => <li key={product.id}>{product.title}</li>)}</ul>
}


export async function getStaticProps() {
  // static
  // return {
  //   props: {
  //     // products: [
  //     //   { id: '1', title: 'Product 1' },
  //     //   { id: '2', title: 'Product 2' },
  //     //   { id: '3', title: 'Product 3' },
  //     // ],
  //   },
  // }

  // dynamic
  console.log('Re-Generating...')
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const products = JSON.parse(fs.readFileSync(filePath)).products
  return {
    props: {
      products
    },
    revalidate: 10,
    // notFound: true, // 该值如果为真，返回 404 页面
    // redirect: {
    //   destination: '/other-page', // 重定向到 /other-page 页面
    // }
  }
}