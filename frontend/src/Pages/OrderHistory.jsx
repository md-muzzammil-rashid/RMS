import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaDownload, FaReceipt } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import Pagination from "@mui/material/Pagination"
import { TailSpin } from "react-loader-spinner"
import OrderPageNav from '../Components/OrderPageNav'

const OrderHistory = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [pageLength, setPageLength] = useState(1)
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const getOrderHistory = async () => {
        setLoading(true)
        const res = await axios.get(`/api/v1/orders/order-history?fromDate=${fromDate}&toDate=${toDate}&page=${page}&limit=10`, { headers: { Authorization: localStorage.getItem("AccessToken") } })
        if (res.data.statusCode === 200) {
            setData(res.data.data.userData)
            setPageLength(res.data.data.len)
            if(res.data.data.len < page){
                setPage(res.data.data.len)
            }
            console.log(res.data.data.userData);
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
        <div className='pl-72'>
            <OrderPageNav setFromDate={setFromDate} setToDate={setToDate}/>
            {loading ?
                <div className='w-full h-screen justify-center items-center flex'>
                    <TailSpin />
                </div>
                :
                <div>
                    <div className='flex  font-bold text-white bg-green-500  p-4 m-3 gap-5 rounded-lg'>
                        <div className='w-24 text-ellipsis flex-shrink-0' >OrderId</div>
                        <div className='w-24 flex-shrink-0' >Date</div>
                        <div className=' flex-shrink-0 w-32' >Customer Name</div>
                        <div className=' flex-shrink-0 w-24'  >Contact</div>
                        <div className='flex-grow ' >Items</div>
                        <div className='flex-grow-0 flex-shrink-0 w-20 text-start' >Price</div>
                        <div className='flex-grow-0 flex-shrink-0 w-16 items-center' >Receipt</div>
                    </div>
                    {data?.map((item, index) => (

                        <div key={item._id} onClick={() => navigate(`/order-summery/${item._id}`)} className={`flex cursor-pointer justify-between  text-ellipsis overflow-hidden overflow-ellipsis p-4 m-3 rounded-lg gap-5 font-semibold hover:bg-opacity-100 text-start border bg-opacity-50 ${index % 2 == 0 ? "bg-green-50" : "bg-green-100"} `}>
                            <div className='w-24 text-ellipsis overflow-hidden flex-shrink-0 ' >{item._id.slice(18, 24)}</div>
                            <div className='w-24 flex-shrink-0' >{item.createdAt.slice(0, 10)}</div>
                            <div className=' flex-shrink-0 w-32' >{item.customerName}</div>
                            <div className=' flex-shrink-0 w-24'  >{item.customerContact}</div>
                            <div className='flex-grow text-ellipsis overflow-hidden w-full  ' >{item.items.map((itm) => (itm.variants.variant + "  | "))}</div>
                            <div className='flex-grow-0 flex-shrink-0 w-20' >&#8377; {item.total}</div>
                            <div className='flex-grow-0 flex-shrink-0 w-16 items-center flex justify-center' ><FaDownload color='green' /></div>
                        </div>
                    ))}
                </div>}
            <div className='flex justify-center items-center w-full'>
                <Pagination count={pageLength} onChange={handlePage} page={page} variant="outlined" shape="rounded" />
            </div>
        </div>
    )
}

export default OrderHistory