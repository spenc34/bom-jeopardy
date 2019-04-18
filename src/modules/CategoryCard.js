import React from 'react';
import '../css/Card.css';

const CategoryCard = (props) => {
    return (
        <div className="Card">
            {props.title.toUpperCase()}
        </div>
    );
};

export default CategoryCard;