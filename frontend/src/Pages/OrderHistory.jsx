import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaDownload, FaReceipt, FaRecordVinyl } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import Pagination from "@mui/material/Pagination"
import { TailSpin } from "react-loader-spinner"
import OrderHistoryTile from '../Components/OrderHistoryTile'
import OrderHistoryPageNav from '../Components/OrderHistoryPageNav'
import { BASE_URL } from '../utils/constants'

const OrderHistory = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [pageLength, setPageLength] = useState(1)
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const navigate = useNavigate()
    const getOrderHistory = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/orders/order-history?fromDate=${fromDate}&toDate=${toDate}&page=${page}&limit=10`, { headers: { Authorization: localStorage.getItem("AccessToken") } })
            
            if (res.data?.statusCode === 200) {
                setData(res.data.data.userData)
                setPageLength(res.data.data.len)
                if(res.data.data.len < page){
                    setPage(res.data.data.len)
                }
                console.log(res.data.data.userData);
            }
        } catch (error) {
            if(error.response.status===401){
                navigate('/login')
            }
            
        }

        setLoading(false)
    }
    const handlePage = (e, value) => {
        setPage(value)
    }

    useEffect(() => {
        console.log(fromDate);
        console.log(toDate);
        getOrderHistory()
    }, [page, fromDate, toDate])
    return (
        <div className='w-full '>
            <OrderHistoryPageNav setFromDate={setFromDate} setToDate={setToDate}/>
            {loading ?
                <div className='w-full h-screen justify-center items-center flex'>
                    <TailSpin />
                </div>
                :
                <div className='flex flex-col '>
                    <div className='flex  font-semibold text-zinc-500 bg-zinc-400 bg-opacity-20  p-4 m-3 gap-3 rounded-lg'>
                        <div className='w-24 text-ellipsis flex-shrink-0' >OrderId</div>
                        <div className='w-24 flex-shrink-0' >Date</div>
                        <div className=' flex-shrink-0 w-32' >Customer Name</div>
                        <div className=' flex-shrink-0 w-24'  >Contact</div>
                        <div className='flex-grow ' >Items</div>
                        <div className='flex-grow-0 flex-shrink-0 w-20 text-start' >Price</div>
                        <div className='flex-grow-0 flex-shrink-0 w-16 items-center' >Status</div>
                    </div>
                    {data?.map((item, index) => (
                        <OrderHistoryTile key={index} item={item} index={index}/>
                        
                    ))}
                </div>}
            <div className='flex justify-center items-center w-full my-4'>
                <Pagination count={pageLength} onChange={handlePage} page={page} variant="outlined" shape="rounded" />
            </div>
        </div>
    )
}

export default OrderHistory