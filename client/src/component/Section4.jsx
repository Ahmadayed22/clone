
import { Typography, Box, Grid } from "@mui/material"; // Only import Grid once

import Rectangle1 from '../assets/Rectangle 1.png';
import Rectangle2 from '../assets/Rectangle 2.png';
import Rectangle3 from '../assets/Rectangle 3.png';
import Rectangle4 from '../assets/Rectangle 4.png';
import Rectangle5 from '../assets/Rectangle 5.png';
import Rectangle6 from '../assets/Rectangle 6.png';
import Rectangle7 from '../assets/Rectangle 7.png';
import Rectangle8 from '../assets/Rectangle 8.png';
import Rectangle9 from '../assets/Rectangle 9.png';


const Section4 = () => {
    return (
        <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                #FuniroFurniture
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {/* Left Grid */}
                <Grid item xs={12} sm={4} container spacing={2}>
                    <Grid item xs={2}><img src={Rectangle1} alt="" /></Grid>
                    <Grid item xs={10} display="flex" alignItems="flex-end" marginBottom={"20px"}><img src={Rectangle2} alt="" width="100%" /></Grid>
                    <Grid item xs={4}><img src={Rectangle3} alt="" width="100%" /></Grid>
                    <Grid item xs={8}><img src={Rectangle4} alt="" width="100%" /></Grid>
                </Grid>

                {/* Center Image */}
                <Grid item xs={2} sm={4} display="flex" justifyContent="center" alignItems="center">
                    <img src={Rectangle5} alt="" width="100%" />
                </Grid>

                {/* Right Grid */}
                <Grid item xs={12} sm={4} container spacing={2}>
                    <Grid item xs={6}><img src={Rectangle6} alt="" width="100%" /></Grid>
                    <Grid item xs={6}><img src={Rectangle7} alt="" width="100%" /></Grid>
                    <Grid item xs={6}><img src={Rectangle8} alt="" width="100%" /></Grid>
                    <Grid item xs={6}><img src={Rectangle9} alt="" width="100%" /></Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Section4;
