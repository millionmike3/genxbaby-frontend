// admin-dashboard/components/AdminSidebar.tsx

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Behavior Engine", href: "/behavior" },
  { name: "Stock Sanitizer", href: "/stock" },

  // NEW BLUETOOTH SECTION
  {
    name: "Bluetooth Intelligence",
    children: [
      { name: "Overview", href: "/bluetooth" },
      { name: "Alerts", href: "/bluetooth/alerts" },
      { name: "Correlation", href: "/bluetooth/correlation" },
      { name: "Real-Time Stream", href: "/bluetooth/realtime" },
      { name: "Fingerprinting", href: "/bluetooth/fingerprints" },
    ],
  },
];
