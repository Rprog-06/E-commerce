import api from './api'

export const placeOrder=async(orderData)=>
    api.post('/orders',orderData)
export const getOrderById=async(id)=>
    api.get(`/orders/${id}`)
export const updateOrderStatus=async(id,status)=>
    api.put(`/orders/${id}/status`,null,
{
    params:{status}
});

