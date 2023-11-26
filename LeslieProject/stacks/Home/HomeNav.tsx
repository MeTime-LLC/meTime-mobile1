import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import HomeScreen from "./HomeScreen"
import Availability from "../../components/Availability"
import Schedule from "../../components/Schedule"
import PickAppointment from "../../components/PickAppointment"

const Drawer = createDrawerNavigator()

function HomeNav() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Availability" component={Availability} />
      <Drawer.Screen name="Schedule" component={Schedule} />
      <Drawer.Screen name="Pick Appointment" component={PickAppointment} />
      {/* Add other screens for the drawer navigation */}
    </Drawer.Navigator>
  )
}

export default HomeNav
