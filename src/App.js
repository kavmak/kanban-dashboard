import React, { useState } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import useFetchData from './hooks/api';

const App = () => {
  const { tickets, users, loading, error } = useFetchData();
  const [grouping, setGrouping] = useState('Status'); // Default grouping by Status
  const [ordering, setOrdering] = useState('Priority'); // Default ordering by Priority

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Sorting function based on the selected option
  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (ordering === 'Priority') {
        return b.priority - a.priority; // Descending order for Priority
      }
      return a.title.localeCompare(b.title); // Ascending order for Title
    });
  };

  // Group tickets based on the selected grouping option
  const groupedTickets = () => {
    const sortedTickets = sortTickets([...tickets]); // Ensure tickets are sorted before grouping

    if (grouping === 'Status') {
      return {
        Backlog: sortedTickets.filter(ticket => ticket.status === 'Backlog'),
        Todo: sortedTickets.filter(ticket => ticket.status === 'Todo'),
        'In Progress': sortedTickets.filter(ticket => ticket.status === 'In progress'),
        Done: sortedTickets.filter(ticket => ticket.status === 'Done'),
        Canceled: sortedTickets.filter(ticket => ticket.status === 'Canceled'),
      };
    } else if (grouping === 'Priority') {
      return {
        NoPriority: sortedTickets.filter(ticket => ticket.priority === 0),
        Urgent: sortedTickets.filter(ticket => ticket.priority === 1),
        High: sortedTickets.filter(ticket => ticket.priority === 2),
        Medium: sortedTickets.filter(ticket => ticket.priority === 3),
        Low: sortedTickets.filter(ticket => ticket.priority === 4),
      };
    } else if (grouping === 'User') {
      const userMap = {};
      users.forEach(user => {
        userMap[user.name] = sortedTickets.filter(ticket => ticket.userId === user.id);
      });
      return userMap; // Return tickets grouped by User
    }
    return {}; // Return an empty object if grouping is unrecognized
  };

  return (
    <div className="App">
      <Header grouping={grouping} setGrouping={setGrouping} ordering={ordering} setOrdering={setOrdering} />
      <Board tickets={groupedTickets()} users={users} grouping={grouping} /> {/* Pass grouping to Board */}
    </div>
  );
};

export default App;
