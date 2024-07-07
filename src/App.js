import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/Rootayout/RootLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import HotelList from "./components/HotelList/HotelList";
import NewHotel from "./components/HotelList/NewHotel";
import EditHotel from "./components/HotelList/EditHotel";
import RoomsList from "./components/RoomsList/RoomsList";
import NewRoom from "./components/RoomsList/NewRoom";
import EditRoom from "./components/RoomsList/EditRoom";
import Transactions from "./components/Transactions/Transactions";
import Login from "./components/Log/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/hotelList", element: <HotelList /> },
      { path: "/newHotel", element: <NewHotel /> },
      { path: "/editHotel/:hotelId", element: <EditHotel /> },
      { path: "/roomsList", element: <RoomsList /> },
      { path: "/newRoom", element: <NewRoom /> },
      { path: "/editRoom/:roomId", element: <EditRoom /> },
      { path: "/transactions", element: <Transactions /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
