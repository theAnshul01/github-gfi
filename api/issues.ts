import type { VercelRequest, VercelResponse } from "@vercel/node"
import { redis } from "../src/lib/redis.js"

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { page = 1, per_page = 20, language, label, search } = req.query

    let query = "state:open"

    if (label) {
        query += `+label:${label}`
    } else {
        query += `+good-first-issue`
    }

    if (language) {
        query += `+language:${language}`
    }

    if (search) {
        query += `+${search}`
    }

    const cacheKey = `issues:${query}:${page}:${per_page}`

    const cached = await redis.get(cacheKey)

    if (cached) {
        return res.status(200).json(cached)
    }

    const url = `https://api.github.com/search/issues?q=${query}&sort=created&order=desc&page=${page}&per_page=${per_page}`

    const response = await fetch(url)

    if (!response.ok) {
        return res.status(500).json({ error: "Github API error" })
    }

    const data = await response.json()

    await redis.set(cacheKey, data, { ex: 600 })

    res.status(200).json(data)
}