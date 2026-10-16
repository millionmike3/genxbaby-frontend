
const navItems = [
  { name: "Overview", href: "/investor-portal" },
  { name: "Holdings", href: "/investor-portal/holdings" },
  { name: "Performance", href: "/investor-portal/performance" },
  { name: "Cashflow", href: "/investor-portal/cashflow" },
  { name: "Equity Growth", href: "/investor-portal/equity" },
  { name: "Portfolio Intelligence", href: "/investor-portal/intelligence" },
  { name: "Transactions", href: "/investor-portal/transactions" },
];
<nav className="space-y-2">
  {navItems.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className={cn(
        "block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition",
        pathname.startsWith(item.href) && "bg-slate-700 text-white"
      )}
    >
      {item.name}
    </Link>
  ))}
</nav>
