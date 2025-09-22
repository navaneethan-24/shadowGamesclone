import productCategories, { Category } from "@/data/productCategories";
import { Box,  CardMedia,  Typography } from "@mui/material";
import Grid,{GridProps} from "@mui/material/Grid";

const GridItem = Grid as React.FC<GridProps & { item?: boolean }>

export default function HeroCategory(){
    return ( 
        <Box sx={{ pt : 2 , }}>
            <Grid container spacing={9}  justifyContent="center" 
            sx={{ display: {xs:"none", md:"flex" , flexWrap:"nowrap", overflowX :"hidden" }}}>
                {productCategories.map((cat:Category) =>(
                  <GridItem key={cat.id} sx={{ flex:" 1 1 auto", minWidth:0}}>

                        <Box sx={{display:"flex",flexDirection:"column", cursor: "pointer", alignItems:"center", gap: 2}}>
                            <CardMedia component="img"
                            image={cat.image}
                            alt={cat.name}
                            sx={{ height: 35,objectFit:"contain", mb: 0 }}/>

                            <Typography variant="body1"  fontSize="14px"  sx= {{display:"flex",justifyContent:"center" , alignItems:"center", maxWidth: 100, minHeight: 50, mx:"auto" ,textAlign:"center"}}
                            >{cat.name}</Typography>
                        
                            

                        </Box>
 
                    </GridItem>
                ))}
              
            </Grid>

        </Box>
        
    )
}