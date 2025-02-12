import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { useFetch } from "../../services/llamados";
import { useParams } from "react-router-dom";
import { getCookie } from "../../utils/Cookies";



const Informacion_academica = () => {
  const { id_usuario } = useParams();
  const [estudianteData, setEstudianteData] = useState([]);
  const token = getCookie("token");
  const { fetch_the_data } = useFetch();

  useEffect(() => {
    (async () => {
      const data = await fetch_the_data(
        "http://localhost:8000/api/get_estudiante_info",
        token,
        "GET",
        null,
        id_usuario
      );

      if (data[0] == 200) {
        const Lista = [];
        for (const key in data[1]) {
          Lista.push({
            key: key
              .split("_")
              .filter((x) => x != "_")
              .join(" "),
            value: data[1][key],
          });
        }
        setEstudianteData(Lista);
      }
    })();
  }, []);

  return (
    <Card
      sx={{
        width: "70%",
      }}
    >
      <CardHeader
        title={"Informacion academica"}
        subheader={"Informacion general de tu desempeño en fwd"}
      />
      <Divider />
      <CardContent>
        <Stack spacing={2} divider={<Divider flexItem />}>
          {estudianteData.map((x, i) => (
            <Stack
              direction={"row"}
              key={i}
              divider={<Divider orientation="vertical" flexItem />}
              spacing={1}
            >
              <Box width={"25%"}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    opacity: 0.5,
                  }}
                >
                  {x.key}
                </Typography>
              </Box>
              <Typography>{x.value}</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Informacion_academica;
