import { NextResponse } from "next/server";
import {
  findPatientById,
  updatePatient,
  deletePatient,
} from "../../../../lib/db"; // Assuming you have this function

export async function GET(request, { params }) {
  console.log("🚀 ~ GET ~ params:", params);
  console.log("🚀 ~ GET ~ request:");
  console.log("🚀 ~ GET ~ request:");
  console.log("🚀 ~ GET ~ request:");
  try {
    const body = await request.json();
    console.log("🚀 ~ GET ~ body:", body);
    const patient = findPatientById(body?.id);

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json(patient, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
