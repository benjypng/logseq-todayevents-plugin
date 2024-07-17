import { EventKeyUnion, TodayEvent } from './get-todays-events'

export const handleTemplate = (
  template: string,
  data: TodayEvent | undefined,
): string => {
  if (!data) return 'Error handling template'
  return template.replace(
    /<%(\w+)%>/g,
    (match: string, key: EventKeyUnion) => data[key] || match,
  )
}
