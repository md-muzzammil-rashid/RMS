import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import { useNavigate } from 'react-router-dom'
import { SiBuymeacoffee, SiCashapp } from 'react-icons/si'
import { } from '../utils/constants'
import { getDailySales, getDailySalesNumber, getMonthlySalesNumber, getMostSellingProduct } from '../Services/Operations/ReportAPI'

const Dashboard = () => {
  const [dailySales, setDailySales] = useState([])
  const [dailySalesDateRange, setDailySalesDateRange] = useState(31)
  const [mostSellingProduct, setMostSellingProducts] = useState([])
  const [mostSellingProductRevenue, setMostSellingProductsRevenue] = useState([])
  const [mostSellingProductDateRange, setMostSellingProductsDateRange] = useState(31)
  const [monthlySalesNumbers, setMonthlySalesNumber] = useState()
  const [dailySalesNumber, setDailySalesNumber] = useState()
  const navigate = useNavigate()

  const getDailySalesReport = async () => {
      const res = await getDailySales({dailySalesDateRange})
  
      if(res.status)
        setDailySales(res.convertedDailySalesData)
    
        
  }
  const getMostSellingProductReport = async () => {
    const res = await getMostSellingProduct({mostSellingProductDateRange})
    if(res.status){
      setMostSellingProducts(res.convertedMostSellingProduct)
      setMostSellingProductsRevenue(res.mostSellingProductRevenue)
    }
  } 

  
  
const getMonthlySalesNumberReport=async()=>{
  try {
    const res = await getMonthlySalesNumber()
    setMonthlySalesNumber(res)
    
  } catch (error) {
    console.log(error);
  }
}
const getDailySalesNumberReport=async()=>{
  try {
    const res = await getDailySalesNumber()
    setDailySalesNumber(res)
    console.log(res);
  } catch (error) {
    if(error.response.status===401){
      navigate('/login')
    }
    }
}
useEffect(()=>{
  getMonthlySalesNumberReport()
  getDailySalesNumberReport()
},[])
  
  useEffect(() => {
    getMostSellingProductReport()
  }, [mostSellingProductDateRange])

  useEffect(() => {
    getDailySalesReport()
  }, [dailySalesDateRange])


  return (
    <div className='my-bg'>
      <div className='grid-cols-4 grid gap-7 m-6 text-white min-h-28 '>
        <div className='bg-red-600  justify-center h-28 p-4 items-center  rounded-2xl flex'>
        <div className='flex flex-col w-8/12'>
          <span className='font-semibold text-2xl '>Today's Sales</span>
          <span className='font-extrabold text-4xl'><span className='text-2xl'>Rs.</span> {dailySalesNumber?.total || 0}</span>
        </div>
        <SiCashapp className='text-7xl'/>
        </div>
        <div className='bg-green-600  justify-center h-28 p-4 items-center  rounded-2xl flex'>
        <div className='flex flex-col w-8/12'>
          <span className='font-semibold text-2xl  '>Today's Orders</span>
          <span className='font-extrabold text-4xl'>{dailySalesNumber?.totalOrders || 0}</span>
        </div>
        <SiBuymeacoffee className='text-7xl'/>
        </div>
        <div className='bg-cyan-600  justify-center h-28 p-4 items-center  rounded-2xl flex'>
        <div className='flex flex-col w-8/12'>
          <span className='font-semibold text-2xl '>Monthly Sales</span>
          <span className='font-extrabold text-4xl'><span className='text-2xl'>Rs.</span> {monthlySalesNumbers?.total || 0}</span>
        </div>
        <SiCashapp className='text-7xl'/>
        </div>
        <div className='bg-yellow-600 h-28 p-4 justify-center items-center  rounded-2xl flex'>
        <div className='flex flex-col w-8/12'>
          <span className='font-semibold text-2xl '>Monthly Orders</span>
          <span className='font-extrabold text-4xl '>{monthlySalesNumbers?.totalOrders || 0}</span>
        </div>
        <SiBuymeacoffee className='text-7xl'/>
        </div>

      </div>
      <div className='relative'>
      <div className=' font-bold absolute top-4 left-20  p-2   z-50'>
          <span>Range : </span>        <select value={mostSellingProductDateRange} onChange={e => setMostSellingProductsDateRange(e.target.value)} name="" id="">
          <option value="0">Today</option>
          <option value="7">7 Days</option>
          <option value="31">31 Days</option>
          <option value="91">3 Months</option>
          <option value="178">6 Months</option>
          <option value="358">1 Year</option>
        </select>
      </div>
        <div className=' grid grid-cols-2 gap-8 mx-6 rounded-3xl overflow-hidden '>
          <div className='overflow-hidden border pt-7 rounded-xl '>
            <Chart
              className='scale-110 '
              chartType='PieChart'
              width={'100%'}
              height={'400px'}
              options={{ title: "Most Selling Products", pieHole: 0.4,  }}
              data={mostSellingProduct}


            />
          </div>
          <div className='overflow-hidden border bg-white  rounded-xl '>
            <Chart
              chartType='ColumnChart'
              className='pt-7'
              width={'100%'}
              height={'400px'}
              data={mostSellingProductRevenue}
              options={{ title: "Most Selling Products (Revenue)", hAxis: { title: 'Products' }, vAxis: { title: 'Revenue' }, colors: ['white'] }}


            />
          </div>

        </div>
      </div>


      <div className='relative my-7'>
        <div className=' font-bold absolute top-4 left-20  p-2   z-50'>
          <span>Range : </span>
          <select value={dailySalesDateRange} onChange={e => setDailySalesDateRange(e.target.value)} name="" id="">
            <option value="0">Today</option>
            <option value="7">7 Days</option>
            <option value="31">31 Days</option>
            <option value="91">3 Months</option>
            <option value="178">6 Months</option>
            <option value="358">1 Year</option>
          </select>
        </div>
        <div className='overflow-hidden border rounded-xl  mx-6'>
        <Chart
          chartType='AreaChart'
          width={'100%'}
          height={'450px'}
          data={dailySales}
          loader={'loading'}
          
          options={{ title: 'Sales', legend: { position: "bottom" }, curveType: "function", series: { 0: { color: 'green' }, 1: { color: 'orange' } }, fillOpacity: 0.4 }}
          />
          </div>
      </div>

    </div>
  )
}

export default Dashboard