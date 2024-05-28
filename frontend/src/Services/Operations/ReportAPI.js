import { defaultChartColors } from "../../utils/constants";
import { apiConnector } from "../apiconnector";
import { reportEndPoint } from "../apis";

const ACCESS_TOKEN = localStorage.getItem("AccessToken")

const getMostSellingProduct = async ({mostSellingProductDateRange}) => {
    try {
      const res = await apiConnector("GET", reportEndPoint.MOST_SELLING_PRODUCT,{},{Authorization:localStorage.getItem('AccessToken')}, {day:mostSellingProductDateRange})
  
      const convertedMostSellingProduct = [["product", "quantity"]];
      const mostSellingProductRevenue = [['Product', 'Revenue', { role: 'style' }]]

  
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
  
      return {
        status:true,
        convertedMostSellingProduct,
        mostSellingProductRevenue
      }
    } catch (error) {
        console.log(error);
        return false
    }

  }

  const getDailySales = async ({dailySalesDateRange}) => {
    try {
    const res = await apiConnector("GET", reportEndPoint.DAILY_SALES, {}, {Authorization: localStorage.getItem('AccessToken')}, {day:dailySalesDateRange})
  
      const convertedDailySalesData = [['Day', 'Revenue', 'TotalRevenue']]
      let runningSum = 0
      res.data.data.forEach(item => {
        // console.log(item);
        runningSum = runningSum + item.value.total
        convertedDailySalesData.push([item.date, item.value.total, runningSum])
      })
      return {
        status: true,
        convertedDailySalesData
      }
    } catch (error) {
      return false
        }
  }

  const getMonthlySalesNumber=async()=>{
    try {
    const res = await apiConnector("GET", reportEndPoint.TOTAL_SALES, {}, {Authorization: localStorage.getItem('AccessToken')}, {type:"m"})
    return res.data.data[0]
    } catch (error) {
      return false
    }
    }

    const getDailySalesNumber=async()=>{
        try {
          const res = await apiConnector("GET", reportEndPoint.TOTAL_SALES,{},{Authorization:localStorage.getItem('AccessToken')})
          return res.data.data[0]
        } catch (error) {
          console.log(error);
          return false
          }
      }
  export{
    getMostSellingProduct,
    getDailySales,
    getMonthlySalesNumber,
    getDailySalesNumber
    
  }