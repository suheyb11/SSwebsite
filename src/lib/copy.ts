// The site's UI strings — headings, button labels and the like — in one place
// rather than scattered through the components that render them.

export const t = {
  nav: {
    home: "Home",
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    getInTouch: "Get in touch",
    chatOnWhatsApp: "Chat on WhatsApp",
    admin: "Staff sign-in",
  },
  common: {
    contactUs: "Contact us",
    talkToUs: "Talk to us",
    getStarted: "Get started",
    seePricing: "See pricing",
    learnMore: "Learn more",
    readMore: "Read more",
    open: "Open",
    checkCoverage: "Check coverage",
    backToHome: "Back to home",
    loading: "Loading",
    search: "Search",
    all: "All",
    clear: "Clear",
    close: "Close",
    required: "Required",
    sending: "Sending…",
    send: "Send",
  },
  home: {
    supportBadge: "Support 24/7",
  },
  coverage: {
    checkerEyebrow: "Coverage checker",
    checkerTitle: "Is Somtel live where you are?",
    checkerDescription:
      "Pick your city to see which services are running there today, and what is on the way.",
    selectCity: "Choose your city",
    searchPlaceholder: "Type a city, for example Mogadishu",
    noMatch: "We have no listing for that name yet.",
    noMatchHelp: "Call customer care with your address and we will check it for you.",
    available: "Available in",
    servicesLive: "Services live here",
    region: "Region",
    notListed: "Not listed yet",
  },
  stores: {
    eyebrow: "Find us",
    title: "Somtel shops and agents",
    description:
      "Register a line, replace a SIM, reset an eDahab PIN or set up a new device — in person, with your identification.",
    filterByCity: "Filter by city",
    searchPlaceholder: "Search by name, area or city",
    hours: "Opening hours",
    phone: "Phone",
    noResults: "No branch matches that search.",
    mapPlaceholder: "Interactive map coming soon",
    resultCount: "branches",
    resultCountOne: "branch",
  },
  topup: {
    eyebrow: "Top up",
    title: "Pick a bundle that fits your month",
    description:
      "Choose what you need, see exactly what is included, then activate it from your handset in seconds.",
    category: "What do you need?",
    categories: {
      all: "Everything",
      data: "Data",
      voice: "Voice",
      combo: "Voice + Data",
      home: "Home internet",
    },
    validity: "Validity",
    includes: "What is included",
    perMonth: "month",
    mostPopular: "Most popular",
    howToActivate: "How to activate",
    paymentMethods: "Ways to pay",
    noBundles: "Nothing in this category yet.",
    activateNow: "How do I activate this?",
    buyNow: "Buy now",
    rechargeTitle: "Recharge your line now",
  },
  contact: {
    floatingLabel: "Contact Somtel",
    call: "Call us",
    whatsapp: "WhatsApp",
    email: "Email us",
    form: "Send a message",
    name: "Your name",
    emailField: "Email address",
    message: "Message",
    submit: "Send message",
    successTitle: "Message received",
    successBody: "Thank you. Our team will come back to you shortly.",
    sendAnother: "Send another message",
    errorGeneric: "Something went wrong. Please try again.",
  },
  footer: {
    rights: "All rights reserved.",
    newsletterTitle: "Stay in the loop",
    newsletterText: "Network news, new bundles and offers — no more than once a month.",
    emailPlaceholder: "Your email address",
    subscribe: "Subscribe",
    subscribed: "You are on the list. Thank you.",
  },
} as const;

export default t;

/** The reader's date format. One language, one format. */
export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
