import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DEFAULT_FORMAT_STRING = 'YYYY/MM/DD HH:mm:ss'

export default function formatUtcTimeString(
  utcString: string,
  format: string = DEFAULT_FORMAT_STRING
) {
  return dayjs.utc(utcString).format(format)
}
