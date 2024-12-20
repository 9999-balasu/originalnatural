
import React, { useContext } from 'react'
import Title from  '../components/Title.jsx'
import CartTotal from '../components/CartTotal.jsx'
import { assets } from '../assets/assets.js'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { toast } from 'react-toastify';
import axios from 'axios';


const PlaceOrder = () => {
  const[method,setMethod] = useState('cod');
  const{navigate,backendUrl, token, cartItems, setCartItems,getCartAmount, delivery_fee, products} = useContext(ShopContext);
 const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  country: '',
  phone: ''
 })

 const onChangeHandler = (event) => {
  const name = event.target.name;
  const value = event.target.value
  setFormData(data => ({...data,[name]:value}))

 }

/* const onSubmitHandler = async (event) => {
  event.preventDefault()
  try {
  let orderItems = []
  for(const items in cartItems){
for (const item in cartItems[items] ){
if (cartItems[items][item] > 0){
  const itemInfo = structuredClone(products.find(product => product._id === items))
  if(itemInfo){
    itemInfo.size = item
    itemInfo.quantity = cartItems[items][item]
    orderItems.push(itemInfo)
  }
}
}
  }
 // console.log(orderItems);

 let orderData= {
  address: formData,
  items : orderItems,          
  amount:getCartAmount() + delivery_fee
 }
 switch (method){
// API calls for COD
case 'cod':
 
  const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
  console.log(response.data);
  if (response.data.success){
    setCartItems({})
    navigate('/orders')
  }else{
    toast.error(response.data.message)
  }
break;
default:
 }
  } catch(error){
console.log(error)
toast.error(error.message)
  }

 }*/
 
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const itemKey in cartItems) {
        for (const size in cartItems[itemKey]) {
          if (cartItems[itemKey][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === itemKey));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemKey][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }
  
      // Check cart amount and delivery fee
      const cartAmount = getCartAmount();
      console.log('Cart Amount:', cartAmount);
      console.log('Delivery Fee:', delivery_fee);
  
      // Calculate total amount safely
      const totalAmount = (typeof cartAmount === 'number' ? cartAmount : 0) + 
                          (typeof delivery_fee === 'number' ? delivery_fee : 0);
      console.log('Total Amount:', totalAmount);
  
      const orderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount
      };
  
      // Ensure the amount is valid
      if (isNaN(orderData.amount) || orderData.amount <= 0) {
        toast.error('Total amount must be greater than zero.');
        return;
      }
  
      // API call logic
      switch (method) {
        case 'cod':
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        default:
          toast.error('Payment method not supported.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.message);
    }
  };
  

  return (
    <form  onSubmit ={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-14 min-h-[80vh] border-top'>
      {/*---------------- Left Side ----------- */}
<div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
<div className='text-xl sm:text-2xl my-3'>
<Title  text1={'DELIVERY'} text2={'INFORMATION'}/>
</div>
<div className='flex gap-3'>
  <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name'/>
  <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name'/>

</div>

<input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email address'/>
<input required  onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street'/>
<div className='flex gap-3'>
  <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City'/>
  <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State'/>
</div>
<div className='flex gap-3'>
  <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='ZipCod'/>
  <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country'/>

</div>

  <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone'/>
  


</div>
{/* ----------------- Right Side -------------------- */}
<div className='mt-8'>
  <div className='mt-8 min-w-80'>
 <CartTotal/>
  </div>
  <div className='mt-12'>
<Title text1 = {'PAYMENT'} text2 ={'METHOD'} />
{/* ------------- Payment Method Selection ------------  */}
<div className='flex gap-3 flex-col lg:flex-row'>
  <div  onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
    <p className={`w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-green-400': ''}`} ></p>
    <img  className='h-5 mx-4' src={assets.stripe_logo} alt="" />

  </div>
  <div   onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
    <p className={`w-4 h-4 border rounded-full ${method === 'razorpay' ? 'bg-green-400': ''}`} ></p>
    <img  className='h-15 mx-4' src={assets.razorpay_logo} alt="" />

  </div>
 
  <div  onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
    <p className={`w-4 h-4 border rounded-full  ${method === 'cod' ? 'bg-green-400': ''}`}></p>
    <p className=' text-gray-500 text-sm font-medium mx-3'>CASH ON DELIVERY</p>

  </div>

</div>


<div className='w-full text-end mt-8'>
  <button type='submit' className='bg-black text-white px-16 py-3 text-sm'> PLACE ORDER</button>
</div>
  </div>
</div>
    </form>
  )
}

export default PlaceOrder 




//chat


/*
import React, { useContext, useState } from 'react';
import Title from '../components/Title.jsx';
import CartTotal from '../components/CartTotal.jsx';
import { assets } from '../assets/assets.js';
import { ShopContext } from '../context/ShopContext.jsx';
import axios from 'axios'; // Ensure you import axios if not already
import { toast } from 'react-toastify'; // Import toast for notifications

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
    email: '' // Ensure email is included in form data
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const orderItems = [];
      for (const itemKey in cartItems) {
        for (const size in cartItems[itemKey]) {
          if (cartItems[itemKey][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === itemKey));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemKey][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      console.log(orderItems);

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        // ApI calls for COD
        case 'cod':
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        default:
          toast.error('Payment method not supported.');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-14 min-h-[80vh] border-t'>
      {/*---------------- Left Side ----------- */
     /* <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Zip Code' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='tel' placeholder='Phone' />
      </div>
      {/* ----------------- Right Side -------------------- */
     /* <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* ------------- Payment Method Selection ------------  */
        /* </form> <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`} ></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`w-4 h-4 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`} ></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-3'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;*/
