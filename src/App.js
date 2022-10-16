
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import BootstrapForm from './Comp/BootstrapForm/BootstrapForm';
import ReactBootstrapForm from "./Comp/ReactBootstrapForm/ReactBootstrapForm";
import Main from './Layout/Main';



function App() {
const router = createBrowserRouter([
{
  path:'/',
  element:<Main></Main>,
  children:[
    {
      path:'login',
      element:<BootstrapForm></BootstrapForm>
    },
    {
      path:'register',
      element:<ReactBootstrapForm></ReactBootstrapForm>
    },
  ]
}
]);


  return (
    <div >
     <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
