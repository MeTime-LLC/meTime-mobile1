import React, { useState } from "react"
import { View, TouchableOpacity, Text, Alert } from "react-native"
import { Agenda } from "react-native-calendars"
import { Card } from "react-native-paper"

interface Appointment {
  day: string
  time: string
  duration: number
  description: string
}

interface AgendaItem {
  name: string
  startTime: string
  endTime: string
  duration: number
  day: string
  id: string
  height: number
  details: string
}

const timeToString = (time: number): string => {
  const date = new Date(time)
  return date.toISOString().split("T")[0]
}

const formatTime = (time: number): string => {
  const date = new Date(time)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`
}

const Schedule: React.FC = () => {
  const [items, setItems] = useState<{ [key: string]: AgendaItem[] }>({})

  const loadItems = () => {
    setItems((prevItems) => {
      const updatedItems: { [key: string]: AgendaItem[] } = {}

      // Sample appointments
      const appointments: Appointment[] = [
        {
          day: "2023-11-25",
          time: "15:00",
          duration: 30,
          description: "Hair cut for Bob",
        },
        {
          day: "2023-11-25",
          time: "16:00",
          duration: 60,
          description: "Hair cut for Tom",
        },
        {
          day: "2023-11-25",
          time: "17:00",
          duration: 45,
          description: "Hair cut for Steve",
        },
        {
          day: "2023-11-26",
          time: "15:00",
          duration: 60,
          description: "Hair cut for Laura",
        },
        {
          day: "2023-11-27",
          time: "15:00",
          duration: 120,
          description: "Hair cut for Jon",
        },
        {
          day: "2023-11-27",
          time: "16:00",
          duration: 60,
          description: "Hair cut for Matt",
        },
        {
          day: "2023-11-27",
          time: "20:00",
          duration: 30,
          description: "Hair cut for Kat",
        },
      ]

      appointments.forEach((appointment, index) => {
        const [year, month, day] = appointment.day.split("-")
        const [hour, minute] = appointment.time.split(":")
        const startTime = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          parseInt(hour),
          parseInt(minute)
        )
        const endTime = new Date(
          startTime.getTime() + appointment.duration * 60000
        )

        const key = timeToString(startTime.getTime())

        if (!updatedItems[key]) {
          updatedItems[key] = []
        }

        updatedItems[key].push({
          name: `${appointment.description}`,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          duration: appointment.duration,
          day: appointment.day,
          id: `${key}-${index}`,
          height: Math.max(100, Math.floor((appointment.duration / 30) * 100)),
          details: `Details for ${appointment.description}`,
        })
      })

      return updatedItems
    })
  }

  const renderItem = (item: AgendaItem) => {
    const { startTime, endTime } = item

    return (
      <TouchableOpacity
        style={{ marginRight: 10, marginTop: 17, height: item.height }}
        onPress={() => Alert.alert(item.name)}
      >
        <Card style={{ height: item.height }}>
          <Card.Content>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Text style={{ fontWeight: "600" }}>{`${formatTime(
                new Date(startTime).getTime()
              )} to ${formatTime(new Date(endTime).getTime())}`}</Text>
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={timeToString(new Date().getTime())}
        renderItem={renderItem}
      />
    </View>
  )
}

export default Schedule
