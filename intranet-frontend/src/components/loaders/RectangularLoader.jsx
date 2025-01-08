import { Box, Paper, Skeleton } from "@mui/material";

const RectangularLoader = ({
  cantidad = 1,
  height = "10vh",
  width = "10vh",
  bgcolor = "white",
  borderRadius = "5px",
  children,
}) => {
  if (cantidad < 0) {
    throw new Error(
      "Solo se aceptan numeros positivos al indicar el numero de listas necesitadas."
    );
  }
  const createAnArray = () => {
    const array_a_iterar = [];
    for (let x = 0; x < cantidad; x++) {
      array_a_iterar.push(x);
    }
    return array_a_iterar;
  };
  return (
    <>
      {createAnArray().map((x) => (
        <Box sx={{height: height, width: width, bgcolor: bgcolor, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: borderRadius}} key={x}>
           {children}
        </Box>
      ))}
    </>
  );
};

export default RectangularLoader;
