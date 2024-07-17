import '@logseq/libs'

import { isValidUUID } from '@logseq/libs/dist/helpers'

import { handlePopup } from './handle-popup'
import { settings } from './settings'

const main = async () => {
  console.log('<insert-plugin-name> loaded')
  // Used to handle any popups
  handlePopup()

  if (isValidUUID(logseq.settings!.icalTemplateBlockRef)) {
    await logseq.UI.showMsg(
      'logseq-ical-plugin: Double-check block reference in settings',
    )
  }
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
