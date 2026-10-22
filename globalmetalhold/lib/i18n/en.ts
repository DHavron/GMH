// Словарь — английский. Этот файл также экспортирует тип SiteStrings,
// который задаёт контракт для всех локалей.

export interface SiteStrings {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    about: string;
    services: string;
    equipment: string;
    advantages: string;
    portfolio: string;
    process: string;
    contact: string;
    cta: string;
    phone: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    note: string;
  };
  stats: {
    heading: string;
    lead: string;
    area: string;
    machines: string;
    tonsPerMonth: string;
    clients: string;
  };
  services: {
    heading: string;
    subheading: string;
    items: { title: string; text: string }[];
  };
  equipment: {
    heading: string;
    subheading: string;
    note: string;
    groups: { name: string; items: string[] }[];
  };
  advantages: {
    heading: string;
    items: { title: string; text: string }[];
  };
  portfolio: {
    heading: string;
    subheading: string;
    note: string;
    items: string[];
  };
  process: {
    heading: string;
    subheading: string;
    steps: { title: string; text: string }[];
  };
  form: {
    heading: string;
    subheading: string;
    fields: {
      name: string;
      namePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      company: string;
      companyPlaceholder: string;
      comment: string;
      commentPlaceholder: string;
      drawing: string;
      drawingHint: string;
      drawingButton: string;
      drawingDropzone: string;
      removeFile: string;
      submit: string;
      submitting: string;
      consent: string;
    };
    errors: {
      required: string;
      nameShort: string;
      phoneInvalid: string;
      emailInvalid: string;
      fileRequired: string;
      fileType: string;
      fileSize: string;
      network: string;
      server: string;
    };
    success: {
      title: string;
      text: string;
      again: string;
    };
  };
  contacts: {
    heading: string;
    addressLabel: string;
    address: string;
    phoneLabel: string;
    emailLabel: string;
    email: string;
    hoursLabel: string;
    hours: string;
    mapNote: string;
  };
  footer: {
    about: string;
    sectionsTitle: string;
    contactsTitle: string;
    requisitesTitle: string;
    requisites: string;
    rights: string;
    madeWith: string;
  };
}

