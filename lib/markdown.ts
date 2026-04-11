function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function formatInlineMarkdown(value: string) {
  let formatted = escapeHtml(value)

  formatted = formatted.replace(/`([^`]+)`/g, "<code>$1</code>")
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label: string, href: string) => {
    const isExternal = /^https?:\/\//.test(href)
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ""
    return `<a href="${href}"${target}>${label}</a>`
  })

  return formatted
}

function isOrderedListItem(line: string) {
  return /^\d+\.\s+/.test(line)
}

function isUnorderedListItem(line: string) {
  return /^-\s+/.test(line)
}

export function markdownToHtml(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").trim().split("\n")
  const html: string[] = []

  for (let index = 0; index < lines.length; ) {
    const rawLine = lines[index]
    const line = rawLine.trim()

    if (!line) {
      index += 1
      continue
    }

    if (/^---+$/.test(line)) {
      html.push("<hr />")
      index += 1
      continue
    }

    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(line)
    if (headingMatch) {
      const level = headingMatch[1].length
      html.push(`<h${level}>${formatInlineMarkdown(headingMatch[2])}</h${level}>`)
      index += 1
      continue
    }

    if (isOrderedListItem(line)) {
      const items: string[] = []

      while (index < lines.length && isOrderedListItem(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""))
        index += 1
      }

      html.push(`<ol>${items.map((item) => `<li>${formatInlineMarkdown(item)}</li>`).join("")}</ol>`)
      continue
    }

    if (isUnorderedListItem(line)) {
      const items: string[] = []

      while (index < lines.length && isUnorderedListItem(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^-\s+/, ""))
        index += 1
      }

      html.push(`<ul>${items.map((item) => `<li>${formatInlineMarkdown(item)}</li>`).join("")}</ul>`)
      continue
    }

    const paragraphLines: string[] = []

    while (index < lines.length) {
      const nextLine = lines[index].trim()

      if (!nextLine || /^---+$/.test(nextLine) || /^(#{1,6})\s+/.test(nextLine) || isOrderedListItem(nextLine) || isUnorderedListItem(nextLine)) {
        break
      }

      paragraphLines.push(nextLine)
      index += 1
    }

    html.push(`<p>${formatInlineMarkdown(paragraphLines.join(" "))}</p>`)
  }

  return html.join("")
}
