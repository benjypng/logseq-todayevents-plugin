import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'

export const settings: SettingSchemaDesc[] = [
  {
    key: 'icalTemplateBlockRef',
    type: 'string',
    default: '',
    title: 'Block Reference for Template',
    description: 'Block reference number where your template can be found.',
  },
  {
    key: 'icalTemplateUrl',
    type: 'string',
    default: '',
    title: 'iCal URL',
    description: 'Link to .ics file. Should begin with https://',
  },
]
