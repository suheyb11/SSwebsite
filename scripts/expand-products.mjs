/**
 * One-off editing script: expands the thin product entries in prisma/seed.ts.
 * Each entry gets a longer `body` and, where it makes sense, pricing `plans`.
 * Run with `node scripts/expand-products.mjs`, then `npm run db:seed`.
 */
import fs from "node:fs";

const SEED = "prisma/seed.ts";
let s = fs.readFileSync(SEED, "utf8");

/** Replaces an exact snippet, failing loudly if the anchor has drifted. */
function swap(find, replace, label) {
  if (!s.includes(find)) throw new Error("anchor not found: " + label);
  s = s.replace(find, replace);
  console.log("  expanded", label);
}

// ---------------------------------------------------------------- Postpaid
swap(
  `      body:
        "## Postpaid Service\\n\\nSomtel Postpaid gives you a single monthly bill covering voice, data and SMS. Ideal for businesses and heavy users who want to avoid frequent top-ups.\\n\\n## Terms & Conditions\\n\\nPostpaid accounts require registration with valid identification. Bills are issued monthly and payable through eDahab or at any Somtel outlet.",
      order: 2,
      faqs: [`,
  `      body:
        "## One bill, everything included\\n\\nSomtel Postpaid brings your voice, data and SMS together on a single monthly invoice. You use the network first and settle once, which makes budgeting straightforward for households and easy to reconcile for finance teams.\\n\\n## Why customers choose Postpaid\\n\\n- **Predictable spending** - the same amount every month, with a clear statement showing exactly what you used\\n- **No interruptions** - you are never cut off mid-call because a bundle ran out\\n- **Priority support** - postpaid accounts reach a dedicated care line\\n- **Shared accounts** - add employee or family lines to one invoice and manage them centrally\\n\\n## Built for teams\\n\\nBusinesses can group any number of lines under one account, set a spending limit per line, and receive an itemised statement each month. Our enterprise team will help you pick the right mix of allowances for your staff.\\n\\n## Getting started\\n\\nBring valid identification to any Somtel outlet. Registration takes a few minutes and your plan is active the same day. Existing prepaid customers keep their number when they migrate.\\n\\n## Billing and payment\\n\\nStatements are issued at the start of each month and can be settled through eDahab, at any Somtel outlet, or by bank transfer for corporate accounts.",
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
      faqs: [`,
  "Postpaid"
);

// -------------------------------------------------------------------- Mifi
swap(
  `      body: "## Somtel Mifi\\n\\nA pocket-sized modem that shares a Somtel data connection with multiple devices.",
      order: 7,
      faqs: [`,
  `      body:
        "## Internet that travels with you\\n\\nSomtel Mifi is a pocket-sized 4G router that turns a Somtel data bundle into a private WiFi network. Switch it on and up to ten devices connect at once - laptops, tablets, phones and smart TVs - anywhere our network reaches.\\n\\n## What you get\\n\\n- **A portable 4G router** included with every Mifi package\\n- **Up to 10 connected devices** sharing one bundle\\n- **All-day battery** so you stay online away from a power source\\n- **No installation** - no cables, no technician visit, no waiting\\n\\n## Who it is for\\n\\nMifi suits students who move between home and campus, field teams working away from an office, families in areas fibre has not reached yet, and anyone who wants a backup connection when their main line goes down.\\n\\n## Choosing a bundle\\n\\nIf you mostly browse, chat and check email, a smaller monthly bundle is plenty. If several people stream video or join video calls, choose one of the larger bundles. You can change bundle at any time, and unused data follows the validity shown on your package.\\n\\n## Topping up\\n\\nRecharge from your handset through eDahab, in the DahabPlus app, or at any Somtel customer care centre.",
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
      faqs: [`,
  "Mifi"
);

// -------------------------------------------------------------------- eSIM
swap(
  `      body: "## eSIM\\n\\nScan, activate and connect. Your Somtel number lives in your device.",
      order: 8,
      faqs: [`,
  `      body:
        "## A SIM with no plastic\\n\\nAn eSIM is a SIM card built into your device. Instead of collecting a card and sliding it into a tray, you scan a QR code and your Somtel line activates in under a minute - no outlet visit, no waiting for delivery.\\n\\n## Why go eSIM\\n\\n- **Instant activation** - scan, confirm, connect\\n- **Two numbers, one phone** - keep a personal and a work line on the same device\\n- **Nothing to lose** - an eSIM cannot fall out, snap, or wear down\\n- **Safer if stolen** - a lost device's eSIM can be disabled remotely, which a plastic SIM cannot\\n- **Better for travel** - add a Somtel line without removing your existing one\\n\\n## How to activate\\n\\n1. Check that your device supports eSIM - most phones released in recent years do.\\n2. Request a Somtel eSIM from any outlet or through customer care.\\n3. Open your phone's mobile network settings and scan the QR code we provide.\\n4. Name the line, choose it as your data SIM if you wish, and you are connected.\\n\\n## Moving an existing number\\n\\nAlready have a Somtel number on a physical SIM? Bring it and your identification to an outlet and we will transfer it to an eSIM profile while you wait. Your number, balance and bundles all carry across.\\n\\n## TODO: list the exact supported device models once the compatibility list is confirmed.",
      order: 8,
      faqs: [`,
  "eSIM"
);

