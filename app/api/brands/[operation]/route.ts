import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Brand } from '@/types/brands';
import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';

const DB_NAME = 'albaharpartners1';
const COLLECTION_NAME = 'brands';

// POST - Add a new brand to the brands array
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ operation: string }> }
) {
  try {
    const { operation } = await params;
    const body = await request.json();
    const { language = 'ltr', brand } = body;

    if (operation !== 'add') {
      return NextResponse.json({
        success: false,
        message: 'Invalid operation',
      }, { status: 400 });
    }

    if (!brand) {
      return NextResponse.json({
        success: false,
        message: 'Brand data is required',
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Add brand to the beginning of the array
    const result = await collection.findOneAndUpdate(
      { language },
      {
        $push: {
          brands: {
            $each: [brand],
            $position: 0,
          } as any,
        },
        $set: {
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after', upsert: false }
    );

    if (!result) {
      return NextResponse.json({
        success: false,
        message: 'Brands content not found. Please create it first.',
      }, { status: 404 });
    }

    revalidatePath('/brands');
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      message: 'Brand added successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error adding brand:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to add brand',
    }, { status: 500 });
  }
}

// PUT - Update a specific brand in the brands array
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ operation: string }> }
) {
  try {
    const { operation } = await params;
    const body = await request.json();
    const { language = 'ltr', brandIndex, brand } = body;

    if (operation !== 'update') {
      return NextResponse.json({
        success: false,
        message: 'Invalid operation',
      }, { status: 400 });
    }

    if (brandIndex === undefined || !brand) {
      return NextResponse.json({
        success: false,
        message: 'Brand index and brand data are required',
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Update the specific brand at the given index
    const result = await collection.findOneAndUpdate(
      { language },
      {
        $set: {
          [`brands.${brandIndex}`]: brand,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({
        success: false,
        message: 'Brands content not found',
      }, { status: 404 });
    }

    revalidatePath('/brands');
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      message: 'Brand updated successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error updating brand:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update brand',
    }, { status: 500 });
  }
}

// DELETE - Remove a specific brand from the brands array
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ operation: string }> }
) {
  try {
    const { operation } = await params;
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get('language') || 'ltr';
    const brandIndex = searchParams.get('index');

    if (operation !== 'delete') {
      return NextResponse.json({
        success: false,
        message: 'Invalid operation',
      }, { status: 400 });
    }

    if (brandIndex === null) {
      return NextResponse.json({
        success: false,
        message: 'Brand index is required',
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const index = parseInt(brandIndex, 10);
    if (isNaN(index)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid brand index',
      }, { status: 400 });
    }

    // Get the brand to delete (to verify it exists)
    const content = await collection.findOne({ language });
    if (!content) {
      return NextResponse.json({
        success: false,
        message: 'Brands content not found',
      }, { status: 404 });
    }

    const brandsArray = content.brands || [];
    if (index < 0 || index >= brandsArray.length) {
      return NextResponse.json({
        success: false,
        message: 'Invalid brand index',
      }, { status: 400 });
    }

    // Remove the brand at the specific index using $pull with the brand object
    const brandToDelete = brandsArray[index];
    const result = await collection.findOneAndUpdate(
      { language },
      {
        $pull: {
          brands: brandToDelete,
        },
        $set: {
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    revalidatePath('/brands');
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      message: 'Brand deleted successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error deleting brand:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to delete brand',
    }, { status: 500 });
  }
}
