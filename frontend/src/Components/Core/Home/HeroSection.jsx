import React from 'react'
import images from '../../../utils/images'

const HeroSection = () => {
  return (
    <div className='flex'>
        <div className='w-5/12 flex flex-col justify-center items-start gap-5 '>
            <h2 className='font-bold text-[2.5rem] gap-6 flex flex-col'>
                {/* Welcome to <span>DINE</span><span>BYTES</span> POS Solution
                 */}
                 <span className={'leading-[44px]'}>
                 Empowering <br/> Your Restaurant Operations
                 </span>
                 <span className='text-base  font-normal'>
                 Streamline all aspects of your restaurant management with our cutting-edge POS system designed for efficiency and growth.
                 </span>
            </h2>
            <button className='border border-red-600 px-5 py-2 rounded-lg font-semibold text-red-600 hover:text-white hover:bg-red-600 transition-all'>
                Try it Now
            </button>
        </div>
        <div className=' w-9/12'>
            <img className='' src={images.restaurant3} alt="" />
        </div>
    </div>
  )
}

export default HeroSection