// ----------------------------------------------------------------- Roaming
swap(
  `      body: "## Roaming\\n\\nTravel with your Somtel number and stay reachable on partner networks abroad.",
      order: 9,
      faqs: [`,
  `      body:
        "## Your Somtel number, wherever you land\\n\\nRoaming keeps your line working when you leave Somalia. Calls, SMS and mobile data carry on over our partner networks abroad, so colleagues and family reach you on the number they already have.\\n\\n## What works abroad\\n\\n- **Incoming and outgoing calls** on your usual Somtel number\\n- **SMS** sent and received as normal\\n- **Mobile data** on partner networks, charged from your Somtel balance\\n- **eDahab access** so you can still send money and top up while travelling\\n\\n## Before you travel\\n\\nRoaming is not switched on by default. Contact customer care or visit an outlet a day or two before departure and we will enable it on your line. Keep a healthy balance topped up - roaming charges are deducted as you use the service.\\n\\n## Keeping costs down\\n\\n- Turn data roaming off in your phone settings and switch it on only when you need it\\n- Use WiFi for large downloads, video calls and app updates\\n- Ask customer care for the rate in your destination country before you go\\n\\n## Where we roam\\n\\nSomtel has roaming agreements across East Africa, the Gulf and a number of European destinations.\\n\\n## TODO: replace this section with the confirmed partner-country list and per-country rates.",
      order: 9,
      faqs: [`,
  "Roaming"
);

// ------------------------------------------------------------------ eDahab
swap(
  `      body:
        "## eDahab Mobile Money\\n\\nSend money, pay bills and buy airtime from your handset.\\n\\n- **24/7 Customer Support** - help whenever you need it\\n- **Secure Transactions** - every transfer is protected\\n- **Convenient Services** - pay, send and receive in seconds",
      order: 10,`,
  `      body:
        "## Banking that fits in your pocket\\n\\neDahab turns any handset into a bank account. Send money to family, receive your salary, pay a shop, settle a bill or top up airtime - all from a simple menu, with no branch visit and no paperwork.\\n\\n## What you can do\\n\\n- **Send and receive money** instantly, across the Somali region\\n- **Pay merchants** at thousands of shops and restaurants\\n- **Buy airtime and bundles** for yourself or someone else\\n- **Settle bills** for utilities and Somtel services\\n- **Save with Keydso** by moving money into a savings balance\\n- **Withdraw cash** at any eDahab agent\\n\\n## Why customers trust it\\n\\n- **24/7 customer support** - help whenever you need it, day or night\\n- **Secure transactions** - every transfer is encrypted and PIN-protected\\n- **Instant confirmations** - an SMS receipt for every movement of money\\n- **Widest agent network** - agents in every major town we serve\\n\\n## Getting started\\n\\nVisit any Somtel or eDahab agent with valid identification. Registration takes a few minutes and your account is active before you leave. Then dial *232# from your handset, or download the DahabPlus app for the full experience.\\n\\n## Staying safe\\n\\nNever share your PIN - Somtel staff will never ask for it. Always check the recipient's number on the confirmation screen before approving a transfer. If something looks wrong, call customer care straight away.",
      order: 10,`,
  "eDahab"
);

// ------------------------------------------------------------------ Keydso
swap(
  `      body: "## Keydso\\n\\nSet money aside and track your savings from your handset.",
      order: 11,
      faqs: [`,
  `      body:
        "## Saving made simple\\n\\nKeydso is a savings service built into eDahab. Move money out of your spending balance into a separate savings balance, and it stays there until you choose to take it out - no branch, no forms, no minimum deposit.\\n\\n## How it works\\n\\n1. Dial *232# from the handset registered to your eDahab account.\\n2. Choose Keydso from the menu.\\n3. Enter the amount you want to set aside and confirm with your PIN.\\n4. Check your savings balance from the same menu at any time.\\n\\n## Why it helps\\n\\n- **Out of sight, out of spend** - money in Keydso is separate from your everyday balance\\n- **Save any amount** - put aside whatever you can, whenever you can\\n- **Always available** - withdraw back to your eDahab balance instantly when you need it\\n- **No service fee** - the basic Keydso service is free, with no subscription and no hidden charges\\n\\n## Good habits\\n\\nMany customers move a small amount into Keydso each time they are paid, before spending on anything else. Others save toward something specific - school fees, a device, or a business purchase - and find it easier when the money is not sitting in the balance they spend from.\\n\\n## Security\\n\\nKeydso uses the same encryption and PIN protection as the rest of eDahab. Your savings balance can only be moved from the handset registered to your account.",
      order: 11,
      faqs: [`,
  "Keydso"
);

