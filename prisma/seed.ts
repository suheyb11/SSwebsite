// Seeds the local database with the real content from the old site.
// Run with: npm run db:seed

import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";
import { generatedSections } from "./generated-sections";
import type { SectionSeed } from "./seed-types";

const db = new PrismaClient();

// Helper so we can write features as a normal array and store them as JSON.
const f = (...items: string[]) => JSON.stringify(items);


// Legal copy lives here rather than inline below, so the products array stays readable.
// TODO: have both documents reviewed by legal counsel before publishing.

const PRIVACY_BODY = [
  "## Introduction",
  "",
  "Somtel Somalia respects your privacy. This policy explains what personal information we collect when you use our mobile, internet, eDahab and business services, why we collect it, how we protect it, and the choices you have.",
  "",
  "It applies to our network services, our retail outlets, this website and the applications we publish.",
  "",
  "## Information we collect",
  "",
  "- **Registration details** such as your name, identification document, date of birth and address, collected when you register a SIM or an eDahab account as required by law",
  "- **Contact details** including the phone number and email address you give us",
  "- **Service usage records** such as call and SMS records, data volumes, and the network cells your device connects through, which we need to route traffic and bill correctly",
  "- **Transaction records** for eDahab payments, transfers and savings",
  "- **Support records** including notes from calls to customer care and messages sent through this website",
  "- **Website information** such as pages visited and approximate location derived from your IP address",
  "",
  "## Why we use it",
  "",
  "- To provide, maintain and repair the services you have asked for",
  "- To bill you accurately and to process payments",
  "- To verify your identity and keep your account and money secure",
  "- To answer your questions and resolve faults",
  "- To detect and prevent fraud, abuse of the network and unlawful activity",
  "- To improve our coverage, capacity and product range",
  "- To send you service messages, and marketing messages where you have not opted out",
  "",
  "## Legal basis and obligations",
  "",
  "Some information is collected because the law requires it, including SIM registration and the identification checks that apply to mobile money. We may be required to disclose information to regulators, law enforcement or courts where a valid legal request is made.",
  "",
  "## Sharing your information",
  "",
  "We do not sell your personal information. We share it only with:",
  "",
  "- **Service partners** who help deliver our services, such as roaming partners and payment networks, under contracts that require them to protect it",
  "- **Regulators and authorities** where we are legally obliged to do so",
  "- **Professional advisers** such as auditors, bound by confidentiality",
  "",
  "## How we protect it",
  "",
  "We use encryption, access controls, PIN protection and monitoring to keep your information safe. Access inside Somtel is limited to staff who need it for their work, and all staff are bound by confidentiality obligations. Somtel staff will never ask you for your PIN or a verification code.",
  "",
  "## How long we keep it",
  "",
  "We keep information for as long as you are a customer and afterwards for the period required by law or by our regulator, whichever is longer. Records that are no longer needed are securely destroyed.",
  "",
  "## Your choices",
  "",
  "- **Access** - ask us what information we hold about you",
  "- **Correction** - ask us to correct anything inaccurate; registered details are updated in person at an outlet",
  "- **Marketing** - opt out of marketing messages at any time without affecting your service",
  "- **Complaints** - raise a concern with customer care and we will investigate",
  "",
  "## Children",
  "",
  "Our services are intended for customers who meet the minimum age for registration under Somali law. We do not knowingly collect information from children below that age.",
  "",
  "## Cookies on this website",
  "",
  "This website uses a small number of cookies to remember your theme preference and to understand which pages are most useful. You can clear or block cookies in your browser at any time; the site will continue to work.",
  "",
  "## Changes to this policy",
  "",
  "We may update this policy as our services change or as the law requires. The date at the bottom of this page shows when it was last revised.",
  "",
  "## Contact us",
  "",
  "If you have a question about this policy or about the information we hold, contact Somtel customer care or write to us using the details on our contact page.",
].join("\n");

const TERMS_BODY = [
  "## Agreement",
  "",
  "These terms apply when you use any Somtel Somalia service, including mobile voice and data, Fiber Home, Fiber Optic, eDahab, Keydso, business messaging and this website. By registering a line, using a service, or continuing to use this website, you accept them.",
  "",
  "## Your account",
  "",
  "- You must register with valid identification and give accurate details",
  "- You are responsible for activity on your line and on your eDahab account",
  "- Keep your PIN and any verification codes private; never share them with anyone",
  "- Tell us immediately if your device is lost or stolen, or if you suspect unauthorised use",
  "",
  "## Using our services",
  "",
  "You agree to use our services lawfully and considerately. You must not:",
  "",
  "- Use the network to commit fraud, send unsolicited bulk messages, or harass another person",
  "- Interfere with the network, attempt to gain unauthorised access, or resell our services without a written agreement",
  "- Use our services in a way that damages the network or degrades service for other customers",
  "",
  "We may suspend or terminate a line that breaches these rules, and we will report unlawful activity to the authorities.",
  "",
  "## Charges and payment",
  "",
  "- Prepaid services are drawn from your balance as you use them",
  "- Postpaid services are invoiced monthly and payable by the date shown on the statement",
  "- Bundles run until their allowance is used or their validity ends, whichever comes first; unused allowance does not carry over unless the bundle terms say so",
  "- Published prices may change; we will give notice of changes affecting an active contract",
  "- Late payment on a postpaid account may lead to suspension until the balance is settled",
  "",
  "## eDahab and Keydso",
  "",
  "Mobile money services carry additional identification requirements and transaction limits set by regulation. Check the recipient number before confirming any transfer - completed transfers cannot be reversed automatically, though we will assist a recovery request where one is reported promptly.",
  "",
  "## Equipment",
  "",
  "Routers, Mifi devices and other equipment supplied with a service remain subject to the terms of that service. Equipment supplied on loan must be returned in working order when the service ends. Devices purchased outright carry the manufacturer warranty.",
  "",
  "## Service availability",
  "",
  "We work to keep our services available at all times, but no network is free of interruption. Coverage, speed and quality vary with location, terrain, device, network load and weather. Planned maintenance is notified in advance where practical. Business customers with a written service-level agreement are covered by the terms of that agreement.",
  "",
  "## Fair use",
  "",
  "Unlimited plans are for normal personal or business use. We may manage traffic where usage is extreme enough to affect other customers, and we will contact you before taking any action on your account.",
  "",
  "## Liability",
  "",
  "We are responsible for providing our services with reasonable care and skill. To the extent permitted by law, we are not liable for indirect or consequential loss, including lost profits or lost data, arising from a service interruption. Nothing in these terms excludes liability that cannot lawfully be excluded.",
  "",
  "## Ending a service",
  "",
  "You may end a service by contacting customer care, subject to any minimum term agreed at sign-up. We may end a service where these terms are breached, where required by law, or where we give reasonable notice of withdrawing a product.",
  "",
  "## Privacy",
  "",
  "Our handling of your personal information is described in our Privacy Policy, which forms part of these terms.",
  "",
  "## Changes to these terms",
  "",
  "We may update these terms as our services and obligations change. Material changes will be notified through our usual channels, and the date at the bottom of this page shows when the terms were last revised.",
  "",
  "## Governing law",
  "",
  "These terms are governed by the laws of the Federal Republic of Somalia, and disputes are subject to the jurisdiction of its courts.",
  "",
  "## Contact us",
  "",
  "Questions about these terms can be raised with Somtel customer care or through our contact page.",
].join("\n");

