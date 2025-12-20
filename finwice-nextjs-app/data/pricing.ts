export const pricingPlans = [
  {
    title: "Basic Plan",
    price: 1000,
    per: "/ per month",
    features: [
      "Includes initial consultation",
      "up to 5 hours of consulting",
      "Weekly check-ins",
      "Email support",
    ],
    bestValue: false,
    btnClass: "tf-btn style-1 style-border w-full text-center",
    spacingClass: "mb-24",
  },
  {
    title: "Professional Plan",
    price: 3500,
    per: "/ per month",
    features: [
      "Includes initial consultation",
      "up to 15 hours of consulting",
      "Weekly check-ins",
      "Email & Phone support",
    ],
    bestValue: true,
    btnClass: "tf-btn style-1 bg-color-primary w-full text-center",
    spacingClass: "mb-24",
  },
  {
    title: "Premium Plan",
    price: 8500,
    per: "/ per month",
    features: [
      "Includes initial consultation",
      "Unlimited consulting hours",
      "Dedicated consultant",
      "24/7 support",
    ],
    bestValue: false,
    btnClass: "tf-btn style-1 style-border w-full text-center",
    spacingClass: "mb-28",
  },
];

export const pricingPlans2 = [
  {
    title: "Basic Plan",
    price: 259,
    isBestValue: false,
    features: [
      { text: "Core financial planning tools", available: true },
      { text: "Monthly plan adjustments", available: true },
      { text: "Up to 5 user accounts", available: true },
      { text: "Email support", available: true },
      { text: "Advanced reporting insights", available: false },
      { text: "Dedicated account manager", available: false },
      { text: "Priority support options", available: false },
    ],
  },
  {
    title: "Professional Plan",
    price: 359,
    isBestValue: true,
    features: [
      { text: "Core financial planning tools", available: true },
      { text: "Monthly plan adjustments", available: true },
      { text: "Up to 20 user accounts", available: true },
      { text: "Advanced reporting insights", available: true },
      { text: "Priority email and chat support", available: true },
      { text: "24/7 phone support", available: false },
      { text: "Unlimited user accounts", available: false },
    ],
  },
  {
    title: "Premium Plan",
    price: 519,
    isBestValue: false,
    features: [
      { text: "All Professional Plan features", available: true },
      { text: "24/7 phone and priority support", available: true },
      { text: "Customizable user permissions", available: true },
      { text: "Unlimited user accounts", available: true },
      { text: "Advanced reporting insights", available: true },
      { text: "Access to exclusive tools & updates", available: true },
      { text: "Priority support options", available: true },
    ],
  },
];
