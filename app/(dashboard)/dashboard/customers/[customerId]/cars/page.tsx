import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
    return <div>all cars belonging to a customer

    {/* Add ability for admin to add/delete cars */}

    <p>Edit car make</p>
    <p>year</p>
    <p>model</p>
    <p>plateNumber: optional</p>
  </div>
}

export default page