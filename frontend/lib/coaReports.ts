export type CoaReport = {
  title: string;
  subtitle: string;
  reportTo: string;
  details: Record<string, string>;
  note: string;
  results: { analysis: string; method: string; result: string[] }[];
  footer: string[];
};

export const vanguardLab = {
  name: "Vanguard Laboratory",
  address: "2453 Parkmont Ln",
  cityStateZip: "Olympia, WA 98502",
  phone: "360-957-7010"
};

export const coaReports: Record<string, CoaReport> = {
  "ghk-cu": {
    title: "Certificate of Analysis",
    subtitle: "GHK-CU 10MG",
    reportTo: "Origin Restored",
    details: {
      Compound: "GHK-CU",
      Quantity: "50 mg",
      "Laboratory ID": "V260702-8 001",
      "Lot Number": "GHKCU-01-2026",
      "Date Reported": "2/7/2026"
    },
    note: "Chromatogram for vial A shown above.",
    results: [
      { analysis: "Chromatographic Purity", method: "HPLC-UV/VIS", result: ["99.82%", "99.82%", "99.82%"] },
      { analysis: "Quantity", method: "HPLC-UV/VIS", result: ["50.89 mg", "50.98 mg", "50.79 mg"] }
    ],
    footer: ["Report by: Dustin Newman, Laboratory Director", "Approved by: Tori Johnson, Operations Manager on 2/7/2026"]
  },
  "mots-c": {
    title: "Certificate of Analysis",
    subtitle: "MOTS-C 10 mg",
    reportTo: "Origin Restored",
    details: {
      Compound: "MOTS-C",
      Quantity: "10 mg",
      "Laboratory ID": "V260712-5 001",
      "Lot Number": "MOTSC-01-2026",
      "Date Reported": "12/7/2026"
    },
    note: "Chromatogram for vial A shown above.",
    results: [
      { analysis: "Chromatographic Purity", method: "HPLC-UV/VIS", result: ["99.89%", "99.89%", "99.89%"] },
      { analysis: "Quantity", method: "HPLC-UV/VIS", result: ["10.89 mg", "10.56 mg", "10.89 mg"] }
    ],
    footer: ["Report by: Dustin Newman, Laboratory Director", "Approved by: Tori Johnson, Operations Manager on 12/7/2026"]
  },
  "tb-500": {
    title: "Certificate of Analysis",
    subtitle: "TB-500 5 mg",
    reportTo: "Origin Restored",
    details: {
      Compound: "TB-500",
      Quantity: "5 mg",
      "Laboratory ID": "V260713-4 001",
      "Lot Number": "TB500-01-2026",
      "Date Reported": "13/7/2026"
    },
    note: "Chromatogram for vial A shown above.",
    results: [
      { analysis: "Chromatographic Purity", method: "HPLC-UV/VIS", result: ["99.59%", "99.59%", "99.59%"] },
      { analysis: "Quantity", method: "HPLC-UV/VIS", result: ["5.09 mg", "5.01 mg", "5.16 mg"] }
    ],
    footer: ["Report by: Dustin Newman, Laboratory Director", "Approved by: Tori Johnson, Operations Manager on 13/7/2026"]
  },
  "bpc-157": {
    title: "Certificate of Analysis",
    subtitle: "BPC-157 10 mg",
    reportTo: "Origin Restored",
    details: {
      Compound: "BPC-157",
      Quantity: "10 mg",
      "Laboratory ID": "V260714-3 001",
      "Lot Number": "BPC157-01-2026",
      "Date Reported": "14/7/2026"
    },
    note: "Chromatogram for vial A shown above.",
    results: [
      { analysis: "Chromatographic Purity", method: "HPLC-UV/VIS", result: ["99.67%", "99.67%", "99.67%"] },
      { analysis: "Quantity", method: "HPLC-UV/VIS", result: ["10.02 mg", "10.15 mg", "10.11 mg"] }
    ],
    footer: ["Report by: Dustin Newman, Laboratory Director", "Approved by: Tori Johnson, Operations Manager on 14/7/2026"]
  },
  retatrutide: {
    title: "Certificate of Analysis",
    subtitle: "Retatrutide 10 mg",
    reportTo: "Origin Restored",
    details: {
      Compound: "GLP-3 Retatrutide",
      Quantity: "10 mg",
      "Laboratory ID": "V260120-6 001",
      "Lot Number": "GLP3-01-2026",
      "Date Reported": "2/7/2026"
    },
    note: "Chromatogram for vial A shown above.",
    results: [
      { analysis: "Chromatographic Purity", method: "HPLC-UV/VIS", result: [">99.80%", ">99.80%", ">99.80%"] },
      { analysis: "Quantity", method: "HPLC-UV/VIS", result: ["10.62 mg", "10.83 mg", "10.62 mg"] }
    ],
    footer: ["Report by: Dustin Newman, Laboratory Director", "Approved by: Tori Johnson, Operations Manager on 2/7/2026"]
  }
};

export const documentationCards = [
  {
    slug: "ghk-cu",
    name: "GHK-CU 10MG",
    subtitle: "GHK-CU 10MG",
    copy: "PDF Document Review certificate documentation for GHK-CU 50 MG including batch reference and supporting quality verification details."
  },
  {
    slug: "mots-c",
    name: "MOTS-C 10 MG",
    subtitle: "MOTS-C 10 MG",
    copy: "PDF Document Review certificate documentation for Glow 70mg including batch reference and supporting quality verification details."
  },
  {
    slug: "tb-500",
    name: "TB-500 5 MG",
    subtitle: "TB-500 5 MG",
    copy: "PDF Document Review certificate documentation for KLOW 80mg including batch reference and supporting quality verification details."
  },
  {
    slug: "bpc-157",
    name: "BPC-157 10 MG",
    subtitle: "BPC-157 10 MG",
    copy: "PDF Document Review certificate documentation for BPC-157 10 MG including batch reference and supporting quality verification details."
  },
  {
    slug: "retatrutide",
    name: "Retatrutide 10 MG",
    subtitle: "Retatrutide 10 MG",
    copy: "PDF Document Review certificate documentation for KLOW 80mg including batch reference and supporting quality verification details."
  }
];
