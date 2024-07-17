import { BlockEntity } from '@logseq/libs/dist/LSPlugin'

export const handleTemplateString = async (): Promise<string | void> => {
  const icalTemplateBlockRef = logseq
    .settings!.icalTemplateBlockRef.replace('((', '')
    .replace('))', '')
  const block = await logseq.Editor.getBlock(icalTemplateBlockRef, {
    includeChildren: true,
  })
  if (!block) return

  const [templateBlock] = block.children as BlockEntity[]
  if (!templateBlock) return
  return templateBlock.content
}
