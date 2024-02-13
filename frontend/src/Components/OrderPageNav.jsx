import React from 'react'

const OrderPageNav = ({setFromDate, setToDate}) => {
  const setDateToIso = (date)=>{

  }
  const fromDateHandler = (e) =>{
    setFromDate(e.target.value+"T00:00:00.000Z")
  }
  const toDateHandler = (e) =>{
    setToDate(e.target.value+"T23:59:59.999Z")

  }
  return (
    <div className='sticky top-0 gap-3 bg-orange-100 flex w-full justify-between pl-72 hover:bg-orange-200-72 box-border p-1 items-center z-10 '>
      <form action="" className='gap-4 flex'> 
      <label htmlFor="">From</label>
        <input type="date" name="" id="" onChange={fromDateHandler} />
      <label htmlFor="">To</label>
        <input onChange={toDateHandler} type="date" name="" id="" />
      </form>
    </div>
  )
}

export default OrderPageNav