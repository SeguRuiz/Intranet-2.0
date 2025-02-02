import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const MuiModal = ({
  acceptFunction,
  Title = "Titulo del modal",
  body = "contenido del modal",
  open = false,
  setOpen,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        fullWidth
      >
        <DialogTitle>{Title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Denegar
          </Button>
          <Button onClick={acceptFunction}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MuiModal;
