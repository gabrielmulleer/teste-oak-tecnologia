import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'src/app/(main)/products.json')

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    let products = []

    try {
      const fileContents = await fs.readFile(filePath, 'utf8')
      products = JSON.parse(fileContents)
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error
      }

      products = []
    }

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
      console.log('File does not exist, returning empty array')
      return NextResponse.json([], { status: 200 })
    }
    console.error('Error reading file:', error)
    return NextResponse.json(
      { error: 'Error reading products' },
      { status: 500 },
    )
  }
}
