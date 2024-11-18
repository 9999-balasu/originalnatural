
import React from 'react'
import Title from  '../components/Title.jsx'
import { assets } from '../assets/assets.js'
import NewsletterBox from '../components/NewsletterBox.jsx'

const About = () => {
  return (
    <div>
     <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ABOUT'} text2={'US'}/>

      </div> 
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img  className = 'w-full md:max-w-[450px]' src={assets.about_img} alt=""/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta consectetur recusandae mollitia quis provident officiis ab beatae nobis accusantium sint.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque est nulla ratione nesciunt quo. Ea repudiandae debitis iure corporis placeat.</p>
 <b className='text-gray-800'>Our Misson</b>
 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium ratione aliquid dignissimos vitae perspiciatis dolores quis consectetur animi modi doloremque.

 </p>
        </div>

      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />

      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>

     <b>Quality Assurance:</b>
     <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptates praesentium hic minus placeat nobis nemo obcaecat.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>

<b>Convenience:</b>
<p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptates praesentium hic minus placeat nobis.</p>
   </div>
   <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>

<b>Exceptional Customer Service:</b>
<p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptates praesentium hic minus placeat.</p>
   </div>  

      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About