import React from 'react';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import data from './data.js'



const Landing = () => {
  return (
    
      <div>

<Carousel 
  slideSize="80%"    
  height={800}        
  slideGap="xl"       
  controlsOffset="md" 
  controlSize={60} 
  controlColor="white"   
  style={{  marginRight: 'auto' , marginTop: 'auto' }}
  withIndicators 
>
  {data.map((item, index) => (
    <Carousel.Slide key={index}>
      <div 
        style={{ 
          width: '100%', 
          height: '100%', 
          backgroundImage: `url(${item.image})`, 
          backgroundSize: 'cover',    
          backgroundPosition: 'center', 
        }} 
        alt={item.title} 
      />
    </Carousel.Slide>
  ))}
</Carousel> 
      </div>
     
    
  );
};

export default Landing;