// --------------------------------------------------------------------- SMS
swap(
  `      body: "## Mysms\\n\\nSend campaigns, alerts and notifications to your customers at scale.",
      order: 13,
      faqs: [`,
  `      body:
        "## Reach every customer, on every network\\n\\nMysms is Somtel's bulk messaging platform. Upload a contact list, write your message, and it goes out to thousands of handsets across all Somali networks in seconds - with a delivery report for every single one.\\n\\n## What businesses use it for\\n\\n- **Marketing campaigns** - promotions, new products, seasonal offers\\n- **Transactional alerts** - payment confirmations, order updates, appointment reminders\\n- **One-time passwords** - secure logins and transaction verification\\n- **Internal notices** - shift changes, emergency alerts, staff announcements\\n\\n## Platform features\\n\\n- **Registered sender ID** so messages arrive under your business name, not a number\\n- **Contact groups** for segmenting customers by branch, city or category\\n- **Scheduling** to send a campaign at a chosen date and time\\n- **Delivery reports** showing exactly which messages landed\\n- **Message templates** for the notices you send repeatedly\\n\\n## Why SMS still wins\\n\\nSMS needs no app, no internet connection and no smartphone. It reaches every customer on every handset in the country, and it is read within minutes far more often than email. For a market where data is not universal, it remains the most dependable way to reach people.\\n\\n## Getting set up\\n\\nContact our enterprise team to open an account. We will register your sender ID, walk your staff through the platform, and load your first batch of credit. Top up later through your account manager or via eDahab.",
      order: 13,
      faqs: [`,
  "SMS"
);

// ------------------------------------------------------------------ SMSAPI
swap(
  `      body: "## SMS API\\n\\nA straightforward HTTP API for sending messages from your own application.",
      order: 14,
      faqs: [`,
  `      body:
        "## Messaging your systems can call\\n\\nThe Somtel SMS API lets your own software send messages directly. Where Mysms is a dashboard your staff log into, the API is an endpoint your application calls - so a confirmation SMS can fire the moment an order is placed, with nobody touching a screen.\\n\\n## Typical integrations\\n\\n- **One-time passwords** sent at login or checkout\\n- **Payment and order confirmations** triggered by your backend\\n- **Delivery notifications** as a shipment changes status\\n- **Appointment reminders** generated from your booking system\\n- **System alerts** routed to an on-call engineer\\n\\n## How it works\\n\\nAuthenticate with the API key issued to your account, then send a standard HTTPS request carrying the destination number, your sender ID and the message text. The response confirms acceptance, and a delivery receipt follows when the handset receives it. High-volume senders can connect over SMPP instead.\\n\\n## What we provide\\n\\n- **REST endpoints** documented with request and response examples\\n- **Sample code** for common server languages\\n- **A test account** so you can integrate before going live\\n- **Delivery receipts** posted back to a callback URL you control\\n- **Engineering support** during integration\\n\\n## Requirements\\n\\nYou will need a registered Somtel enterprise account, a sender ID, and a server able to make outbound HTTPS requests. Our team issues credentials once your account is approved.\\n\\n## TODO: publish the live API base URL and full endpoint reference once the developer portal is ready.",
      order: 14,
      faqs: [`,
  "SMSAPI"
);

// --------------------------------------------------------------------- IVR
swap(
  `      body: "## IVR\\n\\nBuild guided call menus so your customers reach the right team the first time.",
      order: 15,
      faqs: [`,
  `      body:
        "## A call centre without the call centre\\n\\nSomtel's IVR platform answers your business calls on a dedicated short code, greets the caller in their language, and routes them to the right team through a simple menu - so nobody waits on hold for the wrong department.\\n\\n## What it does\\n\\n- **Answers every call** on a short code that is easy for customers to remember\\n- **Guides callers through a menu** - press 1 for sales, 2 for support, and so on\\n- **Routes to the right agent** based on the choice the caller makes\\n- **Handles overflow** by queueing callers instead of dropping them\\n- **Works around the clock** with recorded information outside office hours\\n\\n## Managing your agents\\n\\nEach member of staff gets an agent account they sign into from a handset or a desk phone. Supervisors can see who is available, how many callers are waiting, and how long each call took. Add or remove agents as your team changes.\\n\\n## Reporting\\n\\nThe platform records call volumes, answer rates, average handling time and which menu options callers choose most. That last figure is often the most useful - it shows you where your customers actually need help.\\n\\n## Who it suits\\n\\nBanks, insurers, hospitals, utilities, logistics firms, government offices and any business fielding more calls than a single line can carry.\\n\\n## Getting started\\n\\nContact the Somtel enterprise team. We assign your short code, build your menu structure with you, create accounts for your agents, and train your supervisors. Short codes are rented monthly, priced by the number of agent seats you need.\\n\\n## TODO: confirm the monthly short-code rental and per-agent pricing with the enterprise team.",
      order: 15,
      faqs: [`,
  "IVR"
);

fs.writeFileSync(SEED, s);
console.log("\nseed.ts updated");
