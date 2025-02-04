import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const inventory = prisma.bloodInventory.findMany();
        return NextResponse.json({
            data: inventory,
            success: true,
            message: "Inventory fetched successfully",
        });
    } catch (error) {
        return NextResponse.json({
            error: error.message,
            success: false,
            message: "An error occurred",
        });
    }
}
