import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'

export const settings: SettingSchemaDesc[] = [
  {
    key: 'icalTemplateBlockRef',
    type: 'string',
    default: 'xxx',
    title: 'Block Reference for Template',
    description: 'Block reference number where your template can be found.',
  },
]
