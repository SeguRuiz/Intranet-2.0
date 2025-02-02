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
  Info = false,
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
            variant="text"
          >
            {Info ? "Aceptar" : "Denegar"}
          </Button>
          {!Info && (
            <Button onClick={acceptFunction} variant="text">
              Aceptar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MuiModal;
