import React from 'react'
import { AppContent, AppSidebar, AppFooter, } from '../components/index'

const DefaultLayout = () => {
  return (
    // <><AppHeader />
           <div className="">

    {/* <div className="container-fluid">
  <div className="row"> */}
  
  <AppSidebar />
  <AppContent />
  {/* </div>
  </div> */}
  </div>
    // </>
   
    // <div>
    //   <AppSidebar />
    //   <div className="wrapper d-flex flex-column min-vh-100 bg-light">
    //     <AppHeader />
    //     <div className="body flex-grow-1 px-3">
    //       <AppContent />
    //     </div>
    //     <AppFooter />
    //   </div>
    // </div>
  )
}

export default DefaultLayout
