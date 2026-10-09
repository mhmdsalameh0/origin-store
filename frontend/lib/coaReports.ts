export type CoaDocument = {
  slug: string;
  name: string;
  subtitle: string;
  copy: string;
  pdfPath?: string;
};

export const documentationCards: CoaDocument[] = [
  {
    slug: "ghk-cu",
    name: "GHK-CU 50 MG",
    subtitle: "GHK-CU 50 MG",
    copy: "Certificate of Analysis for GHK-CU 50 MG, including its batch reference and laboratory verification details.",
    pdfPath: "/coas/ghk-cu-50mg-coa.pdf"
  },
  {
    slug: "mots-c",
    name: "MOTS-C 10 MG",
    subtitle: "MOTS-C 10 MG",
    copy: "Certificate of Analysis for MOTS-C 10 MG, including its batch reference and laboratory verification details.",
    pdfPath: "/coas/mots-c-10mg-coa.pdf"
  },
  {
    slug: "tb-500",
    name: "TB-500 5 MG",
    subtitle: "TB-500 5 MG",
    copy: "Certificate of Analysis for TB-500 5 MG, including its batch reference and laboratory verification details.",
    pdfPath: "/coas/tb-500-5mg-coa.pdf"
  },
  {
    slug: "bpc-157",
    name: "BPC-157 5 MG",
    subtitle: "BPC-157 5 MG",
    copy: "Certificate of Analysis for BPC-157 5 MG, including its batch reference and laboratory verification details.",
    pdfPath: "/coas/bpc-157-5mg-coa.pdf"
  },
  {
    slug: "retatrutide",
    name: "Retatrutide 10 MG",
    subtitle: "Retatrutide 10 MG",
    copy: "Certificate of Analysis for Retatrutide 10 MG, including its batch reference and laboratory verification details.",
    pdfPath: "/coas/retatrutide-10mg-coa.pdf"
  }
];
