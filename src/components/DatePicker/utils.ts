const VISIBLE_CELLS_AMOUNT = 7 * 6

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Okt',
  'Nov',
  'Dec'
]

export const daysOfTheWeek = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun'
]

export interface IDateCellItem {
  date: number;
  month: number;
  year: number;
}

export const getDaysAmountInAMonth = (year: number, month: number) => {
  const nextMonthDate = new Date(year, month + 1, 1)
  nextMonthDate.setMinutes(-1)
  return nextMonthDate.getDate()
}

const sundayWeekToMondayWeekDayMap: Record<number, number> = {
  0: 6,
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
}

const getDayOfTheWeek = (date: Date) => {
  const day = date.getDay()

  return sundayWeekToMondayWeekDayMap[day]
}

export const getPreviousMonthDays = (year: number, month: number) => {
  const currentMonthFirstDay = new Date(year, month, 1)
  // сколько нужно взять дней из предыдущего месяца
  const prevMonthCellsAmount = getDayOfTheWeek(currentMonthFirstDay)
  // количество дней в предыдущем месяце
  const daysAmountInPrevMonth = getDaysAmountInAMonth(year, month -1)

  const dateCells: IDateCellItem[] = []

  const [cellYear, cellMonth] = month === 0 ? [year -1, 11] : [year, month -1]

  for (let i = prevMonthCellsAmount - 1; i >= 0; i --) {
    dateCells.push({
      year: cellYear,
      month: cellMonth,
      date: daysAmountInPrevMonth - i,
    })
  }

  return dateCells
}

export const getNextMonthDays = (year: number, month: number) => {
  const currentMonthFirstDay = new Date(year, month, 1)
  const prevMonthCellsAmount = getDayOfTheWeek(currentMonthFirstDay)

  const daysAmount = getDaysAmountInAMonth(year, month)

  const nextMonthDays = VISIBLE_CELLS_AMOUNT - daysAmount - prevMonthCellsAmount

  const [cellYear, cellMonth] = month === 11 ? [year +1, 0] : [year, month +1]

  const dateCells: IDateCellItem[] = []

  for (let i = 1; i <= nextMonthDays; i ++) {
    dateCells.push({
      year: cellYear,
      month: cellMonth,
      date: i,
    })
  }

  return dateCells
}

export const getCurrentMonthDays = (year: number, month: number, numberOfDays: number) => {
  const dateCells: IDateCellItem[] = []

  for (let i = 1; i <= numberOfDays; i ++) {
    dateCells.push({
      year,
      month,
      date: i,
    })
  }

  return dateCells
}

export const getMinute = (minute: number) => {
  if (minute < 10) {
    return `0${minute}`
  } else {
    return minute
  }
}
