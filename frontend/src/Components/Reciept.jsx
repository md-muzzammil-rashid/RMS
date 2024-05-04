import React from 'react'
import {Document, Page, Text, View, StyleSheet, Image, } from '@react-pdf/renderer'
import { useSelector } from 'react-redux'

const style = StyleSheet.create({
    view: {
        marginHorizontal:10, 
        alignItems:'center',
        
    },
    document:{width:'full'},
    text_small:{
        fontSize:10,
        textAlign:'center'
    },
    text_bold:{
        fontWeight:'extrabold'
    },
    table:{
        marginHorizontal:15,
        display:'grid',
        flexDirection:'row',
        fontSize:12,
        
    },
    td_grow:{
        flexGrow:1,
        textAlign:'left',
        maxWidth:90,
        minWidth:90,
        fontSize:12,
        marginBottom:10
        
    },
    td_shrink:{
        flexShrink:1,
        width:50,
        textAlign:'center',
        fontSize:12,
        marginBottom:10
                
    },
    th_grow:{
        flexGrow:1,
        textAlign:'left',
        maxWidth:88,
        minWidth:88,
        fontSize:12,
    },
    th_shrink:{
        flexShrink:1,
        width:40,
        textAlign:'center',
        fontSize:12,    
    },
    td_qty:{
        flexShrink:1,
        width:30,
        textAlign:'center',
        fontSize:12,     
    },
    bottom:{
        display:'grid',
        fontSize:13,
        flexDirection:'row',
        marginHorizontal:15
    },
    bottom_data :{
        flex:1,
        textAlign:'right'
    }
})


const Reciept = ({receiptData}) => {
    const restaurant = useSelector(state=>state.user.data.user?.restaurant)
    return(
        <Document style={style.document}>
        <Page size={[226,650]} style={style.page}>
            <View style={style.view}>
                <Text style={style.text_bold} >{restaurant.restaurantName}</Text>
                <Text style={style.text_small}>{restaurant.restaurantLocation?.address || ""}</Text>
                <Text style={style.text_small}>Tel:{restaurant.contactNumber || ""}</Text>
                <Text style={style.text_small}>Date: {receiptData.createdAt.slice(0,10)}</Text>
                <Text style={style.text_small}>Order Id: {receiptData.orderId}</Text>
                <Text style={style.text_small}>Name: {receiptData.customerName}</Text>
                <Text>---------------------------------</Text>

            </View>
            <View style={style.table}>
                <Text style={style.th_shrink}> ID </Text>
                <Text style={style.th_grow}>ITEM </Text>
                <Text style={style.td_qty}> QTY </Text>
                <Text style={style.th_shrink}> PRICE</Text>
            </View>
            <View style={style.view}>
                <Text>---------------------------------</Text>
            </View>
            {
                receiptData.items.map((item)=>(
                    <View style={style.table}>
                <Text style={style.td_shrink}> {item.itemId} </Text>
                <Text style={style.td_grow}> {item.name} : {item.variants.variant} </Text>
                <Text style={style.td_qty}> {item.quantity} </Text>
                <Text style={style.td_shrink}> {item.quantity*item.variants.price}</Text>
            </View>
                ))
            }
            
            <View style={style.view}>
                <Text>---------------------------------</Text>
            </View>
            <View style={style.bottom}>
                <Text style={style.bottom_data}> Sub Total </Text>
                <Text style={style.bottom_data}>  : Rs.</Text>
                <Text style={style.bottom_data}> {receiptData.subTotal+receiptData.tax}</Text>
            </View>
            <View style={style.bottom}>
                <Text style={style.bottom_data}> Discount </Text>
                <Text style={style.bottom_data}>  : Rs.</Text>
                <Text style={style.bottom_data}> {receiptData.discountAmount}</Text>
            </View>
            <View style={style.bottom}>
                <Text style={style.bottom_data}> Total </Text>
                <Text style={style.bottom_data}>  : Rs.</Text>
                <Text style={style.bottom_data}> {receiptData.total}</Text>
            </View>
            <View style={style.view}>
                <Text>---------------------------------</Text>
                <Text style={style.text_bold}>THANK YOU!</Text>
            </View>
        </Page>
    </Document>
        )
}

export default Reciept