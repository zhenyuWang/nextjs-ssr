export default function ProductDetailPage({ id }) {
  return <h1>userId: {id}</h1>
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  }
}
