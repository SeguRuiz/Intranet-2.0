import { ListItem, ListItemIcon, ListItemText, Skeleton } from "@mui/material";

const ListItemLoader = ({ cantidad = 1 }) => {
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
      {createAnArray().map((x, i) => (
        <ListItem key={i}>
          <ListItemIcon>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={40}
              height={40}
            />
          </ListItemIcon>
          <ListItemText>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem" }}
              animation="wave"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", width: 80 }}
              animation="wave"
            />
          </ListItemText>
        </ListItem>
      ))}
    </>
  );
};

export default ListItemLoader;
