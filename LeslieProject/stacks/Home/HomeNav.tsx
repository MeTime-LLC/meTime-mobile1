import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import Availability from "../../components/Availability";

const Drawer = createDrawerNavigator()

function HomeNav() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Availability" component={Availability} />
      {/* Add other screens for the drawer navigation */}
    </Drawer.Navigator>
  )
}

export default HomeNav;
