import "./App.css";

import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <div className="">
      <RouterProvider router={routes} />
      <Toaster position="bottom-center"/>
    </div>
  );
}

export default App;
