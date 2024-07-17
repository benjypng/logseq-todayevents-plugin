import '@logseq/libs'

import { getTodaysEvents } from './services/get-todays-events'
import { handlePopup } from './services/handle-popup'
import { handleTemplate } from './services/handle-template'
import { handleTemplateString } from './services/handle-template-string'
import { settings } from './settings'

const main = async () => {
  console.log('logseq-ical-plugin loaded')

  // Used to handle any popups
  handlePopup()

  logseq.onSettingsChanged(async () => {
    // Check that URL ends with .ics
    if (!(logseq.settings!.icalTemplateUrl as string).endsWith('.ics')) {
      await logseq.UI.showMsg('iCal url must end with .ics')
    }
    // Check if block exists
    if (logseq.settings!.icalTemplateBlockRef) {
      const blockUUID = logseq
        .settings!.icalTemplateBlockRef.replace('((', '')
        .replace('))', '')
      try {
        await logseq.Editor.getBlock(blockUUID)
      } catch (e) {
        await logseq.UI.showMsg(
          `Ensure template's block reference is added to plugin settings before pulling today's events`,
          'warning',
        )
      }
    }
  })

  await logseq.Editor.registerSlashCommand(
    "Retrieve today's events",
    async (e) => {
      if (
        !logseq.settings!.icalTemplateUrl ||
        logseq.settings!.icalTemplateUrl == ''
      )
        return

      const todaysEvents = await getTodaysEvents()
      if (todaysEvents.length == 0) {
        await logseq.UI.showMsg('No events today', 'success')
        return
      }

      const templateStr = await handleTemplateString()
      if (!templateStr) {
        await logseq.UI.showMsg(
          'logseq-ical-template: Invalid block reference',
          'error',
        )
        return
      }

      let prevBlockUUID = ''
      for (let i = 0; i < todaysEvents.length; i++) {
        const contentStr = handleTemplate(templateStr, todaysEvents[i])
        if (i == 0) {
          await logseq.Editor.updateBlock(e.uuid, contentStr)
          prevBlockUUID = e.uuid
        } else {
          const blk = await logseq.Editor.insertBlock(
            prevBlockUUID,
            contentStr,
            {
              before: false,
              sibling: true,
            },
          )
          prevBlockUUID = blk!.uuid
        }
      }

      await logseq.Editor.exitEditingMode()
    },
  )
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
