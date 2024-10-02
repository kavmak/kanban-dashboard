import { useState, useEffect } from 'react';

const useFetchData = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const jsonData = await response.json();
        setTickets(jsonData.tickets || []);
        setUsers(jsonData.users || []);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { tickets, users, loading, error };
};

export default useFetchData;
