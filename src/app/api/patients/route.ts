import { NextResponse } from "next/server";
import {
  findPatientById,
  updatePatient,
  deletePatient,
  createPatient,
} from "../../../lib/db"; // Assuming you have this function

export async function GET(request, { params }) {
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

export async function DELETE(request, { params }) {
  try {
    const [id] = params;

    const deleted = deletePatient(id);

    if (!deleted) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    // Return a 200 OK with a success message, or 204 No Content
    return NextResponse.json(
      { message: "Patient deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();

    const updatedPatient = updatePatient(body?.id, body);

    if (!updatedPatient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPatient, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const body = await request.json();
    const id = Date.now().toString();

    const patient = findPatientById(id);
    if (!patient) {
      const updatedData = {
        ...patient,
        ...body,
      };

      const updatedPatient = createPatient({ id, ...updatedData });
      return NextResponse.json(updatedPatient, { status: 200 });
    }

    if (id) {
      const patient = findPatientById(id);
      if (!patient) {
        return NextResponse.json(
          { error: "Patient already exist" },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
