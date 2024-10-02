
import { useState, useEffect } from 'react';
import { fetchTickets } from '../utils/api';

const useTicketsData = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchTickets().then(data => {
      setTickets(data.tickets);
      setUsers(data.users);
    });
  }, []);

  return { tickets, users };
};

export default useTicketsData;
