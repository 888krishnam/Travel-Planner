import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { LoginInterface, User } from "../types/Interface";

function Login({ open, onClose, onLoginSuccess }: LoginInterface) {

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`,
                        },
                    }
                );
                const userInfo: User = res.data;
                console.log("User Info:", userInfo);
                localStorage.setItem("user", JSON.stringify(userInfo));
                onClose();
                onLoginSuccess();
            } catch (err) {
                toast.error(`Login Failed: ${err}`, { position: "bottom-left" })
            }
        },
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Travel Planner</DialogTitle>
            <DialogContent>
                Sign in to Plan your Next Trip
            </DialogContent>
            <div className="p-2">
                <Button
                    onClick={() => login()}
                    variant="contained"
                    fullWidth
                >
                    <FcGoogle className="h-6 w-6 mr-2" />Sign in With Google
                </Button>
            </div>
        </Dialog>
    );
}

export default Login;