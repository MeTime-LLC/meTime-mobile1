import React, { useState } from "react"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native"
import { Button, Card } from "react-native-paper"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import { useTheme } from "../App"

const generateTimeIntervals = (
  openingTime: Date,
  closingTime: Date,
  bookedTimes: string[]
): string[] => {
  const intervals: string[] = []
  const currentTime = new Date(openingTime)

  const formatTime = (date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const period = hours >= 12 ? "PM" : "AM"
    const formattedHours = (hours % 12 || 12).toString()
    return `${formattedHours}:${minutes} ${period}`
  }

  while (currentTime < closingTime) {
    const timeString = formatTime(currentTime)

    console.log("cleanTimeString:", JSON.stringify(timeString))
    console.log("bookedTimes:", JSON.stringify(bookedTimes))

    if (!bookedTimes.includes(timeString)) {
      intervals.push(timeString)
    }

    currentTime.setMinutes(currentTime.getMinutes() + 30)
  }

  return intervals
}

const PickAppointment: React.FC = () => {
  const openingTime = new Date(2023, 10, 26, 12, 0)
  const closingTime = new Date(2023, 10, 26, 17, 0)
  const bookedTimes = ["1:00 PM", "3:30 PM", "4:30 PM"] // Replace with your actual booked times
  const times: string[] = generateTimeIntervals(
    openingTime,
    closingTime,
    bookedTimes
  )
  const [appointmentDay, setAppointmentDay] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [isModalVisible, setModalVisible] = useState(false)
  const { theme } = useTheme()

  const onDateChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate || appointmentDay
    setAppointmentDay(currentDate)
  }

  const toggleModal = (time: string) => {
    setSelectedTime(time)
    setModalVisible(!isModalVisible)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.date}>
          <Text style={styles.day}>
            {appointmentDay.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
          <DateTimePicker
            value={new Date(appointmentDay || Date.now())}
            mode="date"
            display="default"
            onChange={onDateChange}
            textColor={theme.buttonTextColor}
            style={styles.timePicker}
          />
        </View>
        <ScrollView contentContainerStyle={styles.time}>
          {times.map((time, index) => (
            <TouchableOpacity key={index} onPress={() => toggleModal(time)}>
              <Card style={styles.button}>
                <Text>{time}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {isModalVisible && <View style={styles.overlay} />}
        <Modal
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(!isModalVisible)
          }}
          style={styles.modalStyle}
        >
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text>{selectedTime}</Text>
              <Button>Confirm Appointment</Button>
              <TouchableOpacity
                onPress={() => setModalVisible(!isModalVisible)}
              >
                <Button>Close</Button>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    marginVertical: "1%",
  },
  container: {
    flex: 1,
  },
  date: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "2%",
  },
  day: {
    fontSize: 21,
    fontWeight: "700",
    margin: 10,
  },
  time: {
    marginVertical: "1%",
    paddingBottom: 50,
    paddingHorizontal: "5%",
  },
  timePicker: {
    marginLeft: "-1%",
  },
  wrapper: {
    marginVertical: 10,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    height: "20%",
    width: "70%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
  },
})

export default PickAppointment
