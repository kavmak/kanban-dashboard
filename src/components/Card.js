import React from 'react';
import '../assets/styles/kanban.css';
import svg1 from '../assets/icons/No-priority.svg';
import svg2 from '../assets/icons/SVG - Urgent Priority colour.svg';
import svg3 from '../assets/icons/Img - High Priority.svg';
import svg4 from '../assets/icons/Img - Medium Priority.svg';
import svg5 from '../assets/icons/Img - Low Priority.svg';
import doneIcon from '../assets/icons/Done.svg';
import canceledIcon from '../assets/icons/Cancelled.svg';
import inProgress from '../assets/icons/in-progress.svg';
import backlogIcon from '../assets/icons/Backlog.svg';
import todoIcon from '../assets/icons/To-do.svg';

// Priority icons mapping
const priorityIcons = {
  NoPriority: svg1,
  Urgent: svg2,
  High: svg3,
  Medium: svg4,
  Low: svg5,
};

// Status icons mapping
const statusIcons = {
  Backlog: backlogIcon,
  Todo: todoIcon,
  'In Progress': inProgress,
  Done: doneIcon,
  Canceled: canceledIcon,
};

// Helper functions to normalize the values
const normalizePriority = (priority) => {
  switch (priority) {
    case 0: return 'NoPriority';
    case 1: return 'Urgent';
    case 2: return 'High';
    case 3: return 'Medium';
    case 4: return 'Low';
    default: return 'NoPriority';
  }
};

const normalizeStatus = (status) => {
  switch (status.toLowerCase()) {
    case 'backlog': return 'Backlog';
    case 'todo': return 'Todo';
    case 'in progress': return 'In Progress';
    case 'done': return 'Done';
    case 'canceled': return 'Canceled';
    default: return 'Backlog';
  }
};

const Card = ({ ticket, grouping }) => {
  const { id, title, status, priority, userAvatar, featureRequest, tag } = ticket;

  // Conditionally get the status icon
  const progressIcon = statusIcons[normalizeStatus(status)];

  return (
    <div className="ticket-card">
      <div className="heading-card">
        <div className="ticket-id">{id}</div>

        {/* Conditionally display user avatar on the top-right based on grouping */}
        {grouping !== 'User' && userAvatar && (
          <div className="user-avatar-top-right">
            <img src={userAvatar} alt="User Avatar" />
          </div>
        )}
      </div>

      <div className="ticket-title">
        {/* Conditionally display the progress icon before the title if grouped by User or Priority */}
        <div className='titles-club'>
          {(grouping === 'User' || grouping === 'Priority') && (
            <img src={progressIcon} alt="Progress Icon" className="progress-icon" />
          )}
          {title}
        </div>
      </div>

      {/* Render icons based on the grouping */}
      {grouping === 'Priority' && (
       <div className="ticket-footer">
       {featureRequest && <div id="feature-request-left"><p>{featureRequest}</p></div>}
     </div>
     
      )}

      {grouping === 'User' && (
        <span className="notification-icon">
          <img src={priorityIcons[normalizePriority(priority)]} alt={priority} />
          {featureRequest && <div className="feature-request"><p>{featureRequest}</p></div>}
        </span>
      )}

      {/* Ticket footer logic for Status grouping */}
      <div className="ticket-footer">
        {grouping === 'Status' && (
          <>
            <span className="priority-footer">
              <img src={priorityIcons[normalizePriority(priority)]} alt={priority} />
              {/* Render the feature request in the footer if present */}
              {featureRequest && <div className="feature-request-footer"><p>{featureRequest}</p></div>}
            </span>
          </>
        )}
        <span className="ticket-tag">{tag}</span>
      </div>
    </div>
  );
};

export default Card;
