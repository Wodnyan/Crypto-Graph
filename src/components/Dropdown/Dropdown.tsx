import React, { useState, useRef, useEffect } from "react";
import arrow from "./images/multimedia.svg";
import "./style/Dropdown.scss";

interface Dropdown {
    dropdownTitle: string;
    children: React.ReactNode;
}

const Dropdown: React.FC<Dropdown> = ({ dropdownTitle, children }) => {
    const [display, setDisplay] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function detectClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDisplay(false);
            }
        }
        document.addEventListener("click", detectClickOutside);
        return () => {
            document.removeEventListener("click", detectClickOutside);
        };
    });
    function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setDisplay((prev) => !prev);
    }
    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown__select" onClick={handleClick}>
                <div className="dropdown__select-title">{dropdownTitle}</div>
                <div className="dropdown__select-arrow">
                    <img src={arrow} alt="arrow down" />
                </div>
            </div>
            {display && <div className="dropdown__children">{children}</div>}
        </div>
    );
};

export default Dropdown;
