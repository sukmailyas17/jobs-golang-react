import { Hero, SearchBar, CustomFilter, Card } from '@/components'
import { fetchData } from '@/utils'

export default async function Home({ searchParams }: any) {
  const datas = await fetchData({
    manufacturer: searchParams.manufacturer || '',
    model: searchParams.model || '',
  })
  const data = datas.data
  const isDataEmpty = !Array.isArray(data) || data.length < 1 || !data;
  console.log("tes")
  return (
    < main className="overflow-hidden" >
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>
            Jobs Catalogue
          </h1>
          <p>Explore jobs you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar title="search" />
        </div>
        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {data?.map((x) => (
                <Card data={x} />
              ))}

            </div>
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl'>Ooops, no result</h2>
            {/* <p>{datas.message}</p> */}
          </div>
        )
        }
      </div >
    </main >
  )
}
