import { useState } from 'react'
import './Calendar.scss'
import daysOfWeekStartFromMon from '../../../../../data/date/daysOfWeekStartFromMon.json'
import daysOfWeekStartFromSun from '../../../../../data/date/daysOfWeekStartFromSun.json'
import Cell from './Cell/Cell'
import CalendarWeekTitle from '../CalendarWeekTitle/CalendarWeekTitle'
import {
  currentDate,
  numberDaysInPreviousMonth,
  daysInCurrentMonth,
} from '../../../../../utils/date/date'

const Calendar = ({ selectedDate }) => {
  const [firstDayOfWeek, setFirstDayOfWeek] = useState('Sun')
  const daysOfWeek =
    firstDayOfWeek === 'Sun' ? daysOfWeekStartFromSun : daysOfWeekStartFromMon
  const firstDayOfMonth =
    firstDayOfWeek === 'Sun'
      ? new Date(currentDate.currentYear, currentDate.currentMonth, 1).getDay()
      : new Date(
          currentDate.currentYear,
          currentDate.currentMonth,
          1
        ).getDay() === 0
      ? 6
      : new Date(
          currentDate.currentYear,
          currentDate.currentMonth,
          1
        ).getDay() - 1

  const constructionMonth = () => {
    let previousMonth = []
    for (let day = 0; day < firstDayOfMonth; day++) {
      const currentDayInPreviousMonth = numberDaysInPreviousMonth - day
      previousMonth.unshift(currentDayInPreviousMonth)
    }
    const dateTodayBefore = () => {
      let date = {}
      if (currentDate.currentMonth < 11) {
        date.year = currentDate.currentYear
        date.month = currentDate.currentMonth + 1
        return date
      }
      if (currentDate.currentMonth === 11) {
        date.year = currentDate.currentYear + 1
        date.month = 0
        return date
      }
    }
    const month = previousMonth.map((day) => {
      return day === currentDate.currentDay &&
        selectedDate.month === dateTodayBefore().month &&
        selectedDate.year === dateTodayBefore().year ? (
        <Cell key={`day-before-${day}`} today={true} dayBefore={day} />
      ) : (
        <Cell key={`day-before-${day}`} today={false} dayBefore={day} />
      )
    })
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      day === currentDate.currentDay &&
      selectedDate.month === currentDate.currentMonth &&
      selectedDate.year === currentDate.currentYear
        ? month.push(
            <Cell
              key={`day-${day}`}
              today={true}
              currentDate={currentDate}
              dayCurrent={day}
            />
          )
        : month.push(
            <Cell
              key={`day-${day}`}
              today={false}
              currentDate={currentDate}
              dayCurrent={day}
            />
          )
    }
    const numberOfDaysRemaining = 42 - month.length
    for (let day = 1; day <= numberOfDaysRemaining; day++) {
      month.push(<Cell key={`day-after-${day}`} dayAfter={day} />)
    }

    return month
  }

  return (
    <div className="calendar">
      <CalendarWeekTitle daysOfWeek={daysOfWeek} />
      <div className="calendar-month">
        <div className="month-days">{constructionMonth()}</div>
      </div>
    </div>
  )
}

export default Calendar
