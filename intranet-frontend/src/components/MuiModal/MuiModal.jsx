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
  maxWidth = 30,
  fullWidth = false,
  setOpen,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
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
