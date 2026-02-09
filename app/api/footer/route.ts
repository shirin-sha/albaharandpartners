import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { FooterContent } from '@/types/footer';
import { revalidatePath } from 'next/cache';

const DB_NAME = 'albaharpartners1';
const COLLECTION_NAME = 'footer';

// GET - Fetch Footer content
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get('language') || 'ltr';

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const content = await collection.findOne({ language }) as FooterContent | null;

    if (!content) {
      return NextResponse.json({
        success: false,
        message: 'No content found for this language',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error('Error fetching Footer content:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch Footer content',
    }, { status: 500 });
  }
}

// POST - Create new Footer content
export async function POST(request: NextRequest) {
  try {
    const body: FooterContent = await request.json();

    if (!body.language) {
      return NextResponse.json({
        success: false,
        message: 'Language is required',
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Check if content already exists for this language
    const existing = await collection.findOne({ language: body.language });
    if (existing) {
      return NextResponse.json({
        success: false,
        message: `Content already exists for language: ${body.language}. Use PUT to update.`,
      }, { status: 409 });
    }

    const now = new Date();
    const newContent = {
      ...body,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(newContent);

    // Revalidate homepage (footer affects all pages)
    revalidatePath('/', 'layout');

    return NextResponse.json({
      success: true,
      message: 'Footer content created successfully',
      data: { ...newContent, _id: result.insertedId },
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating Footer content:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create Footer content',
    }, { status: 500 });
  }
}

// PUT - Update existing Footer content
export async function PUT(request: NextRequest) {
  try {
    const body: FooterContent = await request.json();

    if (!body.language) {
      return NextResponse.json({
        success: false,
        message: 'Language is required',
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const { _id, createdAt, ...updateData } = body;
    const updatedContent = {
      ...updateData,
      updatedAt: new Date(),
    };

    const result = await collection.findOneAndUpdate(
      { language: body.language },
      { $set: updatedContent },
      { returnDocument: 'after', upsert: true }
    );

    if (!result) {
      return NextResponse.json({
        success: false,
        message: 'Failed to update Footer content',
      }, { status: 500 });
    }

    // Revalidate homepage (footer affects all pages)
    revalidatePath('/', 'layout');

    return NextResponse.json({
      success: true,
      message: 'Footer content updated successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error updating Footer content:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update Footer content',
    }, { status: 500 });
  }
}
