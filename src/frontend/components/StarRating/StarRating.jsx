import React, { useState } from 'react'

export default function StarRating({maxStars = 5,initialRating = 0}){
    const [hovered,Sethovered] = useState(0)
    const [rating,SetRating] = useState(initialRating)

  return (
    <div>
      {[...Array(maxStars)].map((_,index)=>{
        const starIndex = index + 1;
        const isFilled = starIndex <= (hovered||rating)

        return(
            
            <span data-aos="fade-down" data-aos-delay="400" key={index} style={{cursor:"pointer","color":isFilled?"gold":"black",fontSize:"30px"}} onMouseEnter={()=>Sethovered(starIndex)} onMouseLeave={()=>Sethovered(0)} onClick={()=>SetRating(starIndex)}>★</span>
        )
      })}
    </div>
  )
}

