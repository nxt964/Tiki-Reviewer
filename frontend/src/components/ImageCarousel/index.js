import { useState } from 'react';
import styles from './ImageCarousel.module.css'
import Carousel from 'react-bootstrap/Carousel';
import IconChevronLeft from "../icons/IconChevronLeft";
import IconChevronRight from "../icons/IconChevronRight";

function ImageCarousel({images, className}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel 
        activeIndex={index} 
        className={className}
        onSelect={handleSelect}
        prevIcon={<IconChevronLeft color="#fff"/>}
        nextIcon={<IconChevronRight color="#fff"/>}
    >
        {images.map((image, index) => {
            return (
                <Carousel.Item key={index}>
                    <img src={image} alt='img' className="img-fluid" style={{objectFit: 'contain'}}></img>
                </Carousel.Item>
            );
        })}
    </Carousel>
  );
}

export default ImageCarousel;