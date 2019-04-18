import React from "react";
import CategoryCard from './CategoryCard';
import '../css/Card.css'

const CategoryRow = (props) => {
    return (
        <div className="row">
            <div className="col">
                <CategoryCard title={props.categories[0].title}/>
            </div>
            <div className="col">
                <CategoryCard title={props.categories[1].title} />
            </div>
            <div className="col">
                <CategoryCard title={props.categories[2].title}/>
            </div>
            <div className="col">
                <CategoryCard title={props.categories[3].title}/>
            </div>
            <div className="col">
                <CategoryCard title={props.categories[4].title}/>
            </div>
        </div>
    );
}

export default CategoryRow;