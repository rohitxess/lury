import Layout from "./components/layouts/Layout"
import Welcome from "./components/layouts/Welcome"
import Dashboard from "./components/layouts/Dashboard"
import Challenge from "./components/layouts/Challenge"

function App() {
   // zero is for welcome, 1 is for dashboard and 2 is for challenege

   const selectedPage = 2;
   
   const pages = {
      0: <Welcome />,
      1: <Dashboard />,
      2: <Challenge />
   }


  return (
     <Layout>
         {pages[selectedPage]}
     </Layout>
    
  ) 
}

export default App

// the layout is rendering 
// welcome and dashboard is wrapped inside the layout hence 
// they become the children and that is why it has to be passed as a children/prop to the layout 