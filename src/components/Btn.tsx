import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CustomPrevArrow = (props: any) => (
  <div className="custom-prev-arrow" onClick={props.onClick}>
    <FontAwesomeIcon icon={faChevronLeft} />
  </div>
);

const CustomNextArrow = (props: any) => (
  <div className="custom-next-arrow" onClick={props.onClick}>
    <FontAwesomeIcon icon={faChevronRight} />
  </div>
);


export {CustomNextArrow, CustomPrevArrow};
