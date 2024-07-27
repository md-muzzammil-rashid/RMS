import React from 'react'
import NavBar from '../Components/Core/Home/NavBar'
import HeroSection from '../Components/Core/Home/HeroSection'
import FeatureComponent from '../Components/Common/FeatureComponent'
import images from '../utils/images'
import SectionTitle from '../Components/Common/SectionTitle'

const HomePage = () => {
  return (
    <main className='max-w-screen-lg font-poppins justify-center flex flex-col mx-auto relative'>
      <NavBar/>
      <HeroSection/>

      <SectionTitle title={'Our Features'} />

      <FeatureComponent image={images.billing}>
        <div className='justify-center items-start gap-4 flex flex-col w-9/12 mx-auto my-36'>
          <h2 className='bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent font-semibold text-3xl'>
            Quick and Easy Billing
          </h2>
          <h2 className='font-semibold text-xl'>
            Efficient and <span className='text-red-600'>User Friendly</span> Software
          </h2>
          <h2>
          Simplify order management, bill generation, and payment processing with just a few clicks.<br></br>
          Apply discounts and manage tables seamlessly.
          </h2>
        </div>
      </FeatureComponent>
      <FeatureComponent imageFirst image={images.restaurant1}>
        <div className='justify-center items-start gap-4 flex flex-col w-9/12 mx-auto my-36'>
          <h2 className='bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent font-semibold text-3xl'>
            Kitchen Display System
          </h2>
          <h2 className='font-semibold text-xl'>
            Optimize your <span className='text-red-600'>Kitchen </span> Overflow
          </h2>
          <h2>
          Realtime Digital display for kitchen orders to improve order accuracy and speed.<br/>
          Track and manage orders efficiently, reducing wait times and errors.
          </h2>
        </div>
      </FeatureComponent>
      <FeatureComponent  image={images.invoice}>
        <div className='justify-center items-start gap-4 flex flex-col w-9/12 mx-auto my-36'>
          <h2 className='bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent font-semibold text-3xl'>
            Generate Invoice 
          </h2>
          <h2 className='font-semibold text-xl'>
            Generate Invoice in <span className='text-red-600'>PDF </span> Format
          </h2>
          <h2>
          Digital display for kitchen orders to improve order accuracy and speed.<br/>
          Track and manage orders efficiently, reducing wait times and errors.
          </h2>
        </div>
      </FeatureComponent>
      <FeatureComponent imageFirst image={images.report}>
        <div className='justify-center items-start gap-4 flex flex-col w-9/12 mx-auto my-36'>
          <h2 className='bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent font-semibold text-3xl'>
          Comprehensive Reporting and Data Visualization 
          </h2>
          <h2 className='font-semibold text-xl'>
          Gain valuable  <span className='text-red-600'>business </span> insights
          </h2>
          <h2>
          Realtime Digital display for kitchen orders to improve order accuracy and speed.<br/>
          Track and manage orders efficiently, reducing wait times and errors.
          </h2>
        </div>
      </FeatureComponent>
    </main>
  )
}

export default HomePage