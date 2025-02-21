import { NextResponse } from 'next/server';

let savedData = {};  // Temporary storage in memory

// POST Request to Save Data
export async function POST(request) {
    try {
        const body = await request.json();
        const { role, company } = body;

        if (!role || !company) {
            return NextResponse.json({ error: "Role and Company are required." }, { status: 400 });
        }

        // Save data in memory
        savedData = { role, company };

        return NextResponse.json({
            message: "Data received successfully.",
            data: savedData
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}

// GET Request to Retrieve Data
export async function GET() {
    if (!savedData.role || !savedData.company) {
        return NextResponse.json({ error: "No data found." }, { status: 404 });
    }

    return NextResponse.json({ data: savedData });
}
