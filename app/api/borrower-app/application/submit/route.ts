import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // -----------------------------
    // 1. Create Borrower
    // -----------------------------
    const borrower = await prisma.borrower.create({
      data: {
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        email: body.email,
        phone: body.cellPhone || body.homePhone || null,
        ssn: body.ssn || null,
        dob: body.dob || null,
        citizenship: body.citizenship || null,
      },
    });

    // -----------------------------
    // 2. Create Mortgage Application
    // -----------------------------
    const application = await prisma.mortgageApplication.create({
      data: {
        borrowerId: borrower.id,

        loanAmount: Number(body.loanAmount),
        loanPurpose: body.loanPurpose,

        propertyAddress: body.propertyAddress,
        propertyCity: body.propertyCity,
        propertyState: body.propertyState,
        propertyZip: body.propertyZip,
        propertyCounty: body.propertyCounty || null,

        units: Number(body.units) || null,
        occupancy: body.occupancy || null,
        propertyType: body.propertyType || null,

        full1003Json: body,
        status: "SUBMITTED",
      },
    });

    // -----------------------------
    // 3. Create Underwriting Case
    // -----------------------------
    const uwCase = await prisma.underwritingCase.create({
      data: {
        applicationId: application.id,
        status: "PENDING",
      },
    });

    // -----------------------------
    // 4. Send Borrower Confirmation Email
    // -----------------------------
    await sendEmail({
      to: borrower.email,
      subject: "Your Mortgage Application Has Been Submitted",
      html: `
        <h2>Thank you, ${borrower.firstName}!</h2>
        <p>Your mortgage application has been successfully submitted.</p>
        <p>Application ID: <strong>${application.id}</strong></p>
        <p>Our underwriting team will review your information and contact you shortly.</p>
      `,
    });

    // -----------------------------
    // 5. Send Admin Notification Email
    // -----------------------------
    await sendEmail({
      to: "admin@genxbaby.com",
      subject: "New Mortgage Application Submitted",
      html: `
        <h2>New Application Submitted</h2>
        <p>Borrower: ${borrower.firstName} ${borrower.lastName}</p>
        <p>Email: ${borrower.email}</p>
        <p>Application ID: <strong>${application.id}</strong></p>
        <p>Loan Purpose: ${application.loanPurpose}</p>
        <p>Loan Amount: $${application.loanAmount}</p>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        applicationId: application.id,
        underwritingCaseId: uwCase.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("1003 Submit Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error submitting application.",
      },
      { status: 500 }
    );
  }
}
