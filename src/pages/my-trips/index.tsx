import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/Firebase';
import { Trip } from '../../types/Interface';
import TripCard from './TripCard';

function History() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) {
          navigate('/');
          return;
        }

        const user = JSON.parse(userString) as { email: string };

        const tripsQuery = query(
          collection(db, "trips"),
          where("email", "==", user.email)
        );

        const querySnapshot = await getDocs(tripsQuery);

        const tripsData: Trip[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          tripsData.push({
            id: doc.id,
            ...data
          } as Trip);
        });
        setTrips(tripsData);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [navigate]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="px-5 mt-10 mb-10 sm:px-10 md:px-32 lg:px-56 xl:px-72">
      <h2 className="font-bold text-3xl">
        My Trips 🏕️🌴
      </h2>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {trips.map((trip, index) => (
          <TripCard trip={trip} key={index}/>
        ))}
      </div>
    </div>
  );
}

export default History;