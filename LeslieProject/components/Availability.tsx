import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Switch, Text, View } from "react-native"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import { FontAwesome } from "@expo/vector-icons"
import { AvailabilityData } from "../type"

const Availability: React.FC = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]

  const [availability, setAvailability] = useState<AvailabilityData[]>(
    days.map(() => ({
      isEnabled: false,
      startTime: new Date(),
      endTime: new Date(),
    }))
  )

  const toggleSwitch = (index: number) => {
    setAvailability((prevAvailability) => {
      const newAvailability = [...prevAvailability]
      newAvailability[index].isEnabled = !newAvailability[index].isEnabled
      return newAvailability
    })
  }

  const handleStartTimeChange = (
    event: DateTimePickerEvent,
    selectedTime: Date | undefined,
    index: number
  ) => {
    if (selectedTime) {
      setAvailability((prevAvailability) => {
        const newAvailability = [...prevAvailability]
        newAvailability[index].startTime = selectedTime
        return newAvailability
      })
    }
  }

  const handleEndTimeChange = (
    event: DateTimePickerEvent,
    selectedTime: Date | undefined,
    index: number
  ) => {
    if (selectedTime) {
      setAvailability((prevAvailability) => {
        const newAvailability = [...prevAvailability]
        newAvailability[index].endTime = selectedTime
        return newAvailability
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        {days.map((day, index) => (
          <View key={index} style={styles.switch}>
            <View style={styles.dayAndSwitch}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={"#f4f3f4"}
                ios_backgroundColor="lightgrey"
                onValueChange={() => toggleSwitch(index)}
                value={availability[index].isEnabled}
              />
              <Text style={styles.day}>{day}</Text>
            </View>
            <View style={styles.avail}>
              {!availability[index].isEnabled ? (
                <View style={styles.closed}>
                  <FontAwesome name="moon-o" size={17} color="black" />
                  <Text style={styles.closedText}>Closed</Text>
                </View>
              ) : (
                <View style={styles.timeSetter}>
                  <Text>From: </Text>
                  <DateTimePicker
                    value={
                      new Date(new Date().setHours(9, 0)) ||
                      availability[index].startTime
                    }
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(
                      event: DateTimePickerEvent,
                      time: Date | undefined
                    ) => handleStartTimeChange(event, time, index)}
                    style={styles.dateTimePicker}
                  />
                  <Text style={styles.to}>To: </Text>
                  <DateTimePicker
                    value={
                      new Date(new Date().setHours(17, 0)) ||
                      availability[index].endTime
                    }
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(
                      event: DateTimePickerEvent,
                      time: Date | undefined
                    ) => handleEndTimeChange(event, time, index)}
                    style={styles.dateTimePicker}
                  />
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  avail: {
    alignItems: "center",
    flex: 5 / 8,
    justifyContent: "center",
    paddingTop: "0.2%",
  },
  closed: {
    flexDirection: "row",
  },
  closedText: {
    paddingLeft: "2%",
  },
  container: {
    flex: 1,
  },
  dateTimePicker: {
    width: 76,
  },
  day: {
    paddingLeft: "3%",
    paddingTop: "5%",
  },
  dayAndSwitch: {
    flexDirection: "row",
    flex: 3 / 8,
  },
  switch: {
    flexDirection: "row",
    height: 50,
    marginHorizontal: "6%",
    marginVertical: "1%",
    paddingVertical: "2%",
  },
  timeSetter: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "-1.2%",
    paddingBottom: "1%",
  },
  to: {
    paddingLeft: 5,
  },
  wrapper: {
    marginTop: "5%",
  },
})

export default Availability
