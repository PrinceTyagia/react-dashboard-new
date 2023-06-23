import { useState } from "react";

const ToggleSwitch = ({isChecked,setIsChecked}) => {
  

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  
  return (
    <div className="form-check form-switch">
      
      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
        {isChecked
          ? "Percentage On"
          : "Percentage Off"}
      </label>

      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckChecked"
        checked={isChecked}
        onChange={handleToggle}
      />

    </div>
  );
};

export default ToggleSwitch;
