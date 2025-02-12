import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/Firebase";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Info from "./Info";
import { Trip } from "../../../types/Interface";
import Hotels from "./Hotels";
import Itinerary from "./Itinerary";

function View() {
    const { tripId } = useParams<{ tripId: string }>();
    const [trip, setTrip] = useState<Trip | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const getTripData = async () => {
                if (tripId) {
                    const docRef = doc(db, "trips", tripId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        console.log(docSnap.data());
                        setTrip(docSnap.data());
                    } else {
                        toast.error("Invalid tripId");
                        navigate("/404");
                    }
                } else {
                    toast.error("No tripId provided");
                    navigate("/404");
                }
        };
        getTripData();
    }, [tripId, navigate]);

    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            <Info {...trip} />
            <Hotels {...trip} />
            <Itinerary {...trip} />
        </div>
    );
}

export default View;