import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaSalesforce } from 'react-icons/fa'
import { SiBuymeacoffee, SiCashapp } from 'react-icons/si'

const Dashboard = () => {
  const [dailySales, setDailySales] = useState([])
  const [dailySalesDateRange, setDailySalesDateRange] = useState(31)
  const [mostSellingProduct, setMostSellingProducts] = useState([])
  const [mostSellingProductRevenue, setMostSellingProductsRevenue] = useState([])
  const [mostSellingProductDateRange, setMostSellingProductsDateRange] = useState(31)
  const [monthlySalesNumbers, setMonthlySalesNumber] = useState()
  const [dailySalesNumber, setDailySalesNumber] = useState()
  const navigate = useNavigate()

  const getDailySales = async () => {
    try {
      const res = await axios.get(`/api/v1/reports/daily-sales?day=${dailySalesDateRange}`, { headers: { Authorization: localStorage.getItem('AccessToken') } })
  
      const convertedDailySalesData = [['Day', 'Revenue', 'TotalRevenue']]
      let runningSum = 0
      res.data.data.forEach(item => {
        // console.log(item);
        runningSum = runningSum + item.value.total
        convertedDailySalesData.push([item.date, item.value.total, runningSum])
      })
      setDailySales(convertedDailySalesData)
    } catch (error) {
      if(error.response.status===401){
        console.log('navigating');
        navigate('/login')
      }
        }
  }
  const getMostSellingProduct = async () => {
    try {
      const res = await axios.get(`/api/v1/reports/most-selling-product?day=${mostSellingProductDateRange}`, { headers: { 'Authorization': localStorage.getItem("AccessToken") } })
  
      const convertedMostSellingProduct = [["product", "quantity"]];
      const mostSellingProductRevenue = [['Product', 'Revenue', { role: 'style' }]]
      const defaultChartColors = [
        '#4285F4', // Blue
        '#DB4437', // Red
        '#F4B400', // Yellow
        '#0F9D58', // Green
        '#AB47BC', // Purple
        '#26C6DA', // Cyan
        '#EC407A', // Magenta
        '#66BB6A', // Lime
        '#b92f2e', // Orange
        '#306394', // Pink
      ];
  
      let counter = 0
      res.data.data.forEach(item => {
        // console.log(item);
        const itemSold = `${item.itemsDetails[0].itemName} : ${item.itemsDetails[0].variant} - Qty : ${item.quantity}`;
        const quantity = item.quantity;
        const revenue = quantity * (item.itemsDetails[0].price)
        // console.log(quantity, itemSold,revenue);
        mostSellingProductRevenue.push([itemSold, revenue, defaultChartColors[counter]])
        convertedMostSellingProduct.push([itemSold, quantity]);
        counter++
      });
  
  
  
      setMostSellingProducts(convertedMostSellingProduct)
      setMostSellingProductsRevenue(mostSellingProductRevenue)
    } catch (error) {

      if(error.response.status===401){
        console.log('navigating');
        navigate('/login')
      }
    }

  }
  
const getMonthlySalesNumber=async()=>{
  try {
    const res = await axios.get(`/api/v1/reports/total-sales?type=m`, { headers: { Authorization: localStorage.getItem('AccessToken') } })
    console.log(res.data.data);
    setMonthlySalesNumber(res.data.data[0])
  } catch (error) {
    if(error.response.status === 401) {
      navigate('/login')
    }
  }
}
const getDailySalesNumber=async()=>{
  try {
    const res = await axios.get(`/api/v1/reports/total-sales?`, { headers: { Authorization: localStorage.getItem('AccessToken') } })
    console.log(res.data.data);
    setDailySalesNumber(res.data.data[0])
  } catch (error) {
    if(error.response.status===401){
      navigate('/login')
    }
    }
}
useEffect(()=>{
  getMonthlySalesNumber()
  getDailySalesNumber()
},[])
  
  useEffect(() => {
    getMostSellingProduct()
  }, [mostSellingProductDateRange])

  useEffect(() => {
    getDailySales()
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
              options={{ title: "Most Selling Products", pieHole: 0.4 }}
              data={mostSellingProduct}


            />
          </div>
          <div className='overflow-hidden border bg-white  rounded-xl '>
            <Chart
              chartType='ColumnChart'
              className='pt-7'
              width={'100%'}
              height={'400px'}
              options={{ title: "Most Selling Products (Revenue)", hAxis: { title: 'Products' }, vAxis: { title: 'Revenue' }, colors: ['white'] }}
              data={mostSellingProductRevenue}


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