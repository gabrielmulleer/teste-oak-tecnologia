import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'src/app/(main)/products.json')

export async function POST(req: NextRequest) {
  try {
    const data = await req.json() // Parse the request body as JSON

    let products = []

    // Check if the file exists
    try {
      const fileContents = await fs.readFile(filePath, 'utf8')
      products = JSON.parse(fileContents)
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error
      }
      // File does not exist, create an empty array
      products = []
    }

    // Get the last product's id and increment it for the new product
    const lastId = products.length ? products[products.length - 1].id : 0
    const newProduct = {
      id: lastId + 1,
      ...data,
      createdAt: new Date().toISOString(),
    }

    products.push(newProduct)
    await fs.writeFile(filePath, JSON.stringify(products, null, 2))
    return NextResponse.json(
      { message: 'Product saved successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error saving product' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    const products = JSON.parse(fileContents)
    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    if (error.code === 'ENOENT') {
      return NextResponse.json([], { status: 200 }) // Return an empty array if the file does not exist
    }
    console.error(error)
    return NextResponse.json(
      { error: 'Error reading products' },
      { status: 500 },
    )
  }
}
