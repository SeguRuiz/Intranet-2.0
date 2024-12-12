import Retractile_menu from "../../Retractile_menu/Retractile_menu";

const Read_grupos_vacio = () => {
  return (
    <Retractile_menu altura={50}>
      <div className="select-grupos-vacio">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="100px"
          viewBox="0 -960 960 960"
          width="100px"
          fill="#3f4850"
        >
          <path d="M393-480q-21 0-34.5-16t-9.5-36l15-90q8-43 40.5-70.5T480-720q44 0 76.5 27.5T597-622l15 90q4 20-9.5 36T568-480H393Zm18-60h139l-12-72q-4-21-20-34.5T480.5-660q-21.5 0-37.5 13.5T423-612l-12 72ZM139-408.9q-20 .9-34.85-7.9-14.85-8.8-19.35-27.28Q83-452 84.5-460t4.5-15.33q0 .91-1-3.67 0-1-8.8-21.06Q77-511 81-519.5q4-8.5 12-16.5l2-2q2-17 13.78-28 11.77-11 29.22-11 1 0 16.16 3l2.84-1q5-4 11.67-6.5 6.66-2.5 14.16-2.5 9.17 0 17.17 3.5 8 3.5 12.3 9.62.86 0 1.29.44.43.44 1.29.44 12.05.87 21.09 7.44Q245-556 250-544.67q2 6.11 1.5 11.77-.5 5.67-2.5 10.9 0 2 1 3 6.07 6.15 9.53 13.62Q263-497.91 263-490q0 2-5 18.19-1 1.91 0 3.81 1 4 1 14 0 18-15.22 31.55-15.21 13.55-36.95 13.55H139Zm668.91-1.1q-28.91 0-49.41-20.69-20.5-20.69-20.5-49.74 0-10.57 3.5-20.07T750-518l-25-22q-8-8-3-18t15.53-10h70.24q28.97 0 49.6 20.67Q878-526.65 878-497.62v17.59q0 29.03-20.59 49.53t-49.5 20.5ZM0-240v-53q0-39.46 42-63.23Q84-380 150.4-380q12.16 0 23.38.5 11.22.5 22.22 2.23-8 17.27-12 34.84-4 17.57-4 37.43v65H0Zm240 0v-65q0-65 66.5-105T480-450q108 0 174 40t66 105v65H240Zm570-140q67.5 0 108.75 23.77T960-293v53H780v-65q0-19.86-3.5-37.43T765-377.27q11-1.73 22.17-2.23 11.17-.5 22.83-.5Zm-330.2-10Q400-390 350-366q-50 24-50 61v5h360v-6q0-36-49.5-60t-130.7-24Zm.2 90Zm1-300Z" />
        </svg>
        <p style={{ marginBottom: "50px" }}>No hay grupos agregados</p>
      </div>
    </Retractile_menu>
  );
};

export default Read_grupos_vacio;