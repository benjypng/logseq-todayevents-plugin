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

  await logseq.Editor.registerSlashCommand("Pull today's events", async (e) => {
    if (
      !logseq.settings!.icalTemplateUrl ||
      logseq.settings!.icalTemplateUrl == ''
    )
      return

    const todaysEvents = await getTodaysEvents()
    if (todaysEvents.length == 0) return
    console.log(todaysEvents)

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
        const blk = await logseq.Editor.insertBlock(prevBlockUUID, contentStr, {
          before: false,
          sibling: true,
        })
        prevBlockUUID = blk!.uuid
      }
    }

    await logseq.Editor.exitEditingMode()
  })
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
