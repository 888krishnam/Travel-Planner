import { useState } from "react";
import { SingleValue, CSSObjectWithLabel } from "react-select";
import { useNavigate } from "react-router-dom";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

import Login from "../../components/Login";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "./Options.ts";
import { User, Option, FormData } from "../../types/Interface";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/Firebase";
import { chatSession } from "../../services/Gemini.ts";

function CreateTrip() {

    const navigate = useNavigate();
    const [destination, setDestination] = useState<SingleValue<Option>>();
    const [formData, setFormData] = useState<FormData>({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const [dialogOpen, setDialogOpen] = useState(false);

    const checkLogin = () => {
        const user = localStorage.getItem("user");
        if (user) {
            generateTrip();
        } else {
            setDialogOpen(true);
        }
    }

    const generateTrip = async () => {
        if (!formData?.destination || !formData?.days || !formData?.budget || !formData?.people) {
            toast.error("Please fill all the fields !", {
                position: "bottom-left",
            });
            return;
        }
        setLoading(true);
        const PROMPT = AI_PROMPT
            .replace("{destination}", destination?.label || "")
            .replace("{days}", formData?.days)
            .replace("{budget}", formData?.budget)
            .replace("{people}", formData?.people);
        toast.success("Generating Trip...");
        const result = await chatSession.sendMessage(PROMPT);
        setLoading(false);
        saveTrip(result?.response?.text());
    }

    const saveTrip = async (TripData: string) => {
        setLoading(true);
        const user: User = JSON.parse(localStorage.getItem("user") || "");
        const docId = Date.now().toString();
        await setDoc(doc(db, "trips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            email: user.email,
            id: docId,
        });
        setLoading(false);
        navigate(`/view/` + docId);
    }

    return (
        <div className="px-5 mt-10 mb-10 sm:px-10 md:px-32 lg:px-56 xl:px-72">
            <h2 className="font-bold text-3xl">
                Tell us your travel preferences🏕️🌴
            </h2>
            <p className="mt-3 text-gray-500 text-xl">
                {" "}
                Just provide some basic information, and our trip planner will generate
                a customized itinerary based on your preferences.{" "}
            </p>
            <div className="mt-20 flex flex-col">
                <h2 className="text-xl my-3 font-medium">
                    What is the destination of your choice?
                </h2>
                <GooglePlacesAutocomplete
                    apiKey={import.meta.env.VITE_PLACE_API_KEY}
                    selectProps={{
                        value: destination,
                        onChange: (e) => {
                            setDestination(e);
                            if (e) handleInputChange('destination', e.value.description);
                        },
                        styles: {
                            container: (provided: CSSObjectWithLabel) => ({
                              ...provided,
                              border: '1px solid #0a3906ff',
                            }),
                            menu: (provided: CSSObjectWithLabel) => ({
                                ...provided,
                                backgroundColor: '#EAFAEA',
                            }),
                        }
                    }}
                />
            </div>

            <div className="mt-10 flex flex-col">
                <h2 className="text-xl my-3 font-medium">
                    For how many days are you planning your trip?
                </h2>
                <Input
                    type="number"
                    placeholder="Enter number of days"
                    inputProps={{ min: 1, max: 10 }}
                    onChange={(e) => {
                        handleInputChange('days', e.target.value);
                    }}
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    className="mt-1 px-3 py-2 rounded-md shadow-sm sm:text-sm"
                />
            </div>

            <div className="mt-10 flex flex-col">
                <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
                <div className="grid grid-cols-3 gap-5 mt-5">
                    {SelectBudgetOptions.map((item, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                handleInputChange("budget", item.title)
                            }
                            className={`p-4 rounded-lg hover:scale-105 hover:shadow-lg cursor-pointer ${formData?.budget === item.title ? 'shadow-lg scale-105 border border-black' : ''
                                }`}
                        >
                            <h2 className="text-4xl">{item.icon}</h2>
                            <h2 className="font-bold text-lg">{item.title}</h2>
                            <h3 className="text-sm text-gray-500">{item.desc}</h3>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-10 flex flex-col">
                <h2 className="text-xl my-3 font-medium">
                    Who do you plan on traveling with on your next adventure?
                </h2>
                <div className="grid grid-cols-3 gap-5 mt-5">
                    {SelectTravelesList.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange("people", item.people)}
                            className={`p-4 rounded-lg hover:shadow-lg hover:scale-105 cursor-pointer ${formData?.people === item.people ? 'shadow-lg scale-105 border border-black' : ''}`}
                        >
                            <h2 className="text-4xl">{item.icon}</h2>
                            <h2 className="font-bold text-lg">{item.title}</h2>
                            <h3 className="text-sm text-gray-500">{item.desc}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-10 flex justify-end">
                <Button 
                    onClick={checkLogin} 
                    variant="contained" 
                    loading={loading}
                >
                    Generate Trip
                </Button>
            </div>

            <Login
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onLoginSuccess={generateTrip}
            />
        </div>
    );
}

export default CreateTrip;