import React, { useState, useRef, useEffect } from "react";

interface Dropdown {
    dropdownTitle: string;
    children: React.ReactNode;
}

const Dropdown: React.FC<Dropdown> = ({ dropdownTitle, children }) => {
    const [display, setDisplay] = useState(true);
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
        <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown-title" onClick={handleClick}>
                {dropdownTitle}
            </div>
            {display && <div className="dropdown">{children}</div>}
        </div>
    );
};

export default Dropdown;
