import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // -----------------------------
    // 1. Upsert Borrower (fixes P2002)
    // -----------------------------
    const borrower = await prisma.borrower.upsert({
      where: { email: body.email },
      update: {
        phone: body.cellPhone ?? body.homePhone ?? null,
        fullName: `${body.firstName} ${body.lastName}`,
      },
      create: {
        firstName: body.firstName,
        middleName: body.middleName ?? null,
        lastName: body.lastName,
        fullName: `${body.firstName} ${body.lastName}`,
        email: body.email,
        phone: body.cellPhone ?? body.homePhone ?? null,
        ssn: body.ssn,
        dob: new Date(body.dob),
        citizenship: body.citizenship ?? null,
      },
    });

    // -----------------------------
    // 2. Create Application
    // -----------------------------
    const application = await prisma.application.create({
      data: {
        borrowerId: borrower.id,

        loanAmount: body.loanAmount ? Number(body.loanAmount) : null,
        loanPurpose: body.loanPurpose ?? null,

        propertyAddress: body.propertyAddress ?? null,
        propertyCity: body.propertyCity ?? null,
        propertyState: body.propertyState ?? null,
        propertyZip: body.propertyZip ?? null,
        propertyCounty: body.propertyCounty ?? null,

        units: body.units ? Number(body.units) : null,
        occupancy: body.occupancy ?? null,
        propertyType: body.propertyType ?? null,

        status: "SUBMITTED",
        full1003Json: body,
      },
    });

    // -----------------------------
    // 3. BorrowerProfile
    // -----------------------------
    await prisma.borrowerProfile.create({
      data: {
        borrowerId: borrower.id,
        applicationId: application.id,
        firstName: body.firstName,
        middleInitial: body.middleInitial ?? null,
        lastName: body.lastName,
        suffix: body.suffix ?? null,
        dob: new Date(body.dob),
        ssn: body.ssn,
        phone: body.cellPhone ?? body.homePhone ?? null,
        email: body.email,
        address: body.mailingAddress ?? body.propertyAddress ?? "",
        city: body.mailingCity ?? body.propertyCity ?? "",
        state: body.mailingState ?? body.propertyState ?? "",
        zip: body.mailingZip ?? body.propertyZip ?? "",
        yearsAtAddress: body.yearsAtAddress ? Number(body.yearsAtAddress) : null,
      },
    });

    // -----------------------------
    // 4. BorrowerEmployment
    // -----------------------------
    await prisma.borrowerEmployment.create({
      data: {
        borrowerId: borrower.id,
        applicationId: application.id,
        employerName: body.empName ?? "",
        jobTitle: body.empTitle ?? null,
        employmentType: body.employmentType ?? null,
        startDate: body.empStart ? new Date(body.empStart) : null,
        yearsInProfession: body.empYears ? Number(body.empYears) : null,
      },
    });

    // -----------------------------
    // 5. BorrowerIncome
    // -----------------------------
    await prisma.borrowerIncome.create({
      data: {
        borrowerId: borrower.id,
        applicationId: application.id,
        w2IncomeAnnual: body.w2IncomeAnnual ? Number(body.w2IncomeAnnual) : null,
        w2IncomeMonthly: body.w2IncomeMonthly ? Number(body.w2IncomeMonthly) : null,
        contractorIncomeAnnual: body.contractorIncomeAnnual ? Number(body.contractorIncomeAnnual) : null,
        contractorIncomeMonthly: body.contractorIncomeMonthly ? Number(body.contractorIncomeMonthly) : null,
        selfEmploymentIncomeAnnual: body.selfEmploymentIncomeAnnual ? Number(body.selfEmploymentIncomeAnnual) : null,
        selfEmploymentIncomeMonthly: body.selfEmploymentIncomeMonthly ? Number(body.selfEmploymentIncomeMonthly) : null,
        otherIncomeAnnual: body.otherIncomeAnnual ? Number(body.otherIncomeAnnual) : null,
        otherIncomeMonthly: body.otherIncomeMonthly ? Number(body.otherIncomeMonthly) : null,
        totalIncomeMonthly: body.totalIncomeMonthly ? Number(body.totalIncomeMonthly) : null,
      },
    });

    // -----------------------------
    // 6. BorrowerAssets
    // -----------------------------
    await prisma.borrowerAssets.create({
      data: {
        borrowerId: borrower.id,
        applicationId: application.id,
        checkingBalance: body.checkingBalance ? Number(body.checkingBalance) : null,
        savingsBalance: body.savingsBalance ? Number(body.savingsBalance) : null,
        cashOnHand: body.cashOnHand ? Number(body.cashOnHand) : null,
        retirementBalance: body.retirementBalance ? Number(body.retirementBalance) : null,
        investmentBalance: body.investmentBalance ? Number(body.investmentBalance) : null,
        otherAssets: body.otherAssets ? Number(body.otherAssets) : null,
        totalAssets: body.totalAssets ? Number(body.totalAssets) : null,
      },
    });

    // -----------------------------
    // 7. BorrowerLiabilities
    // -----------------------------
    await prisma.borrowerLiabilities.create({
      data: {
        borrowerId: borrower.id,
        applicationId: application.id,
        creditCardPayments: body.creditCardPayments ? Number(body.creditCardPayments) : null,
        autoLoanPayments: body.autoLoanPayments ? Number(body.autoLoanPayments) : null,
        studentLoanPayments: body.studentLoanPayments ? Number(body.studentLoanPayments) : null,
        personalLoanPayments: body.personalLoanPayments ? Number(body.personalLoanPayments) : null,
        collectionsPayments: body.collectionsPayments ? Number(body.collectionsPayments) : null,
        otherDebtPayments: body.otherDebtPayments ? Number(body.otherDebtPayments) : null,
        totalMonthlyDebt: body.totalMonthlyDebt ? Number(body.totalMonthlyDebt) : null,
      },
    });

    // -----------------------------
    // 8. BorrowerProperty (THIS WAS THE ERROR)
    // -----------------------------
    await prisma.borrowerProperty.create({
      data: {
        borrowerId: borrower.id,
        applicationId: application.id,

        propertyAddress: body.propertyAddress ?? "",
        propertyCity: body.propertyCity ?? "",
        propertyState: body.propertyState ?? "",
        propertyZip: body.propertyZip ?? "",

        occupancyType: body.occupancy ?? null,
        propertyType: body.propertyType ?? null,

        purchasePrice: body.purchasePrice ? Number(body.purchasePrice) : null,
        estimatedValue: body.propertyValue ? Number(body.propertyValue) : null,
        loanAmount: body.loanAmount ? Number(body.loanAmount) : null,   // FIXED
        downPayment: body.downPayment ? Number(body.downPayment) : null,
        downPaymentSource: body.downPaymentSource ?? null,
      },
    });

    // -----------------------------
    // 9. BorrowerDeclarations
    // -----------------------------
    await prisma.borrowerDeclarations.create({
      data: {
        borrowerId: borrower.id,
        applicationId: application.id,
        bankruptcy: body.decBankruptcy ?? null,
        foreclosure: body.decForeclosure ?? null,
        judgments: body.decJudgments ?? null,
        delinquentFederalDebt: body.decFederalDebt ?? null,
        alimonyChildSupport: body.decAlimonyChildSupport ?? null,
        coMakerEndorser: body.decCoMakerEndorser ?? null,
        ownershipInterest: body.decOwnershipInterest ?? null,
        outstandingLiens: body.decOutstandingLiens ?? null,
        citizenshipStatus: body.citizenship ?? null,
        militaryService: body.militaryService ?? null,
      },
    });

    // -----------------------------
    // 10. BorrowerDemographics
    // -----------------------------
    await prisma.borrowerDemographics.create({
      data: {
        borrowerId: borrower.id,
        applicationId: application.id,
        ethnicity: body.ethnicity ?? null,
        race: body.race ?? null,
        sex: body.sex ?? null,
        collectionMethod: body.demographicMethod ?? null,
      },
    });

    // -----------------------------
    // 11. Underwriting Case
    // -----------------------------
    const uwCase = await prisma.underwritingCase.create({
      data: {
        applicationId: application.id,
        status: "PENDING",
      },
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
