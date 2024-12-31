export const yesterdayYMD = () => {
  const date = new Date()
  const yesterday = date.setDate(date.getDate() - 1)

  const [y, m, d] = new Date(yesterday)
    .toLocaleString()
    .split(' ')[0]
    .split('/')
  const mm = `0${m}`.slice(-2)
  const dd = `0${d}`.slice(-2)

  return [y, mm, dd]
}
