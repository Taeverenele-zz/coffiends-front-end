// import React, { useContext, useEffect } from "react";
// import axios from "axios";
// import StateContext from "../../utils/store";
// import AdminLists from "./AdminLists";

// const AdminHome = () => {
//   const { dispatch } = useContext(StateContext);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/cafes/")
//       .then((res) => {
//         dispatch({
//           type: "getAllCafes",
//           data: res.data
//         });
//       })
//       .catch((error) => console.log(error));
//   }, [ dispatch ]);

//   return (
//     <>
//       <AdminLists />
//     </>
//   );
// };

// export default AdminHome;
