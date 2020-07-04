import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import { currency } from "../../interfaces";

interface Props {
    optionsList: currency[] | [];
    selected: currency;
    setSelected: React.Dispatch<React.SetStateAction<currency>>;
}

const CustomSelect: React.FC<Props> = ({
    optionsList,
    selected,
    setSelected,
}) => {
    function handleClick(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        const target = event.target as HTMLLIElement;
        const targetSymbol = target.getAttribute("data-symbol")!;
        const targetName = target.getAttribute("data-name")!;
        setSelected({
            name: targetName,
            code: targetSymbol,
        });
    }
    return (
        <Dropdown dropdownTitle={selected.name}>
            <ul className="select-list">
                {(optionsList as Array<currency>).map((option: currency) => (
                    <li
                        key={option.index}
                        data-symbol={option.code}
                        data-name={option.name}
                        onClick={handleClick}
                    >
                        {option.name}
                    </li>
                ))}
            </ul>
        </Dropdown>
    );
};
export default CustomSelect;
