import React from 'react'
import styles from '@/style';
import { servicesContent } from '@/constants';
import ServicesCard from './ServicesCard';


const Services = () => (
  <section className='sm:py-16 py-6 w-full'> 
    <div className='container max-w-7xl mx-auto'>
      <h3 className='text-2xl font-bold text-dimPurple sm:pb-9 pb-6 w-full text-center'>Our Services</h3>
      <div className={` grid grid-cols-fluid gap-6`}>

      {servicesContent.map(item => <ServicesCard key={item.id} {...item} />)}
      </div>
    </div>
  </section>
)

export default Services