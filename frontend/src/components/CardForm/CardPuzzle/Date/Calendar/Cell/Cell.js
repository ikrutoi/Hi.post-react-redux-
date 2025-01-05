import './Cell.scss'

const Cell = ({
  title,
  dayBefore,
  dayCurrent,
  dayAfter,
  currentDate,
  today,
  handleSelectedDate,
  selectedDate,
  selectedDateTitle,
  scrollMonthPlus,
  scrollMonthMinus,
}) => {
  return title ? (
    <div className="cell cell-title">{title}</div>
  ) : dayCurrent ? (
    <div
      className={`cell cell-day day-current ${
        today ? 'today' : ''
      } day-${dayCurrent} ${selectedDate ? 'selected' : ''}`}
      onClick={() =>
        handleSelectedDate(
          selectedDateTitle.year,
          selectedDateTitle.month,
          dayCurrent
        )
      }
    >
      {dayCurrent}
    </div>
  ) : dayBefore ? (
    <div
      className={`cell cell-day ${
        today ? 'today' : ''
      } day-before day-${dayBefore} ${selectedDate ? 'selected' : ''}`}
      onClick={scrollMonthMinus}
    >
      {dayBefore}
    </div>
  ) : (
    <div
      className={`cell cell-day ${
        today ? 'today' : ''
      } day-after day-${dayAfter} ${selectedDate ? 'selected' : ''}`}
      onClick={scrollMonthPlus}
    >
      {dayAfter}
    </div>
  )
}

export default Cell
