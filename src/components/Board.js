import React from 'react';
import Card from './Card';
import svg1 from '../assets/icons/No-priority.svg';
import svg2 from '../assets/icons/SVG - Urgent Priority colour.svg';
import svg3 from '../assets/icons/Img - High Priority.svg';
import svg4 from '../assets/icons/Img - Medium Priority.svg';
import svg5 from '../assets/icons/Img - Low Priority.svg';
import threedot from '../assets/icons/3 dot menu.svg';
import addicon from '../assets/icons/add.svg';
import doneIcon from '../assets/icons/Done.svg';
import canceledIcon from '../assets/icons/Cancelled.svg';
import inProgress from '../assets/icons/in-progress.svg';
import backlogIcon from '../assets/icons/Backlog.svg';
import todoIcon from '../assets/icons/To-do.svg';

const priorityIcons = {
  NoPriority: svg1,
  Urgent: svg2,
  High: svg3,
  Medium: svg4,
  Low: svg5,
};

const statusIcons = {
  Backlog: backlogIcon,
  Todo: todoIcon,
  'In Progress': inProgress,
  Done: doneIcon,
  Canceled: canceledIcon,
};

const userIcons = {
  User1: addicon,
  User2: addicon,
  // Add more user icons as needed
};

const getIconForGroup = (group, grouping) => {
  if (grouping === 'Priority') {
    return priorityIcons[group] || null;
  } else if (grouping === 'Status') {
    return statusIcons[group] || null;
  } else if (grouping === 'User') {
    return userIcons[group] || null;
  }
  return null;
};

const Board = ({ tickets, grouping }) => {
  return (
    <div className="kanban-board">
      {Object.keys(tickets).map((group) => (
        <div key={group} className="kanban-column">
          <div className="column-header">
            <img src={getIconForGroup(group, grouping)} alt="Group Icon" className="priority-icon" />
            <span className="group-prior">{group}</span>
            <span className="ticket-count">{tickets[group].length}</span>
            <div className="extras">
              <span className="plus"><img src={addicon} alt="Add Icon" /></span>
              <span className="threedot"><img src={threedot} alt="Three Dot Menu" /></span>
            </div>
          </div>
          <div className="ticket-list">
            {tickets[group].map((ticket) => (
              <Card
                key={ticket.id}
                ticket={ticket}
                grouping={grouping} // Pass the current grouping to the card
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
