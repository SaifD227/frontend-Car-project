import React from 'react'
import Navbar from '../navbar/Navbar'
import Contact from '../contact/Contact'
import LookingCar from '../lookingcar/LookingCar'
import Catalog from '../catalog/Catalog'
import HappyClient from '../happyclient/HappyClient'
import Brand from '../brand/Brand'
import ClientThanks from '../clientThank/ClientThanks'
import Vedio from "../vedio/Vedio"

const Dashboard = () => {
  return (
    <div className="relative">
    <Vedio/>

    <div className="sticky top-0 z-50">
      <Navbar />
    </div>

    <Contact />
    <LookingCar />
    <Catalog />
    <HappyClient />
    <Brand />
    <ClientThanks />
  </div>
  )
}

export default Dashboard
