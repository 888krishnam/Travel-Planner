import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { db } from "../services/Firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const Visited: React.FC = () => {
    const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
    const [tooltipContent, setTooltipContent] = useState<string | null>(null);

    const user = localStorage.getItem("user");
    const userEmail = user ? JSON.parse(user).email : null;

    const userDocRef = userEmail ? doc(db, "visited", userEmail) : null;

    useEffect(() => {
        const fetchVisited = async () => {
            if (!userDocRef) return;
            try {
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setVisitedCountries(data.countries || []);
                } else {
                    await setDoc(userDocRef, { countries: [] });
                    setVisitedCountries([]);
                }
            } catch (error) {
                console.error("Error fetching visited countries:", error);
            }
        };

        if (userEmail) {
            fetchVisited();
        }
    }, [userEmail, userDocRef]);

    const handleCountryClick = async (countryName: string) => {
        if (!userDocRef) return;
        try {
            if (visitedCountries.includes(countryName)) {
                await updateDoc(userDocRef, {
                    countries: arrayRemove(countryName),
                });
                setVisitedCountries((prev) =>
                    prev.filter((country) => country !== countryName)
                );
            } else {
                await updateDoc(userDocRef, {
                    countries: arrayUnion(countryName),
                });
                setVisitedCountries((prev) => [...prev, countryName]);
            }
        } catch (error) {
            console.error("Error updating visited countries:", error);
        }
    };

    return (
        <div style={{ backgroundColor: "#1E3A4C" }} className="">
            {tooltipContent && (
                <div className="absolute top-[400px] left-1/3 text-white">
                {tooltipContent}
                </div>
            )}
            <ComposableMap projectionConfig={{ scale: 150 }}>
                <Geographies geography={geoUrl}>
                    {({ geographies }: { geographies: { properties: { name: string } }[] }) =>
                        geographies.map((geo) => {
                            const countryName = geo.properties.name;
                            const isVisited = visitedCountries.includes(countryName);
                            return (
                                <Geography
                                    key={countryName}
                                    geography={geo}
                                    onClick={() => handleCountryClick(countryName)}
                                    onMouseEnter={() => setTooltipContent(countryName)}
                                    onMouseLeave={() => setTooltipContent(null)}
                                    fill={isVisited ? "#BACCD7" : "#EAFAEA"}
                                    stroke="#1E3A4C"
                                    style={{
                                        default: { outline: "none" },
                                        hover: {
                                            fill: "#809DAF",
                                            transition: "all 0.1s ease",
                                            outline: "none",
                                        },
                                        pressed: { outline: "none" },
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
            <h2 className="text-white -mt-6">
                Total Countries Visited: {visitedCountries.length}
            </h2>
        </div>
    );
};

export default Visited;