async function main() {
  console.log("Clearing existing data...");
  await db.jobApplication.deleteMany();
  await db.job.deleteMany();
  await db.event.deleteMany();
  await db.plan.deleteMany();
  await db.faq.deleteMany();
  await db.coverageArea.deleteMany();
  await db.page.deleteMany();
  await db.feature.deleteMany();
  await db.pageSection.deleteMany();
  await db.store.deleteMany();
  await db.promo.deleteMany();
  await db.adminUser.deleteMany();
  await db.product.deleteMany();
  await db.post.deleteMany();
  await db.category.deleteMany();
  await db.slide.deleteMany();
  await db.testimonial.deleteMany();
  await db.partner.deleteMany();
  await db.contactMessage.deleteMany();
  await db.subscriber.deleteMany();
  await db.setting.deleteMany();

  // ---------- Site settings ----------
  console.log("Seeding settings...");
  const settings: Record<string, string> = {
    companyName: "Somtel Somalia",
    tagline:
      "We believe in upholding high standards of service and corporate social responsibilities guided by our values.",
    email: "info@somtelsomalia.net",
    phone: "+252-624-666-666",
    phoneExtra: "151 | 152 | 215000",
    address: "Howlwadag St. Bakaro Market, Mogadishu-Somalia",
    whatsapp: "https://api.whatsapp.com/send?phone=252624666666",
    facebook: "https://www.facebook.com/SomtelSomalia",
    instagram: "https://www.instagram.com/somtelsomalia.so/",
    twitter: "https://x.com/somtel_so",
    youtube: "https://www.youtube.com/@somtelsomalia",

    // App download links, editable from the dashboard under Settings.
    // TODO: get the Play Store and App Store listing URLs for both apps from
    // the digital team — the app cards hide any button whose link is blank.
    dahabPlusSite: "https://www.dahabplus.com/",
    dahabPlusAndroid: "",
    dahabPlusIos: "",
    superAppSite: "",
    superAppAndroid: "",
    superAppIos: "",
  };
  for (const [key, value] of Object.entries(settings)) {
    await db.setting.create({ data: { key, value } });
  }

  // ---------- Hero slides (from the old owl.carousel slider) ----------
  console.log("Seeding slides...");
  await db.slide.createMany({
    data: [
      {
        title: "Superfast",
        subtitle: "Broadband Internet",
        text: "Experience unlimited speed and reliable connectivity with Somtel Broadband. Stay connected anytime, anywhere.",
        // The ss* set: campaign artwork on a light ground with the subject to
        // the right, which is what this hero needs — the old slider/*.jpg files
        // are 8000x2421 banners whose subject sits outside any 16:9 crop.
        imageUrl: "/assets/images/slider/ss5.jpg",
        ctaLabel: "Get Connected",
        ctaHref: "/fiberoptic",
        order: 1,
      },
      {
        title: "Talk More,",
        subtitle: "Less Pay",
        text: "Unlimited national calls across South Central, Puntland and Somaliland with Muraadso.",
        imageUrl: "/assets/images/slider/ss4.jpg",
        ctaLabel: "See Plans",
        ctaHref: "/Muraadso",
        order: 2,
      },
      {
        title: "eDahab",
        subtitle: "Services",
        text: "The most comprehensive and accessible package of mobile banking features in Somalia.",
        imageUrl: "/assets/images/slider/ss1.jpg",
        ctaLabel: "Discover eDahab",
        ctaHref: "/eDahab",
        order: 3,
      },
      {
        title: "Stay Connected",
        subtitle: "Everywhere",
        text: "Portable, reliable mobile internet wherever you go with Somtel Mifi.",
        imageUrl: "/assets/images/slider/ss3.jpg",
        ctaLabel: "Explore Mifi",
        ctaHref: "/Mifi",
        order: 4,
      },
    ],
  });

  // ---------- Testimonials ----------
  console.log("Seeding testimonials...");
  await db.testimonial.createMany({
    data: [
      {
        name: "Abukar Mohamed Mohamud",
        position: "General Manager of Shabelle Group",
        quote:
          "We sincerely thank Somtel Somalia for providing reliable internet services that support our daily TV and radio work. Their service has made it easier for Shabelle TV to broadcast live and connect with our global audience seamlessly.",
        imageUrl: "/assets/images/Photos_1.jpeg",
        order: 1,
      },
      {
        name: "Abbas Ali Ahmed",
        position: "CEO - Signjet Printing Company",
        quote:
          "We sincerely appreciate Somtel Somalia for its reliable telecommunications services that play a vital role in our daily operations. Their internet services have enhanced our efficiency, strengthened nationwide interconnectivity, and the eDahab service has simplified our financial transactions.",
        imageUrl: "/assets/images/Photos_2.jpeg",
        order: 2,
      },
    ],
  });

  // ---------- Partners (logos on the About page) ----------
  console.log("Seeding partners...");
  await db.partner.createMany({
    data: [
      { name: "Bluecom", logoUrl: "/assets/images/brand/bluecom.png", order: 1 },
      { name: "Bluesky", logoUrl: "/assets/images/brand/bluesky.png", order: 2 },
      { name: "Huawei", logoUrl: "/assets/images/brand/huwei.png", order: 3 },
      { name: "eDahab", logoUrl: "/assets/images/brand/edahab.png", order: 4 },
      { name: "DBI", logoUrl: "/assets/images/brand/dbi.png", order: 5 },
      { name: "DMT", logoUrl: "/assets/images/brand/dmt.png", order: 6 },
    ],
  });

  // ---------- Products, plans and FAQs ----------
  console.log("Seeding products...");

  type ProductSeed = {
    slug: string;
    name: string;
    category: string;
    tagline?: string;
    heroTitle?: string;
    heroText?: string;
    heroImage?: string;
    body?: string;
    order: number;
    plans?: { title: string; price: number; unit?: string; features: string; highlight?: boolean }[];
    faqs?: { question: string; answer: string }[];
  };

  const products: ProductSeed[] = [
    {
      slug: "Prepaid",
      name: "Prepaid",
      category: "personal",
      tagline: "Affordable and value-packed prepaid plans",
      heroTitle: "Prepaid Service",
      heroText:
        "Stay connected on your terms with affordable, pay-as-you-go options. Get clear calls with no hidden charges, all on Somtel's reliable network.",
      heroImage: "/assets/images/slider/airtime.jpg",
            // TODO: confirm current airtime tariffs, the validity window and the DID Call setup fee with the commercial team.
      body:
        "## Prepaid, on your terms\n\nSomtel Prepaid is the simplest way to stay connected. You top up when it suits you, you spend only what you have already paid for, and no bill turns up at the end of the month. Every call, message and megabyte comes out of credit you control.\n\n## Three ways to spend your credit\n\n- **Muraadso** converts your credit into unlimited national calling for a fixed daily, weekly or monthly fee.\n- **Akram Voice** buys a block of national minutes that never expires - ideal if you call in bursts rather than every day.\n- **Airtime** stays as flexible credit for calls, SMS and data, or can be turned into a Kaafiye Plus or Dhamays Plus bundle whenever you need one.\n\nYou are never locked into one of them. Move between Muraadso, Akram and plain airtime as your month changes.\n\n## Topping up\n\nTop up from the eDahab app, from any eDahab agent, at a Somtel outlet, or with a scratch card. Credit reaches your line immediately and a confirmation SMS records your new balance, so there is always a receipt.\n\n## What it costs\n\nPrepaid has no monthly fee, no minimum spend and no contract. You pay for the bundle or the minutes you choose, and nothing else. Tariffs and balances are checked with a short USSD code from your handset at no charge.\n\n## Keeping your line active\n\nUse your line at least once in any ninety-day period - a call, an SMS or a data session is enough - and your number stays yours. A line left completely unused for longer can be recycled, which is the rule across the Somali market.\n\n## DID Call for small businesses\n\nDirect inward dialling gives a business its own published numbers that ring straight through to the right person, without installing extra physical lines. It works alongside a prepaid line and is set up by our business team.\n\n## Ready to move to a monthly account?\n\nIf you would rather receive one invoice and stop topping up, Somtel Postpaid gives you the same network with a monthly bill and a set allowance.",
      order: 1,
      plans: [
        {
          title: "Muraadso Unlimited",
          price: 0.25,
          unit: "Day",
          features: f(
            "Premium unlimited national calls",
            "South Central, Puntland and Somaliland",
            "Ideal for frequent callers"
          ),
          highlight: true,
        },
        {
          title: "Akram Voice",
          price: 1,
          unit: "package",
          features: f("Nationwide call minutes", "Controlled, cost-effective usage", "No expiry"),
        },
        {
          title: "Airtime",
          price: 1,
          unit: "credit",
          features: f(
            "Local and international calls",
            "Convertible to data",
            "Full interconnection across all Somali networks"
          ),
        },
      ],
      faqs: [
        {
          question: "How do I top up my Somtel prepaid line?",
          answer:
            "You can top up with a scratch card, through eDahab by dialling *770#, or at any Somtel outlet nationwide.",
        },
        {
          question: "Does my Airtime credit expire?",
          answer:
            "Airtime credit does not expire. Bundled minute packages follow the validity shown on each package.",
        },
        {
          question: "Can I convert Airtime into data?",
          answer:
            "Yes. Airtime is flexible credit and can be converted into a data bundle at any time from your handset.",
        },
        {
          question: "How do I check my airtime balance?",
          answer:
            "Dial the balance short code from your Somtel handset. The check is free and the reply shows your airtime credit along with any active bundle and its expiry date.",
        },
        {
          question: "Does my prepaid credit expire?",
          answer:
            "Airtime credit itself does not expire, but a line must be used at least once every ninety days to stay active. A call, an SMS or a data session is enough.",
        },
        {
          question: "Can I switch from Prepaid to Postpaid and keep my number?",
          answer:
            "Yes. Bring your identification to any Somtel outlet and we will move your number onto a monthly account without changing it.",
        },
      ],
    },
    {
      slug: "Postpaid",
      name: "Postpaid",
      category: "personal",
      tagline: "Pay monthly, stay connected",
      heroTitle: "Postpaid Service",
      heroText:
        "A monthly plan for customers who want predictable billing, bundled minutes and priority support.",
      heroImage: "/assets/images/slider/airtime.jpg",
      body:
        "## One bill, everything included\n\nSomtel Postpaid brings your voice, data and SMS together on a single monthly invoice. You use the network first and settle once, which makes budgeting straightforward for households and easy to reconcile for finance teams.\n\n## Why customers choose Postpaid\n\n- **Predictable spending** - the same amount every month, with a clear statement showing exactly what you used\n- **No interruptions** - you are never cut off mid-call because a bundle ran out\n- **Priority support** - postpaid accounts reach a dedicated care line\n- **Shared accounts** - add employee or family lines to one invoice and manage them centrally\n\n## Built for teams\n\nBusinesses can group any number of lines under one account, set a spending limit per line, and receive an itemised statement each month. Our enterprise team will help you pick the right mix of allowances for your staff.\n\n## Getting started\n\nBring valid identification to any Somtel outlet. Registration takes a few minutes and your plan is active the same day. Existing prepaid customers keep their number when they migrate.\n\n## Billing and payment\n\nStatements are issued at the start of each month and can be settled through eDahab, at any Somtel outlet, or by bank transfer for corporate accounts.",
      order: 2,
      plans: [
        {
          title: "Postpaid Personal",
          // TODO: confirm the real monthly price with the commercial team.
          price: 15,
          unit: "month",
          features: f(
            "Bundled national minutes and SMS",
            "Monthly data allowance included",
            "One simple monthly statement",
            "Keep your existing Somtel number"
          ),
        },
        {
          title: "Postpaid Plus",
          // TODO: confirm the real monthly price with the commercial team.
          price: 30,
          unit: "month",
          features: f(
            "Generous national minutes and SMS",
            "Larger monthly data allowance",
            "Priority customer care line",
            "Roaming available on request"
          ),
          highlight: true,
        },
        {
          title: "Postpaid Business",
          // TODO: confirm the real per-line price with the enterprise team.
          price: 45,
          unit: "line / month",
          features: f(
            "Multiple lines on a single invoice",
            "Per-line spending controls",
            "Itemised monthly statement",
            "Dedicated account manager"
          ),
        },
      ],
      faqs: [
        {
          question: "How do I apply for a postpaid line?",
          answer:
            "Visit any Somtel outlet with valid identification. Our team will register your account and activate your plan the same day.",
        },
        {
          question: "When is my postpaid bill due?",
          answer:
            "Bills are issued at the start of each month and are payable within the billing period shown on your statement.",
        },
        {
          question: "Can I switch from prepaid to postpaid?",
          answer:
            "Yes. Bring your SIM and identification to a Somtel outlet and we will migrate your number to a postpaid plan.",
        },
      ],
    },
    {
      slug: "Muraadso",
      name: "Muraadso",
      category: "personal",
      tagline: "Unlimited calling across every Somtel network",
      heroTitle: "Muraadso Services & More",
      heroText:
        "Muraadso Service provides an exceptional solution for unlimited, affordable calling across all Somtel networks in Somalia (62), Puntland (66), and Somaliland (65).",
      heroImage: "/assets/images/slider/muradso.jpg",
            // TODO: confirm the Muraadso short code, current pricing tiers and the fair-use threshold.
      body:
        "## Unlimited national calling\n\nMuraadso is built for people whose day runs on the phone. One fixed fee gives you unlimited calls to every Somali network - no per-minute rate quietly counting down in the background, and no bill shock at the end of the week.\n\n## Who it suits\n\n- **Business owners and traders** who negotiate, chase orders and coordinate deliveries by phone all day\n- **Families spread across the country** who would rather talk than message\n- **Students and young professionals** who want one predictable cost instead of constant top-ups\n\n## How it works\n\nPick the validity that matches how you work: daily if your calling comes in bursts, weekly for a busy stretch, monthly if the phone never stops. Subscribe from your handset with the Muraadso short code or through eDahab, and the plan activates immediately.\n\nWhen a plan expires it simply stops - nothing is auto-charged without your say-so, and you can resubscribe the moment you need it again.\n\n## Good to know\n\n- Unlimited calling covers all national networks across Somalia, Puntland and Somaliland\n- International calls and roaming are charged separately from your airtime balance\n- Muraadso is a voice plan; pair it with a Kaafiye Plus or Dhamays Plus bundle if you also want data\n- Fair-use rules apply to prevent commercial call resale, not normal personal or business calling\n\n## Where to get it\n\nSubscribe from your own handset, through the eDahab app, or at any Somtel outlet. Our staff will register the line and set the first plan up with you.",
      order: 3,
      plans: [
        {
          title: "Daily",
          price: 0.25,
          unit: "Day",
          features: f("24/hr Call", "If you have eDahab, dial 101#", "If you have Kuhadal, dial 202#", "24/7 support"),
          highlight: true,
        },
        {
          title: "Weekly",
          price: 1.5,
          unit: "Weekly",
          features: f("7/Days call", "If you have eDahab, dial 101#", "If you have Kuhadal, dial 202#", "24/7 support"),
        },
        {
          title: "Monthly",
          price: 5,
          unit: "Monthly",
          features: f("30/Days call", "If you have eDahab, dial 101#", "If you have Kuhadal, dial 202#", "24/7 support"),
        },
      ],
      faqs: [
        {
          question: "How does Muraadso Service enable unlimited calling across Somtel networks without changing SIM cards?",
          answer:
            "Muraadso Service leverages advanced technology to seamlessly integrate with all Somtel networks in Somalia (62), Puntland (66), and Somaliland (65). This eliminates the need for users to switch SIM cards, ensuring uninterrupted connectivity across these regions.",
        },
        {
          question: "Who can benefit from using Muraadso Service?",
          answer:
            "Muraadso Service is designed for both youth and business professionals who require reliable and affordable communication. Whether for personal use or business purposes, Muraadso provides high-quality service at a competitive price.",
        },
        {
          question: "Is Muraadso Service available nationwide, and how can I subscribe?",
          answer:
            "Yes, Muraadso Service is available across Somalia, Puntland, and Somaliland. To subscribe, visit your nearest Somtel outlet or use the online registration platform to activate the service and enjoy unlimited calling.",
        },
        {
          question: "Does Muraadso include data?",
          answer:
            "No, Muraadso is a voice plan. Pair it with a Kaafiye Plus or Dhamays Plus bundle if you also want data on the same line.",
        },
        {
          question: "Are international calls included?",
          answer:
            "No. Unlimited calling covers national networks only. International calls are charged from your airtime balance at the standard rate for the destination.",
        },
      ],
    },
    {
      slug: "Akram",
      name: "Akram Voice",
      category: "personal",
      tagline: "Bundled minutes that never expire",
      heroTitle: "Akram Voice",
      heroText:
        "Affordable plan with nationwide call minutes - perfect for controlled, cost-effective usage.",
      heroImage: "/assets/images/slider/airtime.jpg",
            // TODO: confirm the Akram short code and the exact minute allocation for each package.
      body:
        "## Minutes that wait for you\n\nAkram Voice is a straightforward idea: buy a block of national minutes, use them whenever you like, and never watch them expire. If your calling is heavy one week and quiet the next, nothing goes to waste.\n\n## Why people choose Akram\n\n- **No expiry date.** Minutes stay on your line until you spend them.\n- **Predictable cost.** You know exactly what you paid and exactly what you have left.\n- **It stacks.** Buy another package at any time and the minutes are added to your existing balance.\n- **Nationwide.** Minutes cover calls to every Somali network, not just Somtel lines.\n\n## Choosing a package\n\nPackages run from one to five dollars, and the minutes scale with the price - roughly a hundred and forty national minutes for every dollar. Light callers usually start at the bottom and top up when the balance runs low; heavier users buy the largest package and forget about it for a while.\n\n## Subscribing and checking your balance\n\nDial the Akram short code from your Somtel line to subscribe, or buy through the eDahab app. A confirmation SMS shows your new minute balance, and the same short code reports what you have left at any time, free of charge.\n\n## Akram or Muraadso?\n\nAkram is the better fit if you call in bursts and want your minutes to last. Muraadso is the better fit if you are on the phone constantly and would rather pay one flat fee for unlimited calling. Both run on the same prepaid line, so you can use whichever suits the month.",
      order: 4,
      plans: [
        { title: "$1 / package", price: 1, unit: "package", features: f("140 MIN", "No Exp"), highlight: true },
        { title: "$2 / package", price: 2, unit: "package", features: f("280 MIN", "No Exp") },
        { title: "$3 / package", price: 3, unit: "package", features: f("420 MIN", "No Exp") },
        { title: "$4 / package", price: 4, unit: "package", features: f("560 MIN", "No Exp") },
        { title: "$5 / package", price: 5, unit: "package", features: f("700 MIN", "No Exp") },
      ],
      faqs: [
        {
          question: "Do Akram Voice minutes expire?",
          answer: "No. Akram packages carry no expiry date, so your minutes stay available until you use them.",
        },
        {
          question: "How do I subscribe to an Akram package?",
          answer: "Dial the Akram short code from your Somtel line, or subscribe through eDahab.",
        },
        {
          question: "Can I buy more than one package at a time?",
          answer: "Yes. Packages stack, and the minutes are added to your existing balance.",
        },
        {
          question: "Which networks can I call with Akram minutes?",
          answer: "Akram minutes cover calls to all Somali networks nationwide.",
        },
      ],
    },
    {
      slug: "Dhameys",
      name: "Dhamays Plus",
      category: "personal",
      tagline: "Unlimited voice and data, one bundle",
      heroTitle: "The Unlimited Voice & Data",
      heroText: "High speed internet and unlimited voice at a low cost price, with Nashaad IPTV included.",
      heroImage: "/assets/images/Dhameys Plus.png",
            // TODO: confirm the Dhamays Plus short code, the speed tiers and the Nashaad IPTV channel line-up.
      body:
        "## One bundle, everything included\n\nDhamays Plus puts unlimited data, unlimited national calling and Nashaad IPTV into a single subscription. One price, one expiry date, nothing else to add on.\n\n## What you get\n\n- **Unlimited high-speed data** for browsing, social media, video calls and streaming\n- **Unlimited national voice** to every Somali network\n- **Nashaad IPTV** included, so live channels and on-demand content work on the same subscription\n- **No hidden charges** and no surprise deductions from your airtime balance\n\n## Picking your validity\n\n- **Daily** is for short trips, heavy one-off days and testing the service before committing\n- **Weekly** suits people who want a full week of connectivity without a monthly outlay\n- **Monthly** is the best value and the option most subscribers settle on\n\nEvery tier carries the same unlimited allowance. The only difference is how long it lasts.\n\n## How to subscribe\n\nSubscribe from the Somtel app, through eDahab, or by dialling the Dhamays Plus short code from your handset. Activation is immediate and a confirmation SMS records the expiry date. Renewals can be set to run automatically, or left manual so you decide each time.\n\n## Fair use in plain language\n\nUnlimited means unlimited for normal personal use. What is not allowed is using a consumer bundle to run a commercial hotspot or resell connectivity - if you need that, our business team has the right product for it.",
      order: 5,
      plans: [
        {
          title: "Daily",
          price: 0.7,
          unit: "Day",
          features: f("Unlimited Data & voice", "High Speed", "Daily", "Nashaad IPTV"),
        },
        {
          title: "Weekly Plan",
          price: 4.25,
          unit: "Weekly",
          features: f("Unlimited Data & voice", "High Speed", "Weekly", "Nashaad IPTV"),
          highlight: true,
        },
        {
          title: "Monthly Plan",
          price: 17.5,
          unit: "Monthly",
          features: f("Unlimited Data & voice", "High Speed", "Monthly", "Nashaad IPTV"),
        },
      ],
      faqs: [
        {
          question: "What makes Dhamays Plus different from other data and voice bundles?",
          answer:
            "Dhamays Plus offers truly unlimited data and voice services with no caps or restrictions, ensuring seamless connectivity at competitive prices. Unlike other providers, there are no data limits or voice call restrictions.",
        },
        {
          question: "Are there any hidden charges or fair usage policies with Dhamays Plus?",
          answer:
            "No, Dhamays Plus provides unlimited access without hidden fees or restrictive fair usage policies. Users can enjoy uninterrupted high-speed internet and voice services without unexpected charges.",
        },
        {
          question: "How can I subscribe to Dhamays Plus?",
          answer:
            "You can subscribe to Dhamays Plus through the provider's official app, website, or by dialing the designated USSD code. For more details, visit your nearest customer service center or check the official Dhamays Plus platform.",
        },
        {
          question: "Does Dhamays Plus work while roaming?",
          answer:
            "No. The unlimited allowance applies on the Somtel network at home. Roaming is charged separately, so activate a roaming package before you travel.",
        },
        {
          question: "Can I share my Dhamays Plus data with other devices?",
          answer:
            "Yes, you can tether your phone for personal use such as a laptop or tablet. Running a permanent commercial hotspot is not covered by a consumer bundle.",
        },
      ],
    },
    {
      slug: "Kaafiye",
      name: "Kaafiye Plus",
      category: "personal",
      tagline: "Voice + Data + SMS",
      heroTitle: "Kaafiye Plus",
      heroText: "Voice, data and SMS combined into one simple, affordable package.",
      heroImage: "/assets/images/kaafiye14.png",
            // TODO: confirm the Kaafiye Plus short code and the exact voice, data and SMS allowances per validity.
      body:
        "## Voice, data and SMS in one place\n\nKaafiye Plus bundles the three things a phone actually needs into a single package, at a single price. No separate data bundle, no separate SMS pack, no juggling.\n\n## What is inside\n\n- **National voice minutes** to every Somali network\n- **High-speed data** for messaging, social media, maps and streaming\n- **SMS allowance** for the messages that still matter - banks, deliveries, verification codes\n- **24/7 support** on the same care line as every other Somtel service\n\n## Daily, weekly or monthly\n\nKaafiye Plus comes in three validities so the cost matches how you use your phone. The daily bundle is good for a short burst of activity, the weekly is the middle ground, and the monthly gives the lowest cost per day for anyone who is connected all the time.\n\n## Checking what you have left\n\nDial the Kaafiye Plus short code to see your remaining voice, data and SMS in one message, free of charge. The Somtel app shows the same breakdown with the expiry date.\n\n## Subscribing\n\nSubscribe through the Somtel app, the eDahab app, or the Kaafiye Plus short code from your handset. Any Somtel outlet can also set it up and explain which validity fits your usage.\n\n## If you need more data\n\nPair Kaafiye Plus with a data bundle when you have a heavy month, or move up to Dhamays Plus for unlimited data and voice on one subscription.",
      order: 6,
      plans: [
        // TODO: confirm the full Kaafiye Plus tariff and the exact voice, data
        // and SMS allowance of each tier with the commercial team.
        {
          title: "Mini",
          price: 0.25,
          unit: "Day",
          features: f("Voice + Data + SMS", "12 hours validity", "Best for a short burst", "24/7 support"),
        },
        {
          title: "Daily",
          price: 0.5,
          unit: "Day",
          features: f("Voice + Data + SMS", "24 hours validity", "Renews only if you ask", "24/7 support"),
        },
        {
          title: "3-Day",
          price: 1.5,
          unit: "3 Days",
          features: f("Voice + Data + SMS", "72 hours validity", "Cheaper per day than Daily", "24/7 support"),
        },
        {
          title: "Weekly",
          price: 3,
          unit: "Weekly",
          features: f("Voice + Data + SMS", "7 days validity", "The tier most people pick", "24/7 support"),
          highlight: true,
        },
        {
          title: "Fortnight",
          price: 5.5,
          unit: "14 Days",
          features: f("Voice + Data + SMS", "14 days validity", "Half a month, half the outlay", "24/7 support"),
        },
        {
          title: "Monthly",
          price: 10,
          unit: "Monthly",
          features: f("Voice + Data + SMS", "30 days validity", "Lowest cost per day", "24/7 support"),
        },
        {
          title: "Monthly Max",
          price: 18,
          unit: "Monthly",
          features: f("Double the Monthly allowance", "30 days validity", "For heavy users", "Priority support"),
        },
      ],
      faqs: [
        {
          question: "Do KAAFIYE Plus bundles really never expire?",
          answer:
            "Yes! Unlike other providers, KAAFIYE Plus bundles have no expiration date, allowing you to use your data and voice balance at your own pace without worrying about losing unused resources.",
        },
        {
          question: "What types of bundles are available with KAAFIYE Plus?",
          answer:
            "KAAFIYE Plus offers a variety of mobile data and voice bundles designed to meet different needs, from light users to heavy data consumers. These packages provide high-speed internet and reliable voice services at competitive prices.",
        },
        {
          question: "How can I subscribe to a KAAFIYE Plus bundle?",
          answer:
            "You can subscribe to a KAAFIYE Plus bundle through the provider's official app, website, or by dialing a specific USSD code. For more details, visit your nearest customer service center or check the official KAAFIYE Plus platform.",
        },
        {
          question: "What happens when my Kaafiye Plus bundle runs out?",
          answer:
            "Usage falls back to your standard airtime rate. You can resubscribe at any time from the short code, the Somtel app or eDahab, and the new bundle starts immediately.",
        },
        {
          question: "Can I have Kaafiye Plus and a data bundle at the same time?",
          answer:
            "Yes. An extra data bundle sits alongside your Kaafiye Plus allowance and is used once the bundled data is finished.",
        },
      ],
    },
    {
      slug: "Mifi",
      name: "Mifi",
      category: "personal",
      tagline: "Reliable, portable mobile internet",
      heroTitle: "Reliable Mobile Internet & Portable",
      heroText: "Take your connection with you. Somtel Mifi keeps your devices online wherever you go.",
      heroImage: "/assets/images/Mifi-modem1.png",
      body:
        "## Internet that travels with you\n\nSomtel Mifi is a pocket-sized 4G router that turns a Somtel data bundle into a private WiFi network. Switch it on and up to ten devices connect at once - laptops, tablets, phones and smart TVs - anywhere our network reaches.\n\n## What you get\n\n- **A portable 4G router** included with every Mifi package\n- **Up to 10 connected devices** sharing one bundle\n- **All-day battery** so you stay online away from a power source\n- **No installation** - no cables, no technician visit, no waiting\n\n## Who it is for\n\nMifi suits students who move between home and campus, field teams working away from an office, families in areas fibre has not reached yet, and anyone who wants a backup connection when their main line goes down.\n\n## Choosing a bundle\n\nIf you mostly browse, chat and check email, a smaller monthly bundle is plenty. If several people stream video or join video calls, choose one of the larger bundles. You can change bundle at any time, and unused data follows the validity shown on your package.\n\n## Topping up\n\nRecharge from your handset through eDahab, in the DahabPlus app, or at any Somtel customer care centre.",
      order: 7,
      plans: [
        {
          title: "Mifi Starter",
          // TODO: confirm the real bundle size and price.
          price: 10,
          unit: "month",
          features: f(
            "Portable 4G router included",
            "Ideal for browsing, chat and email",
            "Connect up to 10 devices",
            "Top up anytime via eDahab"
          ),
        },
        {
          title: "Mifi Family",
          // TODO: confirm the real bundle size and price.
          price: 25,
          unit: "month",
          features: f(
            "Portable 4G router included",
            "Comfortable for streaming and video calls",
            "Connect up to 10 devices",
            "Best value for shared households"
          ),
          highlight: true,
        },
        {
          title: "Mifi Pro",
          // TODO: confirm the real bundle size and price.
          price: 45,
          unit: "month",
          features: f(
            "Portable 4G router included",
            "Heavy daily use and remote work",
            "Priority data throughout the month",
            "Suited to small teams on the move"
          ),
        },
      ],
      faqs: [
        {
          question: "How can I choose the right Mifi Plus plan for my needs?",
          answer:
            "Your choice depends on how much data you use and how many devices will be connected. If you only browse and chat, a smaller plan works well.",
        },
        {
          question: "Can I recharge or top up my Mifi Plus data easily?",
          answer:
            "Absolutely. You can top up your Mifi Plus bundle anytime through the Edahab Money, Dahab Plus app, or at any customer care center.",
        },
        {
          question: "Do I get a router when I subscribe to Mifi Plus?",
          answer:
            "Yes, every Mifi Plus package comes with a portable 4G router that allows you to share your connection across multiple devices.",
        },
      ],
    },
    {
      slug: "Esim",
      name: "eSIM",
      category: "personal",
      tagline: "A SIM without the plastic",
      heroTitle: "Somtel eSIM",
      heroText: "Activate a Somtel line digitally, with no physical SIM card required.",
      heroImage: "/assets/images/eSIM1.png",
            // TODO: list the exact supported device models once the compatibility list is confirmed.
      body:
        "## A SIM with no plastic\n\nAn eSIM is a SIM card built into your device. Instead of collecting a card and sliding it into a tray, you scan a QR code and your Somtel line activates in under a minute - no outlet visit, no waiting for delivery.\n\n## Why go eSIM\n\n- **Instant activation** - scan, confirm, connect\n- **Two numbers, one phone** - keep a personal and a work line on the same device\n- **Nothing to lose** - an eSIM cannot fall out, snap, or wear down\n- **Safer if stolen** - a lost device's eSIM can be disabled remotely, which a plastic SIM cannot\n- **Better for travel** - add a Somtel line without removing your existing one\n\n## How to activate\n\n1. Check that your device supports eSIM - most phones released in recent years do.\n2. Request a Somtel eSIM from any outlet or through customer care.\n3. Open your phone's mobile network settings and scan the QR code we provide.\n4. Name the line, choose it as your data SIM if you wish, and you are connected.\n\n## Moving an existing number\n\nAlready have a Somtel number on a physical SIM? Bring it and your identification to an outlet and we will transfer it to an eSIM profile while you wait. Your number, balance and bundles all carry across.",
      order: 8,
      faqs: [
        {
          question: "How do I activate eSIM on my device?",
          answer:
            "You can activate eSIM by scanning a QR code provided by your mobile operator or by entering the activation details manually in your device's mobile network settings.",
        },
        {
          question: "Can I have multiple eSIMs on one device?",
          answer:
            "Yes, many devices support multiple eSIM profiles, allowing you to switch between different plans or operators without swapping physical SIMs.",
        },
        {
          question: "What if I lose my phone with an active eSIM?",
          answer:
            "If your device is lost or stolen, contact your operator immediately to deactivate the eSIM. Unlike a physical SIM, eSIM cannot be removed, but it can be remotely disabled for security.",
        },
      ],
    },
    {
      slug: "Roaming",
      name: "Roaming",
      category: "personal",
      tagline: "Stay reachable abroad",
      heroTitle: "Why Choose Our Roaming",
      heroText: "Keep your Somtel number working when you travel outside Somalia.",
      heroImage: "/assets/images/slider/dageq.jpg",
            // TODO: replace this section with the confirmed partner-country list and per-country rates.
      body:
        "## Your Somtel number, wherever you land\n\nRoaming keeps your line working when you leave Somalia. Calls, SMS and mobile data carry on over our partner networks abroad, so colleagues and family reach you on the number they already have.\n\n## What works abroad\n\n- **Incoming and outgoing calls** on your usual Somtel number\n- **SMS** sent and received as normal\n- **Mobile data** on partner networks, charged from your Somtel balance\n- **eDahab access** so you can still send money and top up while travelling\n\n## Before you travel\n\nRoaming is not switched on by default. Contact customer care or visit an outlet a day or two before departure and we will enable it on your line. Keep a healthy balance topped up - roaming charges are deducted as you use the service.\n\n## Keeping costs down\n\n- Turn data roaming off in your phone settings and switch it on only when you need it\n- Use WiFi for large downloads, video calls and app updates\n- Ask customer care for the rate in your destination country before you go\n\n## Where we roam\n\nSomtel has roaming agreements across East Africa, the Gulf and a number of European destinations.",
      order: 9,
      faqs: [
        {
          question: "How do I activate roaming before I travel?",
          answer: "Contact Somtel customer care or visit an outlet before departure to have roaming enabled on your line.",
        },
        {
          question: "How am I charged while roaming?",
          answer: "Roaming is charged from your Somtel balance according to the partner network's rates for that country.",
        },
        {
          question: "Will I keep my Somtel number abroad?",
          answer: "Yes. Your number stays the same, so contacts can reach you exactly as they do at home.",
        },
      ],
    },
    {
      slug: "eDahab",
      name: "eDahab",
      category: "personal",
      tagline: "Mobile money for everyone",
      heroTitle: "eDahab Mobile Money",
      heroText:
        "eDahab provides the most comprehensive and accessible package of mobile banking features in the Somali region.",
      heroImage: "/assets/images/slider/edhb1.jpg",
      body:
        "## Banking that fits in your pocket\n\neDahab turns any handset into a bank account. Send money to family, receive your salary, pay a shop, settle a bill or top up airtime - all from a simple menu, with no branch visit and no paperwork.\n\n## What you can do\n\n- **Send and receive money** instantly, across the Somali region\n- **Pay merchants** at thousands of shops and restaurants\n- **Buy airtime and bundles** for yourself or someone else\n- **Settle bills** for utilities and Somtel services\n- **Save with Keydso** by moving money into a savings balance\n- **Withdraw cash** at any eDahab agent\n\n## Why customers trust it\n\n- **24/7 customer support** - help whenever you need it, day or night\n- **Secure transactions** - every transfer is encrypted and PIN-protected\n- **Instant confirmations** - an SMS receipt for every movement of money\n- **Widest agent network** - agents in every major town we serve\n\n## Getting started\n\nVisit any Somtel or eDahab agent with valid identification. Registration takes a few minutes and your account is active before you leave. Then dial *232# from your handset, or download the DahabPlus app for the full experience.\n\n## Staying safe\n\nNever share your PIN - Somtel staff will never ask for it. Always check the recipient's number on the confirmation screen before approving a transfer. If something looks wrong, call customer care straight away.",
      order: 10,
      faqs: [
        {
          question: "How do I register for eDahab?",
          answer: "Visit any Somtel or eDahab agent with valid identification, and your account is activated on the spot.",
        },
        {
          question: "Is there a charge for sending money?",
          answer: "Transfer fees depend on the amount sent. The applicable fee is shown before you confirm any transaction.",
        },
        {
          question: "What should I do if I send money to the wrong number?",
          answer: "Contact eDahab customer support immediately so the transaction can be reviewed.",
        },
        {
          question: "Can I use eDahab to pay for Somtel services?",
          answer: "Yes. eDahab can be used to top up airtime and to pay for any Somtel bundle or subscription.",
        },
      ],
    },
    {
      slug: "Keydso",
      name: "Keydso",
      category: "personal",
      tagline: "Save with confidence",
      heroTitle: "Keydso Service",
      heroText: "A savings service from Somtel that helps you set money aside securely.",
      heroImage: "/assets/images/slider/keydso.jpg",
      body:
        "## Saving made simple\n\nKeydso is a savings service built into eDahab. Move money out of your spending balance into a separate savings balance, and it stays there until you choose to take it out - no branch, no forms, no minimum deposit.\n\n## How it works\n\n1. Dial *232# from the handset registered to your eDahab account.\n2. Choose Keydso from the menu.\n3. Enter the amount you want to set aside and confirm with your PIN.\n4. Check your savings balance from the same menu at any time.\n\n## Why it helps\n\n- **Out of sight, out of spend** - money in Keydso is separate from your everyday balance\n- **Save any amount** - put aside whatever you can, whenever you can\n- **Always available** - withdraw back to your eDahab balance instantly when you need it\n- **No service fee** - the basic Keydso service is free, with no subscription and no hidden charges\n\n## Good habits\n\nMany customers move a small amount into Keydso each time they are paid, before spending on anything else. Others save toward something specific - school fees, a device, or a business purchase - and find it easier when the money is not sitting in the balance they spend from.\n\n## Security\n\nKeydso uses the same encryption and PIN protection as the rest of eDahab. Your savings balance can only be moved from the handset registered to your account.",
      order: 11,
      faqs: [
        {
          question: "What is Adeegga Keydso?",
          answer:
            "Adeegga Keydso is a service that allows you to securely and conveniently save money using your Edahab Money With your phone.",
        },
        {
          question: "Are there any service fees?",
          answer:
            "The basic Adeegga Keydso service is completely free for all users. There are no hidden charges or subscription fees. You can deposit, save, and check your balance without paying anything.",
        },
        {
          question: "Can I deposit money anytime?",
          answer:
            "Absolutely. You can deposit money into your Edahab Money account *232# using your mobile phone.",
        },
        {
          question: "Is Adeegga Keydso safe to use?",
          answer:
            "Yes, Adeegga Keydso uses secure encryption and authentication methods to ensure your money and personal information are protected.",
        },
      ],
    },
    {
      slug: "fiberoptic",
      name: "Fiber Optic",
      category: "business",
      tagline: "Enterprise-grade connectivity",
      heroTitle: "SOMTEL Fiber Service",
      heroText:
        "Fiber, wireless and IPTV services built for homes and businesses that depend on a reliable connection.",
      heroImage: "/assets/images/slider/int.jpg",
            // TODO: confirm the published SLA targets, installation lead times and enterprise bandwidth tiers with the commercial team.
      body:
        "## Connectivity businesses can build on\n\nSomtel Fiber Optic is our enterprise-grade service: dedicated, symmetric bandwidth delivered over our own fibre, backed by a written service-level agreement and a field team that answers to it. It is the same network that carries banks, hospitals, ministries, hotels and university campuses across the Somali region.\n\n## What makes it a business circuit\n\n- **Dedicated bandwidth**, not a contended consumer connection - the capacity you buy is the capacity you get, at nine in the morning and at nine at night\n- **Symmetric speeds**, so uploads are as fast as downloads, which matters for backups, video calls and hosted systems\n- **Static IP addresses** for VPNs, mail servers, CCTV and anything else that needs to be reachable\n- **A service-level agreement** covering availability and response time, with priority fault handling\n- **A named account manager** who knows your sites, rather than a general queue\n\n## Our services\n\n- **Fiber Services (FTTX / FTTA)** - fibre run directly to your building or to a nearby aggregation point\n- **Wireless Services (P2P and W-ADSL)** - licensed point-to-point links for sites fibre has not reached yet, and wireless broadband where a quick install matters more than maximum capacity\n- **IPTV Service** - live television and on-demand content over the same connection, popular with hotels and hospitality\n- **Enterprise solutions** - multi-site networks, backup links, short codes, bulk SMS and IVR, joined up under one account\n\n## Multi-site and redundancy\n\nBranch networks can be linked into a single private network so traffic between sites never leaves our backbone. For operations that cannot afford downtime, we pair a primary fibre circuit with a wireless or 4G backup that takes over automatically.\n\n## Getting connected\n\n1. **Tell us your sites.** We need the address of each location and a rough idea of how many people and systems will use the connection.\n2. **We survey.** An engineer confirms what can be delivered at each address and how the fibre will be routed.\n3. **You get a written proposal.** Bandwidth, installation, monthly cost and the service-level terms, in plain language.\n4. **We install and hand over.** Most surveyed sites are live within a few working days, and we do not close the job until you have tested it.\n\n## Support after install\n\nEnterprise faults go straight to a priority queue, day or night. You get a reference number, an engineer assigned, and an update until it is closed - not a promise to call back.",
      order: 12,
      plans: [
        {
          title: "Fiber Home",
          price: 20,
          unit: "month",
          features: f("Free Equipment", "20Mbps", "24/7 support"),
          highlight: true,
        },
        {
          title: "Fiber Home Plus",
          price: 25,
          unit: "month",
          features: f("Free Equipment", "20Mbps", "One User IPTV App", "24/7 support"),
        },
        {
          title: "Fiber Business",
          price: 50,
          unit: "month",
          features: f("Free Equipment", "32Mbps", "Free IPTV", "One User IPTV App"),
        },
      ],
      faqs: [
        {
          question: "How long does fiber installation take?",
          answer:
            "Once your location is surveyed and approved, installation is usually completed within a few working days.",
        },
        {
          question: "Is the equipment included in the monthly price?",
          answer: "Yes, all Somtel fiber packages include the required equipment at no extra cost.",
        },
        {
          question: "Can I upgrade my package later?",
          answer: "Yes. Contact Somtel support and your package can be upgraded without changing your installation.",
        },
        {
          question: "What is the difference between Fiber Optic and Fiber Home?",
          answer:
            "Fiber Home is a residential service on a shared, asymmetric connection. Fiber Optic is a business circuit with dedicated symmetric bandwidth, static IP addresses, a service-level agreement and priority fault response.",
        },
        {
          question: "Do you offer a backup connection?",
          answer:
            "Yes. A primary fibre circuit can be paired with a wireless or 4G backup that takes over automatically if the main link fails, which is standard for banks, clinics and operations that cannot stop.",
        },
        {
          question: "Can you connect several branches together?",
          answer:
            "Yes. Branch sites can be linked into a single private network so traffic between them stays on the Somtel backbone and never touches the public internet.",
        },
      ],
    },
    {
      slug: "SMS",
      name: "Mysms",
      category: "business",
      tagline: "Reach your customers directly",
      heroTitle: "Somtel SMS Service",
      heroText: "Bulk messaging that reaches your customers reliably across every Somali network.",
      heroImage: "/assets/images/api.png",
      body:
        "## Reach every customer, on every network\n\nMysms is Somtel's bulk messaging platform. Upload a contact list, write your message, and it goes out to thousands of handsets across all Somali networks in seconds - with a delivery report for every single one.\n\n## What businesses use it for\n\n- **Marketing campaigns** - promotions, new products, seasonal offers\n- **Transactional alerts** - payment confirmations, order updates, appointment reminders\n- **One-time passwords** - secure logins and transaction verification\n- **Internal notices** - shift changes, emergency alerts, staff announcements\n\n## Platform features\n\n- **Registered sender ID** so messages arrive under your business name, not a number\n- **Contact groups** for segmenting customers by branch, city or category\n- **Scheduling** to send a campaign at a chosen date and time\n- **Delivery reports** showing exactly which messages landed\n- **Message templates** for the notices you send repeatedly\n\n## Why SMS still wins\n\nSMS needs no app, no internet connection and no smartphone. It reaches every customer on every handset in the country, and it is read within minutes far more often than email. For a market where data is not universal, it remains the most dependable way to reach people.\n\n## Getting set up\n\nContact our enterprise team to open an account. We will register your sender ID, walk your staff through the platform, and load your first batch of credit. Top up later through your account manager or via eDahab.",
      order: 13,
      faqs: [
        { question: "What is the Somtel SMS service?", answer: "It is a bulk messaging platform that lets businesses send SMS to their customers at scale." },
        { question: "Can I use my own sender name?", answer: "Yes, a registered sender ID can be configured for your account." },
        { question: "Which networks can I reach?", answer: "Messages are delivered across all Somali networks." },
        { question: "How do I top up my SMS balance?", answer: "SMS credit can be purchased through your account manager or via eDahab." },
        { question: "Can I schedule messages in advance?", answer: "Yes, campaigns can be scheduled to send at a chosen date and time." },
        { question: "Do I get delivery reports?", answer: "Yes, the platform provides delivery status for every message sent." },
      ],
    },
    {
      slug: "SMSAPI",
      name: "SMS API",
      category: "business",
      tagline: "Messaging built into your application",
      heroTitle: "The Modern SMS API",
      heroText: "Integrate Somtel SMS directly into your own systems with a simple HTTP API.",
      heroImage: "/assets/images/api.png",
            // TODO: publish the live API base URL and full endpoint reference once the developer portal is ready.
      body:
        "## Messaging your systems can call\n\nThe Somtel SMS API lets your own software send messages directly. Where Mysms is a dashboard your staff log into, the API is an endpoint your application calls - so a confirmation SMS can fire the moment an order is placed, with nobody touching a screen.\n\n## Typical integrations\n\n- **One-time passwords** sent at login or checkout\n- **Payment and order confirmations** triggered by your backend\n- **Delivery notifications** as a shipment changes status\n- **Appointment reminders** generated from your booking system\n- **System alerts** routed to an on-call engineer\n\n## How it works\n\nAuthenticate with the API key issued to your account, then send a standard HTTPS request carrying the destination number, your sender ID and the message text. The response confirms acceptance, and a delivery receipt follows when the handset receives it. High-volume senders can connect over SMPP instead.\n\n## What we provide\n\n- **REST endpoints** documented with request and response examples\n- **Sample code** for common server languages\n- **A test account** so you can integrate before going live\n- **Delivery receipts** posted back to a callback URL you control\n- **Engineering support** during integration\n\n## Requirements\n\nYou will need a registered Somtel enterprise account, a sender ID, and a server able to make outbound HTTPS requests. Our team issues credentials once your account is approved.",
      order: 14,
      faqs: [
        {
          question: "What is SMS API and how does it differentiate from My SMS?",
          answer:
            "SMS API is a type of API that allows your business to integrate SMS messaging into your existing software platforms. SMS APIs enable you to send or receive messages quickly and easily through your business' website or application.",
        },
        {
          question: "How do I integrate SMS API into my app?",
          answer:
            "Integration is done through RESTful endpoints or SMPP with documentation and sample codes provided for quick setup.",
        },
        {
          question: "Are all apps compatible?",
          answer:
            "Most modern applications can integrate via API. Contact us for specific platform questions.",
        },
        {
          question: "What are the terms and conditions?",
          answer:
            "Our terms cover acceptable use policies, payment terms, and privacy regulations. Please contact support or read our full agreement on the website.",
        },
      ],
    },
    {
      slug: "IVR",
      name: "IVR",
      category: "business",
      tagline: "Automate your call handling",
      heroTitle: "Somtel Call Center Platform",
      heroText: "Interactive voice response that routes your callers to the right place, automatically.",
      heroImage: "/assets/images/empowering.jpg",
            // TODO: confirm the monthly short-code rental and per-agent pricing with the enterprise team.
      body:
        "## A call centre without the call centre\n\nSomtel's IVR platform answers your business calls on a dedicated short code, greets the caller in their language, and routes them to the right team through a simple menu - so nobody waits on hold for the wrong department.\n\n## What it does\n\n- **Answers every call** on a short code that is easy for customers to remember\n- **Guides callers through a menu** - press 1 for sales, 2 for support, and so on\n- **Routes to the right agent** based on the choice the caller makes\n- **Handles overflow** by queueing callers instead of dropping them\n- **Works around the clock** with recorded information outside office hours\n\n## Managing your agents\n\nEach member of staff gets an agent account they sign into from a handset or a desk phone. Supervisors can see who is available, how many callers are waiting, and how long each call took. Add or remove agents as your team changes.\n\n## Reporting\n\nThe platform records call volumes, answer rates, average handling time and which menu options callers choose most. That last figure is often the most useful - it shows you where your customers actually need help.\n\n## Who it suits\n\nBanks, insurers, hospitals, utilities, logistics firms, government offices and any business fielding more calls than a single line can carry.\n\n## Getting started\n\nContact the Somtel enterprise team. We assign your short code, build your menu structure with you, create accounts for your agents, and train your supervisors. Short codes are rented monthly, priced by the number of agent seats you need.",
      order: 15,
      faqs: [
        {
          question: "What is Somtel (IVR)?",
          answer:
            "Somtel Call Center (IVR) is a customer support platform that enables businesses to manage inbound calls through a dedicated short code. It allows companies to provide professional, 24/7 customer service with multiple agents.",
        },
        {
          question: "How can my business apply for the Call Center service?",
          answer:
            "Businesses can apply by contacting Somtel's enterprise support team. After approval, a short code will be assigned, and agent accounts will be created for your staff.",
        },
        {
          question: "What do I need to be eligible for the service?",
          answer:
            "To be eligible, your business must rent a short code on a monthly basis. You will also need to specify the number of agent users you require.",
        },
      ],
    },
    {
      slug: "home-internet",
      name: "Home Internet",
      category: "personal",
      tagline: "Unlimited fibre for the whole house",
      heroTitle: "Somtel Fiber Home",
      heroText:
        "Fibre straight to your door, with enough speed for everyone in the house to stream, study and work at the same time.",
      heroImage: "/assets/images/slider/int.jpg",
            // TODO: confirm final residential speeds and monthly prices with the commercial team.
      body:
        "## Fibre built for family life\n\nSomtel Fiber Home brings a dedicated fibre line into your house, not a shared connection borrowed from a mobile mast. That means the same speed at eight in the evening as at eight in the morning, however many people are online.\n\n## What is included\n\n- **Fibre installation** by a Somtel technician, arranged around your schedule\n- **A WiFi router** covering a typical home, with extenders available for larger houses\n- **Unlimited data** with no daily cap and no fair-use throttling on the higher plans\n- **Free relocation** if you move to another covered address\n- **24/7 support** with a fault line that answers day and night\n\n## Choosing your speed\n\n- **Essential** suits a couple of people browsing, messaging and streaming in standard definition.\n- **Family** is the plan most households pick - several phones, a laptop or two, and HD streaming without buffering.\n- **Max** is for large homes, home offices and anyone who works with big files or joins video calls all day.\n\nAll three plans use the same fibre line, so you can move up or down a tier with a phone call rather than a new installation.\n\n## Getting connected\n\nCheck our coverage page to confirm fibre has reached your street, then request an installation online or at any Somtel outlet. Most connections are live within a few working days of survey.\n\n## Business premises\n\nIf you need a guaranteed symmetric line, a static IP or a service-level agreement, our Fiber Optic business service is the right product instead.",
      order: 16,
      plans: [
        {
          title: "Fiber Home Essential",
          price: 30,
          unit: "month",
          features: f(
            "Comfortable for browsing and standard streaming",
            "Unlimited monthly data",
            "WiFi router included",
            "Free standard installation"
          ),
        },
        {
          title: "Fiber Home Family",
          price: 55,
          unit: "month",
          features: f(
            "Built for several people online at once",
            "Unlimited monthly data",
            "HD streaming and video calls",
            "WiFi router included"
          ),
          highlight: true,
        },
        {
          title: "Fiber Home Max",
          price: 90,
          unit: "month",
          features: f(
            "Best for large homes and home offices",
            "Unlimited monthly data",
            "Priority fault response",
            "WiFi router and one extender included"
          ),
        },
      ],
      faqs: [
        {
          question: "How do I know if fibre is available at my address?",
          answer:
            "Check the coverage page for your city, or call customer care with your address and we will confirm whether your street is on the fibre footprint and when it is due if not.",
        },
        {
          question: "How long does installation take?",
          answer:
            "Once your address is surveyed, most homes are connected within a few working days. The technician runs the fibre, mounts the terminal and sets up your WiFi in a single visit.",
        },
        {
          question: "Is there a data cap?",
          answer:
            "No. All Fiber Home plans include unlimited monthly data. The difference between plans is the speed of the line, not the amount you can use.",
        },
        {
          question: "Can I change plan later?",
          answer:
            "Yes. You can move to a faster or slower plan at any time with a call to customer care. No new installation or equipment is required.",
        },
        {
          question: "What happens if my connection goes down?",
          answer:
            "Call the 24/7 fault line. Most issues are resolved remotely, and if a technician is needed we will book a visit at the earliest slot available.",
        },
      ],
    },
    {
      slug: "bundles",
      name: "Bundles",
      category: "personal",
      tagline: "Data, minutes and SMS in one package",
      heroTitle: "Somtel Bundles",
      heroText:
        "Pick a bundle that matches how you actually use your phone, and stop paying standard rates for everything.",
      heroImage: "/assets/images/slider/airtime.jpg",
            // TODO: replace the plan prices below with the current published bundle tariff.
      body:
        "## Pay for what you use, not for everything\n\nA bundle packages data, minutes and SMS together at a lower rate than paying as you go. Activate one from your handset in a few seconds, and it runs until you use it up or its validity ends.\n\n## The bundle families\n\n- **Daily bundles** for a busy day - cheap, small, and gone by midnight\n- **Weekly bundles** for people who top up little and often\n- **Monthly bundles** for the best value per gigabyte, with a full month of validity\n- **Night bundles** for large downloads and updates during off-peak hours\n- **Social bundles** for messaging and social apps only, at the lowest price\n\n## How to activate\n\nDial the Somtel self-service menu from your handset, pick a bundle, and confirm. The bundle activates immediately and an SMS confirms your balance and expiry date. You can also buy bundles through eDahab or the DahabPlus app, and send one to another Somtel number as a gift.\n\n## Checking your balance\n\nThe self-service menu shows your remaining data, minutes and SMS along with the expiry date for each. We also send an alert when a bundle is nearly used up so nothing runs out unexpectedly.\n\n## Tips for getting more from a bundle\n\n- Buy monthly rather than weekly if your usage is steady - the price per gigabyte drops sharply\n- Use a night bundle for app updates and large downloads\n- Turn on WiFi at home so your mobile bundle is there when you are out\n- Stack a social bundle underneath a data bundle if messaging is most of what you do",
      order: 17,
      plans: [
        {
          title: "Daily Bundle",
          price: 1,
          unit: "day",
          features: f(
            "Data, minutes and SMS for 24 hours",
            "Activate instantly from your handset",
            "Ideal for occasional heavy days",
            "Renew as often as you like"
          ),
        },
        {
          title: "Weekly Bundle",
          price: 5,
          unit: "week",
          features: f(
            "Seven days of data, minutes and SMS",
            "Better value than daily top-ups",
            "Balance alerts before expiry",
            "Gift it to another Somtel number"
          ),
        },
        {
          title: "Monthly Bundle",
          price: 15,
          unit: "month",
          features: f(
            "Best value per gigabyte",
            "Full month of validity",
            "Generous national minutes and SMS",
            "Auto-renew available"
          ),
          highlight: true,
        },
      ],
      faqs: [
        {
          question: "How do I activate a bundle?",
          answer:
            "Dial the Somtel self-service menu from your handset, choose the bundle you want and confirm. It activates immediately and you receive an SMS with your balance and expiry date.",
        },
        {
          question: "What happens to data I have not used when a bundle expires?",
          answer:
            "Unused allowance ends with the bundle validity. If you regularly finish the month with data left over, a smaller bundle will save you money.",
        },
        {
          question: "Can I have more than one bundle at a time?",
          answer:
            "Yes. Bundles stack, and the network uses the one that matches your activity first - a social bundle for messaging apps, for example, before a general data bundle.",
        },
        {
          question: "Can I buy a bundle for someone else?",
          answer:
            "Yes. From the self-service menu or eDahab you can send a bundle to any other Somtel number as a gift.",
        },
      ],
    },
    {
      slug: "devices",
      name: "Devices",
      category: "personal",
      tagline: "Phones, routers and accessories",
      heroTitle: "The Somtel Store",
      heroText:
        "Smartphones, Mifi routers, home WiFi equipment and accessories, available at every Somtel outlet.",
      heroImage: "/assets/images/eSIM1.png",
            // TODO: add the live device catalogue, current stock and pricing once the retail team supplies it.
      body:
        "## Everything you need to get online\n\nSomtel outlets stock the hardware that goes with the network - handsets ready for a Somtel SIM, portable Mifi routers, home WiFi equipment, and the accessories that keep them running.\n\n## What we stock\n\n- **Smartphones** across entry, mid and flagship ranges, all network-ready\n- **Feature phones** for long battery life and simple, durable use\n- **Mifi routers** for portable internet shared between up to ten devices\n- **Home WiFi routers and extenders** for Fiber Home customers\n- **Accessories** including chargers, power banks, cables, cases and memory cards\n\n## Buying at an outlet\n\nEvery device sold at a Somtel outlet is set up before you leave. Our staff insert and register your SIM, configure mobile data, transfer your contacts if you are moving from an older handset, and show you how to check your balance and activate bundles.\n\n## Bundled with a plan\n\nMany devices can be taken together with a plan - a Mifi router with a monthly data bundle, or a home router with a Fiber Home installation. Ask at the counter which combinations are running, as offers change through the year.\n\n## Warranty and support\n\nDevices carry the manufacturer warranty. Bring the device and your receipt to any outlet and our team will handle the claim on your behalf. Software setup help is free for the life of the device.\n\n## Find a store\n\nSomtel outlets operate in every city on our network. See the coverage page for the regions we serve, or contact customer care for the branch nearest you.",
      order: 18,
      faqs: [
        {
          question: "Do devices come ready to use?",
          answer:
            "Yes. Our staff register your SIM, configure mobile data, and transfer contacts from an older handset before you leave the outlet.",
        },
        {
          question: "Can I pay with eDahab?",
          answer:
            "Yes. Every Somtel outlet accepts eDahab, along with cash and card payments.",
        },
        {
          question: "Is there a warranty on devices?",
          answer:
            "All devices carry the manufacturer warranty. Bring the device and your receipt to any outlet and our team will process the claim for you.",
        },
        {
          question: "Do you sell routers for Fiber Home?",
          answer:
            "Yes. A WiFi router is included with every Fiber Home installation, and extenders are available separately for larger houses.",
        },
      ],
    },
    {
      slug: "business",
      name: "Business",
      category: "business",
      tagline: "Connectivity built for organisations",
      heroTitle: "Somtel for Business",
      heroText:
        "Dedicated bandwidth, bulk messaging, call centre tools and managed accounts for organisations of every size.",
      heroImage: "/assets/images/empowering.jpg",
            // TODO: add sector case studies and published SLA figures once approved by the enterprise team.
      body:
        "## One provider for the whole organisation\n\nSomtel Business brings connectivity, communication and payments under a single account with a single point of contact. Whether you run a five-person office or a national operation, the same team looks after your services end to end.\n\n## Connectivity\n\n- **Fiber Optic** - dedicated symmetric bandwidth with a service-level agreement, static IP addresses and priority fault response\n- **Point-to-point links** connecting your branches over our own backbone\n- **W-ADSL** where fibre has not yet reached, so no site is left offline\n- **Backup connectivity** on mobile broadband, so an outage never stops trading\n\n## Communication\n\n- **Mysms** for bulk campaigns, alerts and one-time passwords\n- **SMS API** so your own systems send messages automatically\n- **IVR and call centre** with a short code, menu routing and agent reporting\n- **Corporate postpaid** grouping every staff line onto one monthly invoice\n\n## Payments\n\n- **eDahab for business** to collect payments from customers and pay salaries directly to staff handsets\n- **Merchant accounts** with settlement reporting\n\n## How we work with you\n\nEvery business account gets a named account manager who knows your setup. We start with a survey of your sites and current spend, design a package around what you actually need, install and configure everything, and then review the account with you regularly as your organisation grows.\n\n## Support that matches the stakes\n\nBusiness customers reach a dedicated support line staffed around the clock. Faults on business circuits are prioritised ahead of residential traffic, and service-level agreements are written into your contract rather than promised informally.\n\n## Talk to us\n\nTell us how many sites you run, how many staff need lines, and what your current setup costs. We will come back with a proposal and a clear monthly figure.",
      order: 19,
      faqs: [
        {
          question: "What size of business do you work with?",
          answer:
            "All of them. The same team supports a single-office business taking one fibre line and a national organisation running dozens of sites, bulk messaging and a call centre.",
        },
        {
          question: "Do business services come with a service-level agreement?",
          answer:
            "Yes. Fiber Optic and enterprise circuits carry a written SLA covering uptime and fault response times, agreed as part of your contract.",
        },
        {
          question: "Can we put all our staff lines on one bill?",
          answer:
            "Yes. Corporate postpaid groups any number of lines onto a single monthly invoice, with per-line spending controls and an itemised statement.",
        },
        {
          question: "How do we get a proposal?",
          answer:
            "Contact us with the number of sites and staff you need to connect. An account manager will survey your requirements and return a written proposal with a clear monthly cost.",
        },
      ],
    },
  ];

  for (const p of products) {
    const { plans, faqs, ...productData } = p;

    const product = await db.product.create({
      data: {
        ...productData,
      },
    });

    if (plans) {
      for (let i = 0; i < plans.length; i++) {
        await db.plan.create({ data: { ...plans[i], productId: product.id, order: i + 1 } });
      }
    }
    if (faqs) {
      for (let i = 0; i < faqs.length; i++) {
        await db.faq.create({ data: { ...faqs[i], productId: product.id, order: i + 1 } });
      }
    }
  }

  // ---------- Network coverage ----------
  // TODO: replace this list with the confirmed coverage footprint from the network team.
  console.log("Seeding coverage areas...");
  const coverage: { region: string; city: string; services: string; note?: string }[] = [
    { region: "Banaadir", city: "Mogadishu", services: f("4G", "Fiber Home", "Fiber Optic", "eDahab"), note: "Full coverage across all districts" },
    { region: "Banaadir", city: "Afgooye Corridor", services: f("4G", "Fiber Home", "eDahab") },
    { region: "Woqooyi Galbeed", city: "Hargeisa", services: f("4G", "Fiber Home", "Fiber Optic", "eDahab"), note: "Full coverage across all districts" },
    { region: "Woqooyi Galbeed", city: "Berbera", services: f("4G", "Fiber Home", "Fiber Optic", "eDahab"), note: "Port and city centre on fibre" },
    { region: "Togdheer", city: "Burco", services: f("4G", "Fiber Home", "eDahab") },
    { region: "Sanaag", city: "Ceerigaabo", services: f("4G", "eDahab") },
    { region: "Sool", city: "Laascaanood", services: f("4G", "eDahab") },
    { region: "Awdal", city: "Boorama", services: f("4G", "Fiber Home", "eDahab") },
    { region: "Bari", city: "Bosaso", services: f("4G", "Fiber Home", "Fiber Optic", "eDahab") },
    { region: "Nugaal", city: "Garowe", services: f("4G", "Fiber Home", "eDahab") },
    { region: "Mudug", city: "Galkacyo", services: f("4G", "Fiber Home", "eDahab") },
    { region: "Lower Shabelle", city: "Marka", services: f("4G", "eDahab") },
    { region: "Bay", city: "Baidoa", services: f("4G", "Fiber Home", "eDahab") },
    { region: "Gedo", city: "Garbahaarey", services: f("4G", "eDahab") },
    { region: "Lower Juba", city: "Kismayo", services: f("4G", "Fiber Home", "eDahab") },
    { region: "Hiiraan", city: "Beledweyne", services: f("4G", "eDahab") },
  ];

  for (let i = 0; i < coverage.length; i++) {
    await db.coverageArea.create({ data: { ...coverage[i], order: i + 1 } });
  }

  // ---------- Help centre FAQs (site-wide, grouped by topic) ----------
  console.log("Seeding help centre FAQs...");
  const supportFaqs: { topic: string; question: string; answer: string }[] = [
    {
      topic: "Getting started",
      question: "How do I get a Somtel SIM card?",
      answer:
        "Visit any Somtel outlet with valid identification. Registration takes a few minutes and your line is active before you leave. You can also request an eSIM if your device supports one.",
    },
    {
      topic: "Getting started",
      question: "Can I keep my number if I switch to Somtel?",
      answer:
        "Bring your existing number and identification to an outlet and our team will explain the options available for your case. Moving an existing Somtel number between a plastic SIM and an eSIM is always free.",
    },
    {
      topic: "Getting started",
      question: "How do I set up mobile data on a new phone?",
      answer:
        "Most handsets configure themselves as soon as a Somtel SIM is inserted. If yours does not, our outlet staff will set it up for you, or you can call customer care and we will send the settings by SMS.",
    },
    {
      topic: "Billing and top-up",
      question: "How do I top up my airtime?",
      answer:
        "Top up through eDahab from your handset, in the DahabPlus app, at any Somtel outlet, or through any eDahab agent.",
    },
    {
      topic: "Billing and top-up",
      question: "How do I check my balance?",
      answer:
        "Dial the Somtel self-service menu from your handset. It shows your airtime balance along with any active bundles and their expiry dates.",
    },
    {
      topic: "Billing and top-up",
      question: "When is my postpaid bill due?",
      answer:
        "Postpaid statements are issued at the start of each month and are payable through eDahab, at any Somtel outlet, or by bank transfer for corporate accounts.",
    },
    {
      topic: "Internet and data",
      question: "My internet is slow. What should I check first?",
      answer:
        "Restart your device, check that you still have data left on your bundle, and move closer to a window if you are on mobile data. For Fiber Home, restart the router and wait two minutes before testing again. If the problem continues, call the fault line.",
    },
    {
      topic: "Internet and data",
      question: "Is fibre available at my address?",
      answer:
        "See the coverage page for the cities and services we currently reach, or call customer care with your address and we will confirm.",
    },
    {
      topic: "Internet and data",
      question: "How many devices can share a Mifi router?",
      answer:
        "Up to ten devices can connect to a Somtel Mifi at the same time, all sharing the same data bundle.",
    },
    {
      topic: "eDahab and payments",
      question: "I sent money to the wrong number. What do I do?",
      answer:
        "Call customer care immediately with the transaction reference from your SMS receipt. The sooner you report it, the more likely the transfer can be recovered.",
    },
    {
      topic: "eDahab and payments",
      question: "I forgot my eDahab PIN.",
      answer:
        "Visit any Somtel or eDahab agent with the identification you registered with and we will reset it for you. Never share your PIN with anyone, including staff.",
    },
    {
      topic: "eDahab and payments",
      question: "Is there a fee to save money with Keydso?",
      answer:
        "No. The basic Keydso savings service has no subscription and no hidden charges.",
    },
    {
      topic: "Account and security",
      question: "My phone was lost or stolen. How do I block my line?",
      answer:
        "Call customer care straight away and we will suspend the line and your eDahab account. Bring identification to an outlet to collect a replacement SIM keeping the same number.",
    },
    {
      topic: "Account and security",
      question: "Somebody is asking for my PIN or a verification code. Is that Somtel?",
      answer:
        "No. Somtel staff will never ask for your PIN or a verification code. If you receive a call or message asking for either, hang up and report it to customer care.",
    },
    {
      topic: "Account and security",
      question: "How do I update the details registered to my line?",
      answer:
        "Bring your identification to any Somtel outlet. Registered details can only be changed in person, which is what keeps your line and your money secure.",
    },
    {
      topic: "Business services",
      question: "Do you offer dedicated bandwidth for offices?",
      answer:
        "Yes. Somtel Fiber Optic provides symmetric dedicated bandwidth with a written service-level agreement, static IP addresses and priority fault response.",
    },
    {
      topic: "Business services",
      question: "Can our systems send SMS automatically?",
      answer:
        "Yes. The Somtel SMS API lets your own application send messages over HTTPS, with delivery receipts posted back to a callback URL you control.",
    },
    {
      topic: "Business services",
      question: "How do we open a business account?",
      answer:
        "Contact our enterprise team with the number of sites and staff you need to connect. An account manager will survey your requirements and return a written proposal.",
    },
  ];

  for (let i = 0; i < supportFaqs.length; i++) {
    await db.faq.create({ data: { ...supportFaqs[i], order: i + 1 } });
  }

  // ---------- Reusable content tiles (Careers + Contact pages) ----------
  // Rendered as outline cards. `icon` is a lucide name, resolved by src/lib/icons.ts.
  console.log("Seeding feature tiles...");
  const features: { group: string; icon: string; title: string; text: string }[] = [
    // Why work at Somtel — shown on /Career.
    {
      group: "career-benefits",
      icon: "Wallet",
      title: "Pay you can plan around",
      // TODO: confirm the salary review cycle with HR.
      text: "Salaries benchmarked against the Somali telecom market, reviewed every year, and paid on time without exception.",
    },
    {
      group: "career-benefits",
      icon: "HeartPulse",
      title: "Cover for you and your family",
      // TODO: confirm what the medical plan actually covers.
      text: "Medical cover extends to your immediate family, alongside paid annual leave and genuine support when life gets in the way.",
    },
    {
      group: "career-benefits",
      icon: "GraduationCap",
      title: "Training that counts",
      text: "Vendor certifications for engineers, structured coaching for care agents, and a yearly learning budget for every permanent member of staff.",
    },
    {
      group: "career-benefits",
      icon: "TrendingUp",
      title: "Room to move up",
      text: "Most of our supervisors and managers started on the front line. Every internal vacancy is advertised to staff before it goes public.",
    },
    {
      group: "career-benefits",
      icon: "Globe2",
      title: "Work that reaches a whole country",
      text: "From the fibre rings in Mogadishu to the towers outside Hargeisa, what you build is used by hundreds of thousands of people every day.",
    },
    {
      group: "career-benefits",
      icon: "Users",
      title: "A team that backs you",
      text: "Small teams, short chains of command, and managers who answer their phone. Good ideas travel fast here, wherever they come from.",
    },

    // How hiring works — shown on /Career.
    {
      group: "career-process",
      icon: "Send",
      title: "1. Apply online",
      text: "Choose a role, fill in the short form and attach your CV. Applications go straight to the hiring team, not to a mailbox nobody reads.",
    },
    {
      group: "career-process",
      icon: "FileText",
      title: "2. Screening",
      // TODO: confirm the target response time with HR.
      text: "We read every application and reply to each one, usually within ten working days of the closing date.",
    },
    {
      group: "career-process",
      icon: "PhoneCall",
      title: "3. Interview",
      text: "A conversation with the hiring manager about your experience and how you work, plus a short practical exercise for technical roles.",
    },
    {
      group: "career-process",
      icon: "Handshake",
      title: "4. Offer and onboarding",
      text: "A written offer with the full package set out in plain language, then a structured first week with a named buddy on your team.",
    },

    // Ways to reach us — shown on /contact-us.
    {
      group: "contact-channels",
      icon: "Phone",
      title: "Customer care, around the clock",
      // TODO: confirm the customer care short code (1000 is a placeholder).
      text: "Dial 1000 free from any Somtel line, day or night, every day of the year. Faults, bundles, billing and SIM issues are all handled on this number.",
    },
    {
      group: "contact-channels",
      icon: "MessageCircle",
      title: "WhatsApp",
      text: "Best for quick questions, screenshots of an error, or anything easier to show than to describe. Messages are answered during the day and queued overnight.",
    },
    {
      group: "contact-channels",
      icon: "Mail",
      title: "Email",
      text: "For anything that needs a written record: complaints, corporate enquiries, documentation requests and formal correspondence.",
    },
    {
      group: "contact-channels",
      icon: "Store",
      title: "Visit an outlet",
      text: "Somtel shops in every city we serve register lines, replace SIMs, reset an eDahab PIN and set up a new device while you wait. Bring your identification.",
    },
    {
      group: "contact-channels",
      icon: "Building2",
      title: "Enterprise sales",
      text: "Connecting an office, a campus or a branch network? Ask for the enterprise team and an account manager will survey your sites and put a written proposal together.",
    },
    {
      group: "contact-channels",
      icon: "LifeBuoy",
      title: "Report a network fault",
      text: "Tell us your line number and the area you are in. Home internet and business circuits are escalated to the field team the same day.",
    },
  ];

  for (let i = 0; i < features.length; i++) {
    await db.feature.create({
      data: {
        ...features[i],
        order: i + 1,
      },
    });
  }

  // ---------- Page sections ----------
  // A page is an ordered list of section blocks rather than one long markdown
  // body, so every page renders as a designed layout. `items` is a JSON array of
  // SectionItem — see src/lib/sections.ts. `icon` names are resolved by
  // src/lib/icons.ts, and every image is borderless by design.
  console.log("Seeding page sections...");

  const pageSections: SectionSeed[] = [
    // ----- /home-internet — the reference conversion -----
    {
      pageKey: "home-internet",
      type: "hero",
      eyebrow: "Home Internet",
      title: "Fibre built for family life",
      body:
        "A dedicated fibre line into your house, not a shared connection borrowed from a mobile mast. The same speed at eight in the evening as at eight in the morning, however many people are online.",
      image: "illus:home",
      ctaLabel: "Check availability",
      ctaHref: "/coverage",
      ctaLabel2: "Talk to us",
      ctaHref2: "/contact-us",
      // The same compact promise strip every product hero carries.
      items: [
        { icon: "Zap", title: "Widest network coverage" },
        { icon: "ShieldCheck", title: "No hidden charges" },
        { icon: "Headset", title: "24/7 customer care" },
      ],
    },
    {
      pageKey: "home-internet",
      type: "image-text",
      tone: "muted",
      eyebrow: "Why fibre",
      title: "A dedicated line, not a shared one",
      body:
        "Mobile broadband slows down when the neighbourhood comes home. Fibre does not. Your line runs from our network straight to your wall socket, so the capacity you pay for is the capacity you get, at every hour of the day.",
      image: "illus:shield",
      items: [
        { icon: "Gauge", title: "Evening speeds that hold", text: "No contention with the rest of the street when everyone is streaming." },
        { icon: "Infinity", title: "Unlimited data", text: "No daily cap, and no fair-use throttling on the higher plans." },
        { icon: "Wrench", title: "We install it properly", text: "A Somtel technician runs the line, fits the router and tests it with you." },
      ],
      ctaLabel: "See the plans",
      ctaHref: "#pricing",
    },
    {
      pageKey: "home-internet",
      type: "feature-grid",
      eyebrow: "What is included",
      title: "Everything you need in the box",
      body: "One monthly price covers the line, the hardware and the help. Nothing is billed to you afterwards.",
      items: [
        { icon: "Router", title: "A WiFi router", text: "Covers a typical home. Extenders are available for larger houses." },
        { icon: "Wrench", title: "Standard installation", text: "Fitted by a Somtel technician, arranged around your schedule." },
        { icon: "Infinity", title: "Unlimited data", text: "Stream, study and work without watching a counter." },
        { icon: "Truck", title: "Free relocation", text: "Moving house? We move your line to any other covered address." },
        { icon: "Headset", title: "24/7 fault line", text: "A real person answers, day or night, every day of the year." },
        { icon: "Tv", title: "IPTV ready", text: "Add Nashaad IPTV to the same connection whenever you want it." },
      ],
    },
    {
      pageKey: "home-internet",
      type: "image-text",
      tone: "muted",
      flip: true,
      eyebrow: "Choosing a plan",
      title: "Pick the speed that matches your house",
      body:
        "All three plans run over the same fibre line, so moving up or down a tier takes a phone call rather than a new installation.\n\n- **Essential** suits a couple of people browsing, messaging and streaming in standard definition.\n- **Family** is the plan most households pick — several phones, a laptop or two, and HD streaming without buffering.\n- **Max** is for large homes, home offices and anyone who works with big files or joins video calls all day.\n\nNot sure? Start on Family. It is the easiest to move away from in either direction.",
      image: "illus:signal",
    },
    {
      pageKey: "home-internet",
      type: "timeline",
      eyebrow: "Getting connected",
      title: "Four steps from enquiry to online",
      items: [
        { icon: "MapPin", title: "Check your address", text: "Find your city on the coverage page, or call us with your street name." },
        { icon: "CalendarCheck", title: "Book a survey", text: "An engineer confirms how the fibre reaches your building." },
        { icon: "Wrench", title: "Installation", text: "We run the line, fit the router and test the connection with you." },
        { icon: "Wifi", title: "You are online", text: "Most surveyed homes are live within a few working days." },
      ],
    },
    // Two short topics share one dense block rather than taking a full-width
    // image row each — the same rule the generated pages follow.
    {
      pageKey: "home-internet",
      type: "text-columns",
      eyebrow: "Good to know",
      title: "The detail, in short",
      items: [
        {
          title: "Running an office, not a household?",
          text: "Home Internet is a residential product on a shared, asymmetric connection. If you need guaranteed symmetric bandwidth, static IP addresses or a written service-level agreement, Somtel Fiber Optic is the right service instead.",
        },
        {
          title: "Moving house",
          text: "Relocation to another covered address is free. Tell customer care a few days before you move and we will book the new installation for the day you arrive.",
        },
        {
          title: "Adding IPTV",
          text: "Nashaad IPTV runs over the same fibre line and can be added to any plan at any time — there is no second installation and no new equipment.",
        },
        {
          title: "If something breaks",
          text: "The fault line answers day and night. Report the problem with your account number and a field engineer is assigned the same day.",
        },
      ],
    },
  ];

  // The hand-written page above, plus the pages generated from each product body.
  const allSections: SectionSeed[] = [...pageSections, ...generatedSections];

  // `order` counts from 1 within each page, so the rows read sensibly in Prisma Studio.
  const orderByPage: Record<string, number> = {};

  for (const { items, ...section } of allSections) {
    const order = (orderByPage[section.pageKey] ?? 0) + 1;
    orderByPage[section.pageKey] = order;

    await db.pageSection.create({
      data: {
        ...section,
        order,
        items: items ? JSON.stringify(items) : null,
      },
    });
  }

  // ---------- Retail network (store locator) ----------
  // TODO: replace with the real branch list, opening hours and phone numbers
  // from the retail team, and add lat/lng so the map placeholder becomes a map.
  console.log("Seeding stores and agents...");
  const stores: {
    name: string;
    city: string;
    region: string;
    address: string;
    hours: string;
    phone?: string;
    kind?: string;
  }[] = [
    {
      name: "Somtel Bakaro Flagship",
      city: "Mogadishu",
      region: "Banaadir",
      address: "Howlwadag Street, Bakaro Market",
      hours: "Sat–Thu, 8:00 – 18:00",
      phone: "+252 61 466 6666",
      kind: "shop",
    },
    {
      name: "Somtel Hodan Branch",
      city: "Mogadishu",
      region: "Banaadir",
      address: "Maka Al-Mukarama Road, Hodan District",
      hours: "Sat–Thu, 8:00 – 18:00",
      phone: "+252 61 466 6667",
      kind: "shop",
    },
    {
      name: "Somtel Airport Road Agent",
      city: "Mogadishu",
      region: "Banaadir",
      address: "Airport Road, Wadajir District",
      hours: "Daily, 8:00 – 20:00",
      kind: "agent",
    },
    {
      name: "Somtel Hargeisa Main",
      city: "Hargeisa",
      region: "Woqooyi Galbeed",
      address: "Independence Avenue, City Centre",
      hours: "Sat–Thu, 8:00 – 18:00",
      phone: "+252 63 466 6666",
      kind: "shop",
    },
    {
      name: "Somtel Berbera Port",
      city: "Berbera",
      region: "Woqooyi Galbeed",
      address: "Port Road, near the customs gate",
      hours: "Sat–Thu, 8:00 – 17:00",
      kind: "shop",
    },
    {
      name: "Somtel Bosaso Centre",
      city: "Bosaso",
      region: "Bari",
      address: "Main Market Street",
      hours: "Sat–Thu, 8:00 – 18:00",
      phone: "+252 90 466 6666",
      kind: "shop",
    },
    {
      name: "Somtel Garowe Branch",
      city: "Garowe",
      region: "Nugaal",
      address: "Airport Road, opposite the municipality",
      hours: "Sat–Thu, 8:00 – 17:00",
      kind: "shop",
    },
    {
      name: "Somtel Kismayo Agent",
      city: "Kismayo",
      region: "Lower Juba",
      address: "Central Market, Block B",
      hours: "Daily, 8:00 – 19:00",
      kind: "agent",
    },
    {
      name: "Somtel Baidoa Branch",
      city: "Baidoa",
      region: "Bay",
      address: "Isha Baidoa Road",
      hours: "Sat–Thu, 8:00 – 17:00",
      kind: "shop",
    },
    {
      name: "Somtel Galkacyo Agent",
      city: "Galkacyo",
      region: "Mudug",
      address: "Main Street, south district",
      hours: "Daily, 8:00 – 19:00",
      kind: "agent",
    },
  ];

  for (let i = 0; i < stores.length; i++) {
    await db.store.create({ data: { ...stores[i], order: i + 1 } });
  }

  // ---------- Promotions ----------
  // The slim offer strip above the navbar, and the card shown once shortly after
  // a visitor arrives. Both disappear on their own once `endsAt` passes.
  //
  // TODO: replace these with the real campaign, its dates and its landing page.
  console.log("Seeding promotions...");

  // Dates are set relative to the seed run so the countdown is always live in
  // development. A real campaign would use fixed dates.
  const now = new Date();
  const inDays = (n: number) => new Date(now.getTime() + n * 24 * 60 * 60 * 1000);

  await db.promo.create({
    data: {
      kind: "banner",
      title: "Get 1GB free on every $5 top-up",
      text: "Added to your line automatically, no code to dial.",
      ctaLabel: "Top up now",
      ctaHref: "/top-up",
      startsAt: now,
      endsAt: inDays(9),
      order: 1,
    },
  });

  await db.promo.create({
    data: {
      kind: "popup",
      title: "Jiilka Maanta 5G is live",
      text: "Somtel is rolling out 5G city by city. Check whether it has reached your street, and see which services are live where you are.",
      ctaLabel: "Check coverage",
      ctaHref: "/coverage",
      media: "illus:signal",
      startsAt: now,
      endsAt: inDays(30),
      order: 1,
    },
  });

  // ---------- Admin account ----------
  // TODO: change this password the first time you sign in. It exists so the
  // dashboard is reachable on a fresh database, not as a real credential.
  console.log("Seeding admin user...");
  await db.adminUser.create({
    data: {
      email: "admin@somtelsomalia.net",
      name: "Somtel Admin",
      passwordHash: await hashPassword("somtel-admin"),
    },
  });

  // ---------- Static markdown pages (legal) ----------
  // TODO: have these reviewed by legal counsel before publishing.
  console.log("Seeding static pages...");
  const pages: { slug: string; title: string; description: string; body: string }[] = [
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      description:
        "How Somtel Somalia collects, uses, stores and protects your personal information.",
      body: PRIVACY_BODY,
    },
    {
      slug: "terms-of-service",
      title: "Terms of Service",
      description:
        "The terms that apply when you use Somtel Somalia mobile, internet, eDahab and business services.",
      body: TERMS_BODY,
    },
  ];

  for (const page of pages) {
    await db.page.create({ data: page });
  }

  // ---------- Blog ----------
  console.log("Seeding blog posts...");
  const news = await db.category.create({ data: { name: "News", slug: "news" } });
  const events = await db.category.create({ data: { name: "Events", slug: "events" } });
  const press = await db.category.create({ data: { name: "Press & Release", slug: "press-release" } });

  await db.post.create({
    data: {
      slug: "somtel-expands-fiber-coverage-in-mogadishu",
      title: "Somtel expands fiber coverage across Mogadishu",
      excerpt:
        "New fiber routes bring high speed broadband to more homes and businesses in the capital.",
      body:
        "Somtel has completed a new phase of fiber deployment across Mogadishu, extending high speed broadband to additional districts.\n\nThe expansion adds capacity for both residential Fiber Home customers and enterprise clients who depend on dedicated bandwidth for daily operations.\n\nCustomers in newly covered areas can request installation through any Somtel outlet or by contacting customer support.",
      // Cropped from the wide slider banner by scripts/make-blog-covers.mjs.
      imageUrl: "/assets/images/blog/fibre-coverage.jpg",
      categories: { connect: [{ id: news.id }] },
      postedDate: new Date("2025-08-14"),
    },
  });

  await db.post.create({
    data: {
      slug: "edahab-celebrates-milestone-in-mobile-money",
      title: "eDahab celebrates a new milestone in mobile money",
      excerpt: "Mobile money continues to transform how people across the Somali region send and receive value.",
      body:
        "eDahab, Somtel's mobile money service, has reached a new milestone in active users across Somalia, Puntland and Somaliland.\n\nThe service allows customers to send money, pay bills, buy airtime and save through Keydso, all from a basic handset.\n\nSomtel continues to invest in agent networks so that cash-in and cash-out points remain within reach of every community.",
      imageUrl: "/assets/images/blog/edahab-milestone.jpg",
      categories: { connect: [{ id: press.id }] },
      postedDate: new Date("2025-07-02"),
    },
  });

  await db.post.create({
    data: {
      slug: "somtel-anniversary-celebration",
      title: "Somtel marks another year of serving the Somali region",
      excerpt: "Twelve years of connecting communities across South Central, Puntland and Somaliland.",
      body:
        "Somtel marked its anniversary with events recognising the customers, partners and staff who have supported the company's growth.\n\nFrom GSM voice to 4G/5G data, fiber broadband and mobile money, the network has grown to serve the majority of telecom users across the region.\n\nThe company reaffirmed its commitment to investing in people, communities and networks for a connected Somali future.",
      // The only anniversary asset is a 106px logo, which is unusable as a
      // cover. Left empty so BlogCover draws brand artwork instead.
      imageUrl: null,
      categories: { connect: [{ id: events.id }] },
      postedDate: new Date("2025-05-20"),
    },
  });


  // ---------- Events ----------
  //
  // Dates are relative to the day the seed runs, so the page always has
  // something in both columns. A fixed calendar would quietly become "all past"
  // and the upcoming half of the events page would look broken.
  //
  // TODO: replace these with the real Somtel calendar from the marketing team.
  // The shape is right; the particulars are placeholders.
  console.log("Seeding events...");

  const day = 24 * 60 * 60 * 1000;
  const from = (days: number, hour = 9) => {
    const d = new Date(Date.now() + days * day);
    d.setHours(hour, 0, 0, 0);
    return d;
  };

  const eventRows = [
    {
      slug: "jiilka-maanta-5g-launch-mogadishu",
      title: "Jiilka Maanta 5G — Mogadishu launch",
      summary:
        "The 5G network switches on across Banaadir, with live speed tests, device offers and the team on hand to move your line over.",
      body:
        "## What is happening\n\nSomtel is switching on 5G across Mogadishu, district by district. The launch day brings the network team, the device team and customer care into one hall so you can see the speeds for yourself and leave with your line already migrated.\n\n## On the day\n\n- Live speed tests against the 4G network you are on now\n- Device clinic: check whether your handset supports 5G, and move your number to an eSIM while you wait\n- Bundle desk for Kaafiye Plus and Dhamays Plus\n- Registration for Fiber Home in newly covered streets\n\n## Who should come\n\nAnyone on a Somtel line in Banaadir, and any business weighing up a dedicated circuit. Entry is free and no registration is needed.",
      venue: "Somtel HQ, Howlwadag",
      city: "Mogadishu",
      startsAt: from(12),
      endsAt: from(12, 17),
      ctaLabel: "Check coverage in your area",
      ctaHref: "/coverage",
      featured: true,
    },
    {
      slug: "edahab-merchant-day-hargeisa",
      title: "eDahab merchant day — Hargeisa",
      summary:
        "A working session for shopkeepers and agents: taking payments with DahabPlus, settling daily, and keeping a float that does not run dry.",
      body:
        "## For people who take money all day\n\nThis is a practical session rather than a presentation. Bring the handset you use in the shop and leave with it set up.\n\n## Covered\n\n- Registering as a merchant and getting your till number\n- Taking a payment, refunding one, and reading the day's statement\n- Managing your float across the agent network\n- Spotting the common fraud attempts and what to do about them\n\n## Bring\n\nYour identification, the handset you trade with, and your merchant number if you already have one.",
      venue: "Maansoor Hotel",
      city: "Hargeisa",
      startsAt: from(26),
      endsAt: null,
      ctaLabel: "About eDahab",
      ctaHref: "/eDahab",
    },
    {
      slug: "fibre-to-the-home-bosaso",
      title: "Fiber Home comes to Bosaso",
      summary:
        "Registration opens for fibre in the first Bosaso streets, with installation slots booked on the day.",
      body:
        "## Fibre reaches Bosaso\n\nThe first fibre routes into Bosaso are live, and registration opens for households on the streets they pass.\n\n## What to expect\n\n- Check your street against the route map\n- Choose a speed and book an installation slot\n- See the router and the speeds it delivers, running on the live network\n\n## If your street is not on the map\n\nLeave your address with the team. The build continues through the year and the list decides what gets connected next.",
      venue: "Somtel Customer Care Centre",
      city: "Bosaso",
      startsAt: from(45),
      endsAt: null,
      ctaLabel: "See fibre plans",
      ctaHref: "/fiberoptic",
    },
    {
      slug: "somtel-anniversary-celebration-2026",
      title: "Somtel anniversary celebration",
      summary:
        "Customers, partners and staff marked another year of the network, with awards for the agents who carried the most traffic.",
      body:
        "## Another year on\n\nSomtel marked its anniversary with the customers, partners and staff who built the year. The evening recognised the agent network — the people who keep cash-in and cash-out within reach of every community we serve.\n\n## Looking back on the year\n\n- 5G switched on in the first cities\n- Fibre routes extended across Mogadishu and Hargeisa\n- eDahab agent coverage widened into smaller towns\n\nThank you to everyone who came.",
      venue: "Jazeera Palace Hotel",
      city: "Mogadishu",
      startsAt: from(-38, 18),
      endsAt: null,
      ctaLabel: "Read the story",
      ctaHref: "/blog/somtel-anniversary-celebration",
    },
    {
      slug: "school-connectivity-programme-burco",
      title: "School connectivity programme — Burco",
      summary:
        "Six secondary schools connected to fibre, with the equipment and the first year of service donated.",
      body:
        "## Connecting classrooms\n\nSix secondary schools in Burco were connected to Somtel fibre, with routers, installation and the first year of service provided at no cost to the schools.\n\n## Why\n\nA school with a connection can reach material no library in the region holds. The programme continues: schools that want to be considered can write to customer care.",
      venue: "Burco Education Office",
      city: "Burco",
      startsAt: from(-96, 10),
      endsAt: null,
      ctaLabel: null,
      ctaHref: null,
    },
  ];

  for (const event of eventRows) await db.event.create({ data: event });

  // ---------- Jobs ----------
  console.log("Seeding jobs...");
  await db.job.createMany({
    data: [
      {
        slug: "network-engineer-mogadishu",
        title: "Network Engineer",
        type: "Full-time",
        location: "Mogadishu",
        department: "Technical",
        status: "Opened",
        deadline: new Date("2026-12-31"),
        detail:
          "## About the role\n\nWe are looking for a Network Engineer to support the deployment and maintenance of Somtel's integrated networks.\n\n## Responsibilities\n\n- Maintain GSM, UMTS and LTE network elements\n- Monitor network performance and resolve faults\n- Support fiber and wireless rollouts\n\n## Requirements\n\n- Degree in Telecommunications, Electrical Engineering or a related field\n- Experience with mobile network infrastructure\n- Strong troubleshooting skills",
      },
      {
        slug: "customer-service-representative",
        title: "Customer Service Representative",
        type: "Full-time",
        location: "Mogadishu",
        department: "Customer Care",
        status: "Opened",
        deadline: new Date("2026-11-30"),
        detail:
          "## About the role\n\nJoin our customer care team and be the voice of Somtel for our customers.\n\n## Responsibilities\n\n- Handle customer enquiries by phone and in person\n- Resolve service issues and escalate where needed\n- Maintain accurate records of customer interactions\n\n## Requirements\n\n- Excellent communication skills in Somali and English\n- Customer service experience preferred\n- Comfortable working shifts",
      },
      {
        slug: "sales-executive-hargeisa",
        title: "Sales Executive",
        type: "Full-time",
        location: "Hargeisa",
        department: "Sales",
        status: "Opened",
        deadline: new Date("2026-10-31"),
        detail:
          "## About the role\n\nDrive Somtel's growth by bringing our products to new business customers.\n\n## Responsibilities\n\n- Identify and win new business accounts\n- Present Somtel's enterprise and fiber offerings\n- Meet monthly sales targets\n\n## Requirements\n\n- Proven sales track record\n- Strong negotiation and presentation skills\n- Knowledge of the local business market",
      },
      {
        slug: "software-developer",
        title: "Software Developer",
        type: "Contract",
        location: "Mogadishu",
        department: "Technical",
        status: "Closed",
        deadline: new Date("2025-06-30"),
        detail:
          "## About the role\n\nBuild and maintain the internal applications that support Somtel's services.\n\n## Requirements\n\n- Experience with modern web frameworks\n- Familiarity with REST APIs and relational databases\n- Ability to work independently",
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
