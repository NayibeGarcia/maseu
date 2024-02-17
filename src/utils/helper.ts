export interface Timestamp {
  seconds: number
  nanoseconds: number
}

export const getDate = (timestampObj: Timestamp): string => {
  const timestampMillis: number =
    timestampObj.seconds * 1000 + Math.floor(timestampObj.nanoseconds / 1e6)

  const fechaHora: Date = new Date(timestampMillis)

  const fechaISO: string = fechaHora.toISOString().split('T')[0]

  return fechaISO
}
