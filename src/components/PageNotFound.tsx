import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="85.7vh"
            textAlign="center"
            padding={2}
            bgcolor="#EAFAEA"
        >
            <Typography variant="h3" gutterBottom>
                Oops! Page Not Found
            </Typography>
            <Typography variant="h6" gutterBottom>
                The page you're looking for doesn't exist or has been moved.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                style={{ marginTop: '1.5rem' }}
            >
                Go to Home
            </Button>
        </Box>
    );
}

export default PageNotFound;