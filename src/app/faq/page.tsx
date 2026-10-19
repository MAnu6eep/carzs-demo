export default function FAQPage() {
  const faqs = [
    {
      q: 'How does the 200+ point quality inspection work?',
      a: 'Every pre-owned vehicle listed on AutoNest undergoes an exhaustive 200+ point inspection conducted by certified automotive engineers. We inspect engine compression, transmission, brake pad thickness, tyre tread depth, frame integrity, electrical diagnostics (OBD scan), and AC cooling.',
    },
    {
      q: 'What is the 5-day moneyback guarantee?',
      a: 'We want you to be 100% satisfied with your car. If within 5 days of delivery (or up to 300 km driven) you decide the car is not right for you, return it to our nearest hub for a full refund with zero cancellation penalty.',
    },
    {
      q: 'Does AutoNest handle RTO transfer and paperwork?',
      a: 'Yes! We manage the entire RTO name transfer, insurance transfer, and legal documentation process. You do not need to visit the RTO office.',
    },
    {
      q: 'Can I get a used car loan on AutoNest?',
      a: 'Absolutuely. We offer pre-approved used car loans starting at 9.5% p.a. through partner banks (HDFC, ICICI, SBI, Axis). Zero down payment options are available based on credit score.',
    },
    {
      q: 'How do I sell my car on AutoNest?',
      a: 'Visit the "Sell Your Car" page, submit your vehicle details, and schedule a free doorstep inspection. You get an instant valuation offer and payment is credited to your bank account before handover.',
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h1>
        <p className="text-xs text-slate-500">Everything you need to know about buying, selling, financing & inspecting pre-owned cars</p>
      </div>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
            <h3 className="text-base font-bold text-slate-900">{f.q}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
