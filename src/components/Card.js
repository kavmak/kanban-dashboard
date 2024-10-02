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

const Card = ({ ticket, grouping }) => {
  const { id, title, status, priority, userAvatar, featureRequest, tag } = ticket;

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

      <div className="ticket-title">{title}</div>

      {/* Conditional rendering based on grouping */}
      {grouping === 'Priority' && (
        <>
          <div className="notification-icon">
            {statusIcons[status] ? (
              <img src={statusIcons[status]} alt={status} />
            ) : (
              <span>Status Icon Missing</span>
            )}
          </div>
          {featureRequest && <div className="feature-request"><p>{featureRequest}</p></div>}
        </>
      )}

      {grouping === 'User' && (
        <>
          <div className="notification-icon">
            {statusIcons[status] ? (
              <img src={statusIcons[status]} alt={status} />
            ) : (
              <span>Status Icon Missing</span>
            )}
            <span>{status}</span>
          </div>
          <div className="notification-icon">
            {priorityIcons[priority] ? (
              <img src={priorityIcons[priority]} alt={priority} />
            ) : (
              <span>Priority Icon Missing</span>
            )}
            <span>{priority}</span>
          </div>
          {featureRequest && <div className="feature-request"><p>{featureRequest}</p></div>}
        </>
      )}

      {grouping === 'Status' && (
        <>
          <div className="priority-icon">
            {priorityIcons[priority] ? (
              <img src={priorityIcons[priority]} alt={priority} />
            ) : (
              <span>Priority Icon Missing</span>
            )}
          </div>
          {featureRequest && <div className="feature-request"><p>{featureRequest}</p></div>}
        </>
      )}

      <div className="ticket-footer">
        <span className="ticket-tag">{tag}</span>
      </div>
    </div>
  );
};

export default Card;
