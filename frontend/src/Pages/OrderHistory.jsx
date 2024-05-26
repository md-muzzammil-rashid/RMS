import React, { useEffect, useState } from 'react'
import Pagination from "@mui/material/Pagination"
import { TailSpin } from "react-loader-spinner"
import OrderHistoryTile from '../Components/Core/OrderHistory/OrderHistoryTile'
import OrderHistoryPageNav from '../Components/Core/OrderHistory/OrderHistoryPageNav'
import { getOrderHistory } from '../Services/Operations/OrderAPI'

const OrderHistory = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [pageLength, setPageLength] = useState(1)
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")

    const orderHistory =async () => {
        setLoading(true)
        const res = await getOrderHistory({fromDate, toDate, page, limit:10})
        if (res) {
            setData(res.userData)
            setPageLength(res.len)
            setLoading(false)
            if(res.len < page){
                setPage(res.len)
            }
        }
    }

    const handlePage = (e, value) => {
        setPage(value)
    }

    useEffect(() => {
        console.log(fromDate);
        console.log(toDate);
        orderHistory()
    }, [page, fromDate, toDate])
    return (
        <div className='w-full '>
            <OrderHistoryPageNav setFromDate={setFromDate} setToDate={setToDate}/>
            {loading ?
                <div className='w-full h-screen justify-center items-center flex'>
                    <TailSpin />
                </div>
                :
                <div className='flex flex-col w-full '>
                    <div className='flex  font-semibold text-zinc-500 bg-zinc-400 bg-opacity-20  p-4 m-3 gap-3 rounded-lg'>
                        <div className='w-24 text-ellipsis flex-shrink-0' >OrderId</div>
                        <div className='w-24 flex-shrink-0' >Date</div>
                        <div className=' flex-shrink-0 w-32' >Customer Name</div>
                        <div className=' flex-shrink-0 w-24'  >Contact</div>
                        <div className='flex-grow ' >Items</div>
                        <div className='flex-grow-0 flex-shrink-0 w-20 text-start' >Price</div>
                        <div className='flex-grow-0 flex-shrink-0 w-16 items-center' >Status</div>
                    </div>
                    {data?
                    data.map((item, index) => (
                        <OrderHistoryTile key={index} item={item} index={index}/>
                    )
                )
                :
                <span className='min-w-full text-center font-semibold text-3xl pt-16 items-center  text-stone-600 min-h-40'>No Records</span>
            }
                </div>}
            <div className='flex justify-center items-center w-full my-4'>
                <Pagination count={pageLength} onChange={handlePage} page={page} variant="outlined" shape="rounded" />
            </div>
        </div>
    )
}

export default OrderHistory