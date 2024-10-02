import React, { useState } from 'react';
import Dropdown from './Dropdown';
import DisplayIcon from '../assets/icons/Display.svg';
import DownIcon from '../assets/icons/down.svg';

const Header = ({ grouping, setGrouping, ordering, setOrdering }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false); // Manage dropdown visibility
  const groupOptions = ['Status', 'Priority', 'User'];
  const orderOptions = ['Priority', 'Title'];

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  return (
    <header className="kanban-header">
      <div className="display-button">
        <button onClick={toggleDropdown}>
          <img src={DisplayIcon} alt="Display" /> Display <span className="chevron"><img src={DownIcon} alt="down arrow" /></span>
        </button>
        {dropdownVisible && (
          <div className="dropdown-menu">
            <div className="dropdown">
              <label>Grouping</label>
              <Dropdown options={groupOptions} selected={grouping} onChange={setGrouping} />
            </div>
            <div className="dropdown">
              <label>Ordering</label>
              <Dropdown options={orderOptions} selected={ordering} onChange={setOrdering} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
