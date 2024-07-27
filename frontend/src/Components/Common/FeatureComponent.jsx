import React from 'react'

const FeatureComponent = ({children, imageFirst=false, image, imageClass=''}) => {
  return (

    <div className='flex my-5'>
        {
            imageFirst ? 
            <>
            <div className='w-1/2'>
            <img src={image} alt="" className={` ${imageClass} `} />
            </div>
            <div className='w-1/2'>
                {children}
            </div>
            </>
            :
            <>
            <div className='w-1/2'>
            {children}
            </div>
            <div className='w-1/2'>
                <img src={image} alt="" className={` ${imageClass} `} />
            </div>
            </>

        }
    </div>
  )
}

export default FeatureComponent