// Словарь — английский
export const en: SiteStrings = {
  meta: {
    title: "GlobalMetalHold — Custom Metalworking in Logoysk | CNC Turning & Milling, Laser Cutting",
    description:
      "GlobalMetalHold LLC — industrial metalworking for B2B: CNC turning and milling, laser cutting, welding, metal structures and powder coating. Serving corporate customers across Belarus and export markets. Logoysk, Belarus.",
    ogTitle: "GlobalMetalHold — Industrial Custom Metalworking",
    ogDescription:
      "CNC turning & milling, laser cutting, welding and metal fabrication. B2B manufacturing in Logoysk, Belarus — nationwide and export.",
  },
  nav: {
    about: "Company",
    services: "Services",
    equipment: "Equipment",
    advantages: "Why us",
    portfolio: "Portfolio",
    process: "Process",
    contact: "Contacts",
    cta: "Request a Quote",
    phone: "+375 (29) 000-00-00", // TODO: replace with real phone
  },
  hero: {
    badge: "Industrial metalworking since 2008", // TODO: founding year
    title: "Custom metal parts manufacturing for business — on time, on spec",
    subtitle:
      "CNC turning and milling, laser cutting, welding and metal structures. We manufacture parts and assemblies to your drawings — from prototype batches to serial orders for industrial enterprises.",
    ctaPrimary: "Get a quote",
    ctaSecondary: "Our services",
    note: "Quote for your drawings within 24 hours",
  },
  stats: {
    heading: "The company and production capacity",
    lead:
      "GlobalMetalHold LLC is a specialized metalworking plant in Logoysk, Belarus. We serve industrial enterprises, construction companies and OEM manufacturers with stable quality and full documentation for corporate customers.",
    area: "m² of production facilities", // TODO: actual area
    machines: "machines, including CNC", // TODO: actual count
    tonsPerMonth: "tons of metal processed monthly", // TODO: actual volume
    clients: "corporate clients on ongoing contracts", // TODO: actual count
  },
  services: {
    heading: "Services",
    subheading: "Full-cycle metal processing — from raw stock to finished product",
    items: [
      {
        title: "CNC Turning",
        text: "Machining of rotational parts on CNC lathes: shafts, bushings, trunnions, threaded joints. Tolerances up to IT6 in steel, stainless steel, brass and aluminium.",
      },
      {
        title: "CNC Milling",
        text: "3- and 5-axis milling of housings, plates, brackets and tooling. Programming from the customer's 3D model, complex surfaces and slots.",
      },
      {
        title: "Laser Cutting",
        text: "High-precision sheet cutting up to 20 mm (steel, stainless, aluminium) on a fiber laser. Clean edges without rework, DXF nesting and material optimization.",
      },
      {
        title: "Welding",
        text: "MIG/MAG, TIG and manual arc welding. Certified welders, weld seams to GOST standards, welded assemblies and frames of any complexity.",
      },
      {
        title: "Metal Structures",
        text: "Design and fabrication of frames, trusses, staircases, railings, tanks and process platforms. Corrosion protection on request.",
      },
      {
        title: "Powder Coating",
        text: "Blast/chemical surface preparation and polymer coating in a 6×2 m booth. Over 200 RAL colors with film thickness and adhesion control.",
      },
    ],
  },
  equipment: {
    heading: "Equipment & technologies",
    subheading: "Our machine park covers the full production cycle on a single site",
    note: "TODO: update this list with the actual machine inventory — models, years and specifications.",
    groups: [
      {
        name: "CNC turning center group",
        items: [
          "CNC turret lathes Ø320×750 mm (Fanuc/CAXA controls)",
          "Live-tooling machines with Y-axis — complete machining in one setup",
          "Conventional turning lathes for repair and small-batch work",
        ],
      },
      {
        name: "CNC milling group",
        items: [
          "3-axis machining centers 1100×500 mm (Fanuc/Siemens)",
          "5-axis machining centers for housings and tooling",
          "Vertical milling machines for large plates",
        ],
      },
      {
        name: "Cutting & bending",
        items: [
          "6 kW fiber laser, 3015×1500 mm bed, steel up to 20 mm",
          "CNC press brake 100 tf / 3200 mm bed length",
          "Guillotine shears and plasma cutting",
        ],
      },
      {
        name: "Welding & painting",
        items: [
          "MIG/MAG and TIG stations for high-alloy steels",
          "Powder coating booth 6000×2000×2200 mm with curing oven",
          "Shot blasting room for surface preparation",
        ],
      },
      {
        name: "Quality control",
        items: [
          "Coordinate measuring machine (CMM)",
          "Optical comparator, calibrated gauges and micrometers",
          "Independent QC department at every production stage",
        ],
      },
    ],
  },
  advantages: {
    heading: "Why industrial enterprises work with us",
    items: [
      {
        title: "Precision & consistent quality",
        text: "CNC machinery, incoming material inspection and QC at every stage. Deviations stay strictly within your tolerances.",
      },
      {
        title: "On-time delivery",
        text: "In-house full-cycle production with scheduled loading. Deadlines are fixed by contract, with liability for delays.",
      },
      {
        title: "Over 15 years of experience",
        text: "Thousands of part numbers delivered for machine building, construction, agriculture and energy across Belarus and export.",
      },
      {
        title: "Corporate-friendly paperwork",
        text: "Contracts, invoices, UPD documents, deferred payment terms, tender participation and full document support for legal entities.",
      },
      {
        title: "Manufacturing to your drawings",
        text: "We work from drawings, 3D models and physical samples, providing DFM review and drawing corrections when needed.",
      },
      {
        title: "Serial production & logistics",
        text: "From a single prototype to recurring series with finished-goods warehousing. Delivery across Belarus and the EAEU by freight carriers.",
      },
    ],
  },
  portfolio: {
    heading: "Project portfolio",
    subheading: "Selected real orders — parts, assemblies and metal structures",
    note: "TODO: replace placeholders with real photos of completed work.",
    items: [
      "Shafts and bushings for bottling lines (batch of 1,200 pcs)",
      "Process platform frame for a grain elevator",
      "Gearbox housings, 5-axis CNC milling",
      "Fiber laser nesting of 10 mm steel sheets",
      "Stair flights and railings with powder coating",
      "Welded frames for agricultural machinery",
      "Tooling and die plates to customer drawings",
      "Stainless steel tanks and heat-exchanger units",
    ],
  },
  process: {
    heading: "How we cooperate",
    subheading: "A transparent process — from inquiry to shipment",
    steps: [
      {
        title: "Request & drawings",
        text: "You send an inquiry with drawings or a task description. Our engineer follows up if clarification is needed.",
      },
      {
        title: "Quotation & proposal",
        text: "Within 24 hours we prepare a cost and lead-time quotation, agree on technology and sign a contract.",
      },
      {
        title: "Production & QC",
        text: "The order runs through material → machining → final QC. You receive photo/video reports at key stages.",
      },
      {
        title: "Documents & delivery",
        text: "We provide the full document package (invoice, UPD, quality passports) and ship via your preferred carrier.",
      },
    ],
  },
  form: {
    heading: "Request a quote",
    subheading:
      "Attach your drawing — we will prepare a commercial offer within 24 hours. The lead goes straight into our sales CRM.",
    fields: {
      name: "Name",
      namePlaceholder: "Your full name",
      phone: "Phone",
      phonePlaceholder: "+375 (XX) XXX-XX-XX",
      email: "Email",
      emailPlaceholder: "purchasing@company.com",
      company: "Company (optional)",
      companyPlaceholder: "Acme Inc.",
      comment: "Order details",
      commentPlaceholder: "Material, quantity, deadlines, special requirements…",
      drawing: "Drawing / technical specification",
      drawingHint:
        "Required field. Accepted formats: PDF, DWG, DXF, ZIP, RAR. Maximum file size — 20 MB.",
      drawingButton: "Choose file",
      drawingDropzone: "Drag & drop a file here or click “Choose file”",
      removeFile: "Remove file",
      submit: "Send request",
      submitting: "Sending…",
      consent: "By submitting you agree to the processing of your personal data.",
    },
    errors: {
      required: "This field is required",
      nameShort: "Please enter your name (at least 2 characters)",
      phoneInvalid: "Please enter a valid phone number",
      emailInvalid: "Please enter a valid email address",
      fileRequired: "Please attach a drawing (.pdf, .dwg, .dxf, .zip, .rar)",
      fileType: "Unsupported format. Allowed: PDF, DWG, DXF, ZIP, RAR",
      fileSize: "File exceeds 20 MB. Please archive or compress the drawing",
      network: "Could not send the request. Check your connection and try again",
      server: "Service temporarily unavailable. Please call us or try again later",
    },
    success: {
      title: "Request sent!",
      text: "Thank you! A sales manager will contact you during business hours and prepare a quote based on your drawing.",
      again: "Send another request",
    },
  },
  contacts: {
    heading: "Contacts",
    addressLabel: "Plant address",
    address: "Logoysk, Minsk region, Republic of Belarus", // TODO: exact address
    phoneLabel: "Phone",
    emailLabel: "Sales email",
    email: "sales@globalmetalhold.by", // TODO: real email
    hoursLabel: "Working hours",
    hours: "Mon–Fri: 8:30 AM – 5:30 PM",
    mapNote: "TODO: replace the iframe with an actual Google Maps/Yandex map embed with the plant marker.",
  },
  footer: {
    about:
      "Custom industrial metalworking: CNC turning and milling, laser cutting, welding, metal structures and powder coating.",
    sectionsTitle: "Sections",
    contactsTitle: "Contacts",
    requisitesTitle: "Company details",
    requisites:
      "GlobalMetalHold LLC · Tax ID XXXXXXXXX · Registered address: Logoysk, Minsk region, Belarus", // TODO: real requisites
    rights: "All rights reserved.",
    madeWith: "Metal parts manufacturing for business — Belarus & export",
  },
};
