import fetch from 'node-fetch'
import { writeFile } from 'fs/promises'

interface Course {
  number: string   
  name: string
  prerequisites: string
  credits: number
}

function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<\/?h[1-6][^>]*>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l)
    .join('\n')
}

async function fetchCourses(url: string): Promise<Course[]> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`)

  const text = htmlToText(await res.text())

  // get each course block
  const re = /(?:^|\n)([A-Z]+ \d+[A-Z]?:[\s\S]*?)(?=(?:\n[A-Z]+ \d+[A-Z]?: )|\Z)/gm
  const blocks: string[] = []
  for (const m of text.matchAll(re)) {
    blocks.push(m[1].trim())
  }

  const courses: Course[] = []
  for (const block of blocks) {
    const lines = block.split('\n')
    const hdr = lines[0].match(/^([A-Z]+)\s+(\d+[A-Z]?):\s*(.+)$/)
    if (!hdr) continue

    const number = `${hdr[1]} ${hdr[2]}`    // course code
    const name = hdr[3]                     // course title

    // find prereqs
    const pre = block.match(/Prerequisite[s]?:\s*([\s\S]*?)\.(?=\s|$)/i)
    const prerequisites = pre ? pre[1].trim() : ''

    // find credits
    const cr = block.match(/(\d+)\s+credits?/i)
    const credits = cr ? parseInt(cr[1], 10) : 0

    courses.push({ number, name, prerequisites, credits })
  }

  return courses
}

;(async () => {
  const url = 'https://content.cs.umass.edu/content/fall-2025-course-description'
  try {
    const courses = await fetchCourses(url)
    console.log(`Found ${courses.length} courses.`)
    await writeFile('src/scripts/courses.json', JSON.stringify(courses, null, 2), 'utf8')
    console.log('Done')
  } catch (e) {
    console.error('Error:', e)
  }
})()
