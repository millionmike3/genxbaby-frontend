import { Suspense } from "react";
import type { FC } from "react";

type ApplicationFull = {
  id: string;
  status: string;
  loanAmount: number | null;
  createdAt: string;

  borrower: {
    id: string;
    fullName: string;
    email: string;
  };

  underwriting?: {
    llpa: number | null;
    decision: string | null;
  };

  fraud?: {
    fraudScore: number | null;
    signals: string[] | null;
  };

  pricing?: {
    finalRate: number | null;
    baseRate: number | null;
    adjustments: number | null;
  };

  servicing?: {
    status: string | null;
    nextDueDate: string | null;
  };

  scoring?: {
    riskScore: number | null;
    fraudScore: number | null;
    impulsivenessScore: number | null;
    createdAt: string;
  };

  timeline?: {
    label: string;
    timestamp: string;
  }[];

  documents?: {
    id: string;
    name: string;
    type: string;
    uploadedAt: string;
  }[];
};

async function getApplication(id: string): Promise<ApplicationFull | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/application/${id}/full`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const json = await res.json();
  return json.data ?? null;
}

type PageProps = {
  params: { id: string };
};

const ApplicationPage: FC<PageProps> = async ({ params }) => {
  const app = await getApplication(params.id);

  if (!app) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Application not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">
        Application #{app.id} — {app.status}
      </h1>

      <Suspense fallback={<div>Loading...</div>}>
        <ApplicationSummary app={app} />
        <BorrowerCard borrower={app.borrower} />
        <UnderwritingCard underwriting={app.underwriting} />
        <FraudCard fraud={app.fraud} />
        <PricingCard pricing={app.pricing} />
        <ServicingCard servicing={app.servicing} />
        <ScoringCard scoring={app.scoring} />
        <TimelineCard timeline={app.timeline ?? []} />
        <DocumentsCard documents={app.documents ?? []} />
      </Suspense>
    </div>
  );
};

export default ApplicationPage;

function ApplicationSummary({ app }: { app: ApplicationFull }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Summary</h2>
      <div className="space-y-2 text-sm">
        <div>
          <strong>Status:</strong> {app.status}
        </div>
        <div>
          <strong>Loan Amount:</strong>{" "}
          {app.loanAmount ? `$${app.loanAmount.toLocaleString()}` : "—"}
        </div>
        <div>
          <strong>Created:</strong>{" "}
          {new Date(app.createdAt).toLocaleDateString()}
        </div>
      </div>
    </section>
  );
}

function BorrowerCard({ borrower }: { borrower: ApplicationFull["borrower"] }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Borrower</h2>
      <div className="space-y-2 text-sm">
        <div>
          <strong>Name:</strong> {borrower.fullName}
        </div>
        <div>
          <strong>Email:</strong> {borrower.email}
        </div>
      </div>
    </section>
  );
}

function UnderwritingCard({
  underwriting,
}: {
  underwriting: ApplicationFull["underwriting"];
}) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Underwriting</h2>
      {!underwriting ? (
        <p className="text-sm text-gray-500">No underwriting data.</p>
      ) : (
        <div className="space-y-2 text-sm">
          <div>
            <strong>LLPA:</strong>{" "}
            {underwriting.llpa != null ? underwriting.llpa : "—"}
          </div>
          <div>
            <strong>Decision:</strong> {underwriting.decision ?? "—"}
          </div>
        </div>
      )}
    </section>
  );
}

function FraudCard({ fraud }: { fraud: ApplicationFull["fraud"] }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Fraud</h2>
      {!fraud ? (
        <p className="text-sm text-gray-500">No fraud data.</p>
      ) : (
        <div className="space-y-2 text-sm">
          <div>
            <strong>Fraud Score:</strong>{" "}
            {fraud.fraudScore != null ? fraud.fraudScore : "—"}
          </div>
          <div>
            <strong>Signals:</strong>{" "}
            {fraud.signals && fraud.signals.length
              ? fraud.signals.join(", ")
              : "—"}
          </div>
        </div>
      )}
    </section>
  );
}

function PricingCard({ pricing }: { pricing: ApplicationFull["pricing"] }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Pricing</h2>
      {!pricing ? (
        <p className="text-sm text-gray-500">No pricing data.</p>
      ) : (
        <div className="space-y-2 text-sm">
          <div>
            <strong>Final Rate:</strong>{" "}
            {pricing.finalRate != null ? `${pricing.finalRate}%` : "—"}
          </div>
          <div>
            <strong>Base Rate:</strong>{" "}
            {pricing.baseRate != null ? `${pricing.baseRate}%` : "—"}
          </div>
          <div>
            <strong>Adjustments:</strong>{" "}
            {pricing.adjustments != null ? pricing.adjustments : "—"}
          </div>
        </div>
      )}
    </section>
  );
}

function ServicingCard({
  servicing,
}: {
  servicing: ApplicationFull["servicing"];
}) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Servicing</h2>
      {!servicing ? (
        <p className="text-sm text-gray-500">No servicing data.</p>
      ) : (
        <div className="space-y-2 text-sm">
          <div>
            <strong>Status:</strong> {servicing.status ?? "—"}
          </div>
          <div>
            <strong>Next Due Date:</strong>{" "}
            {servicing.nextDueDate
              ? new Date(servicing.nextDueDate).toLocaleDateString()
              : "—"}
          </div>
        </div>
      )}
    </section>
  );
}

function ScoringCard({ scoring }: { scoring: ApplicationFull["scoring"] }) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Behavior Scores</h2>
      {!scoring ? (
        <p className="text-sm text-gray-500">No scoring data.</p>
      ) : (
        <div className="space-y-2 text-sm">
          <div>
            <strong>Risk Score:</strong>{" "}
            {scoring.riskScore != null ? scoring.riskScore : "—"}
          </div>
          <div>
            <strong>Fraud Score:</strong>{" "}
            {scoring.fraudScore != null ? scoring.fraudScore : "—"}
          </div>
          <div>
            <strong>Impulsiveness:</strong>{" "}
            {scoring.impulsivenessScore != null
              ? scoring.impulsivenessScore
              : "—"}
          </div>
          <div>
            <strong>Last Updated:</strong>{" "}
            {new Date(scoring.createdAt).toLocaleString()}
          </div>
        </div>
      )}
    </section>
  );
}

function TimelineCard({
  timeline,
}: {
  timeline: NonNullable<ApplicationFull["timeline"]>;
}) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Timeline</h2>
      {timeline.length === 0 ? (
        <p className="text-sm text-gray-500">No timeline events.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {timeline.map((t, idx) => (
            <li key={idx}>
              <strong>{t.label}:</strong>{" "}
              {new Date(t.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function DocumentsCard({
  documents,
}: {
  documents: NonNullable<ApplicationFull["documents"]>;
}) {
  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Documents</h2>
      {documents.length === 0 ? (
        <p className="text-sm text-gray-500">No documents uploaded.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {documents.map((doc) => (
            <li key={doc.id}>
              <strong>{doc.name}</strong> ({doc.type}) —{" "}
              {new Date(doc.uploadedAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
