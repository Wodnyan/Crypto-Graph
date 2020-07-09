import React from "react";
import "./style/CustomSelect.scss";
import Dropdown from "../Dropdown/Dropdown";
import { Currency } from "../../interfaces";

interface Props {
    optionsList: Currency[] | [];
    selected: Currency;
    setSelected: React.Dispatch<React.SetStateAction<Currency>>;
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
        <div className="select-container">
            <Dropdown dropdownTitle={selected.name}>
                <ul className="select-list">
                    {(optionsList as Array<Currency>).map(
                        (option: Currency) => (
                            <li
                                key={option.index}
                                data-symbol={option.code}
                                data-name={option.name}
                                onClick={handleClick}
                                className="select-list__item"
                            >
                                {option.name}
                            </li>
                        )
                    )}
                </ul>
            </Dropdown>
        </div>
    );
};
export default CustomSelect;
