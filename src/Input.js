import React, { useEffect, useRef, useState } from "react";

import "./Input.css";
import './App.css'
const CloseIcon = () => {
    return (
        <svg height="20" width="20" viewBox="0 0 20 20">
            <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
        </svg>
    );
};

const Input = ({options,selectedValue,setSelectedValue}) => {
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        const handler = () => setShowMenu(false);

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });
    const handleInputClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const getDisplay = () => {
            return (
                <div className="dropdown-tags">
                    {selectedValue.slice(0,5).map((option) => (
                        <div key={option} className="dropdown-tag-item">
                            {option}
                            <span
                                onClick={(e) => onTagRemove(e, option)}
                                className="dropdown-tag-close"
                            >
                <CloseIcon />
              </span>
                        </div>
                    ))}
                    {  selectedValue.length>5 ?
                        <div className="dropdown-tag-item">
                           + { selectedValue.slice(5).length}...
                        </div>
                        : ""
                    }
                    <input type="text" className="inputForNew" onBlur={valueFromKeyboard}/>
                </div>
            );

    };

    const removeOption = (option) => {
        return selectedValue.filter((o) => o !== option);
    };

    const onTagRemove = (e, option) => {
        e.stopPropagation();
        const newValue = removeOption(option);
        setSelectedValue(newValue);
    };

    const onItemClick = (option) => {
        let newValue;
            if (selectedValue.findIndex((o) => o === option) >= 0) {
                newValue = removeOption(option);
            } else {
                newValue = [...selectedValue, option];
            }

            setSelectedValue(newValue);
    };
    const valueFromKeyboard =(e)=> {
        e.preventDefault()
        let val= e.target.value;
        if(val) {
            setSelectedValue([...selectedValue, val])
        }
        e.target.value=null;

    }
    const isSelected = (option) => {
            return selectedValue.filter((o) => o === option).length > 0;
    };


    return (
        <div className="dropdown-container">
            <div onClick={handleInputClick} className="dropdown-input">
                <div className="dropdown-selected-value">{getDisplay()}
                </div>
            </div>
            {showMenu && (
                <div className="dropdown-menu">
                    {options.map((option) => (
                        <div
                            onClick={() => onItemClick(option)}
                            key={option}
                            className={`dropdown-item ${isSelected(option) && "selected"}`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Input;
