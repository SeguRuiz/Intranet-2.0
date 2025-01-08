import RectangularLoader from "../../../loaders/RectangularLoader"
import { Skeleton } from "@mui/material"
const UsuariosLoader = () => {
  return (
    <RectangularLoader
          cantidad={15}
          bgcolor="var(--SurfaceLow-color)"
          height="35vh"
          width="37vh"
          borderRadius="5px"
        >
          <div className="user-info-card">
            <div className="user-Profile">
              <div className="user-avatar-container">
                <Skeleton
                  variant="circular"
                  height={40}
                  width={40}
                  animation="wave"
                />
              </div>

              <div className="user-name" style={{}}>
                <div></div>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={"50%"}
                  sx={{
                    borderRadius: 1,
                    fontSize: 20,
                    height: "75%",
                    marginRight: "5px",
                  }}
                />
              </div>
            </div>
            <div className="user-info-text">
              <div className="user-nombre">
                <Skeleton
                  variant="text"
                  animation="wave"
                  width={"95%"}
                  sx={{ fontSize: 28 }}
                />
              </div>
              <div className="user-nombre">
                <Skeleton
                  variant="text"
                  animation="wave"
                  width={"95%"}
                  sx={{ fontSize: 28 }}
                />
              </div>
              <div className="user-nombre">
                <Skeleton
                  variant="text"
                  animation="wave"
                  width={"95%"}
                  sx={{ fontSize: 28 }}
                />
              </div>
            </div>
          </div>
        </RectangularLoader>
  )
}

export default UsuariosLoader
