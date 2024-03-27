import React from "react";
import "./categorycards.scss"

interface CategoryCardsProps {
    id: number;
    title: string;
    img: string;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ id, title, img }) => {
    return (
        <div className="category__card">
            <p>ID: {id}</p>
            <img src={img} alt={title} className="category__images"/>
            <h2 className="category__title">{title}</h2>
        </div>
    );
}
