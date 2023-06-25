import { services } from '@/constants'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return  <div className="container max-w-7xl w-full mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(({description, id, image, title}) => (
          <div key={id} className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
}

export default page