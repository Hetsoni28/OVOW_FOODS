"use client";

import { useState } from "react";
import { IconDownload, IconLoader } from "@/components/atoms/Icons";
import type { Product } from "@/types";
import { COMPANY_CONFIG } from "@/lib/config";

interface Props { products: Product[] }

// ─── Brand colors ─────────────────────────────────────────────────────────────
const GREEN  = "#0B2118";
const GOLD   = "#C9A24A";
const CREAM  = "#F8F4EA";
const WHITE  = "#FFFFFF";
const MUTED  = "#8B7355";
const TEXT   = "#1a1208";
const RED    = "#DC2626";

// ─── Page geometry (A4 in mm) ─────────────────────────────────────────────────
const W = 210;          // page width
const MX = 16;          // horizontal margin
const CONTENT_W = W - MX * 2;
const FOOTER_H = 12;    // footer height reserved at bottom
const HEADER_H = 26;    // per-page header height
const TOP_BAR  = 3;     // gold stripe at top

// ─── Heights of each element type (mm) ────────────────────────────────────────
const CAT_HEADER_H   = 14; // category band
const COL_HEADER_H   = 8;  // "DISH / PRICE" column header
const ITEM_BASE_H    = 12; // item row without description
const DESC_LINE_H    = 3.5; // per line of description
const SECTION_GAP    = 6;  // space between categories

// ─── Helpers ──────────────────────────────────────────────────────────────────
function rgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b] as [number, number, number];
}

function logoToBase64(): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(""); // skip logo if it fails
    img.src = "/logo/ovow-foods-logo.png";
  });
}

// ─── PDF Builder class ────────────────────────────────────────────────────────
class OvowPDF {
  private doc: import("jspdf").jsPDF;
  y = 0;
  private pageH = 297; // A4 height

  constructor(doc: import("jspdf").jsPDF) {
    this.doc = doc;
  }

  // ── color helpers ──────────────────────────────────────────────────────────
  fill(hex: string) { this.doc.setFillColor(...rgb(hex)); }
  stroke(hex: string) { this.doc.setDrawColor(...rgb(hex)); }
  textCol(hex: string) { this.doc.setTextColor(...rgb(hex)); }

  // ── text helpers ──────────────────────────────────────────────────────────
  bold(size: number) { this.doc.setFont("helvetica", "bold"); this.doc.setFontSize(size); }
  normal(size: number) { this.doc.setFont("helvetica", "normal"); this.doc.setFontSize(size); }
  serif(size: number) { this.doc.setFont("times", "bold"); this.doc.setFontSize(size); }

  // ── space remaining on current page ───────────────────────────────────────
  remaining() { return this.pageH - FOOTER_H - this.y; }

  // ── add vertical gap ──────────────────────────────────────────────────────
  addGap(mm: number) { this.y += mm; }

  // ── add a new page with standard header ───────────────────────────────────
  newPage(pageNum: number) {
    this.doc.addPage();
    this.y = 0;
    this.drawPageHeader(pageNum);
  }

  // ── check if we need a page break ─────────────────────────────────────────
  check(needed: number, pageNum: number) {
    if (this.remaining() < needed) {
      this.drawPageFooter(pageNum);
      this.newPage(pageNum + 1);
      return pageNum + 1;
    }
    return pageNum;
  }

  // ══ COVER PAGE ═════════════════════════════════════════════════════════════
  async drawCover(logoB64: string, totalItems: number) {
    const H = this.pageH;

    // Background gradient simulation (two rectangles)
    this.fill(GREEN);
    this.doc.rect(0, 0, W, H, "F");
    this.fill("#123B2A");
    this.doc.rect(W * 0.45, 0, W * 0.55, H, "F");

    // Gold top bar
    this.fill(GOLD);
    this.doc.rect(0, 0, W, TOP_BAR, "F");
    // Gold bottom bar
    this.doc.rect(0, H - TOP_BAR, W, TOP_BAR, "F");

    // Left accent line
    this.fill(GOLD);
    this.doc.rect(MX - 2, 30, 0.7, H - 60, "F");

    // Decorative circle (top-right)
    this.stroke("#C9A24A30");
    this.doc.setLineWidth(0.5);
    this.doc.circle(W - 20, 60, 55, "S");
    this.stroke("#C9A24A18");
    this.doc.circle(W - 20, 60, 40, "S");




    // Logo
    let logoY = 60;
    if (logoB64) {
      try {
        this.doc.addImage(logoB64, "PNG", MX + 4, 58, 28, 28);
        logoY = 90;
      } catch { logoY = 62; }
    }

    // Brand name
    this.textCol(WHITE);
    this.serif(54);
    this.doc.text("OVOW", MX + 4, logoY + 16);
    this.textCol(GOLD);
    this.doc.text("FOODS", MX + 4, logoY + 38);

    // Tagline
    this.textCol(`${WHITE}`);
    this.doc.setTextColor(255, 255, 255, 80);
    this.normal(12);
    this.doc.setTextColor(200, 190, 170);
    this.doc.text("Curated cravings, crafted with love.", MX + 4, logoY + 55);
    this.doc.text("Every dish tells a story.", MX + 4, logoY + 62);

    // Gold divider
    this.fill(GOLD);
    this.doc.rect(MX + 4, logoY + 70, 60, 0.6, "F");

    // Contact grid
    const infoY = logoY + 80;
    this.textCol(GOLD);
    this.bold(7);
    this.doc.text("CALL / WHATSAPP", MX + 4, infoY, { charSpace: 0.8 });
    this.textCol(WHITE);
    this.normal(11);
    this.doc.text(COMPANY_CONFIG.phone, MX + 4, infoY + 6);

    this.textCol(GOLD);
    this.bold(7);
    this.doc.text("DISHES", MX + 4, infoY + 15, { charSpace: 0.8 });
    this.textCol(WHITE);
    this.normal(11);
    this.doc.text(`${totalItems} items · All Pure Vegetarian`, MX + 4, infoY + 21);

    this.textCol(GOLD);
    this.bold(7);
    this.doc.text("ADDRESS", MX + 4, infoY + 30, { charSpace: 0.8 });
    this.textCol(WHITE);
    this.normal(9);
    const addrLines = this.doc.splitTextToSize(COMPANY_CONFIG.address, 100);
    this.doc.text(addrLines, MX + 4, infoY + 36);

    // Bottom URL bar
    this.fill("#00000040");
    this.doc.rect(0, H - 20 - TOP_BAR, W, 20, "F");
    this.textCol(GOLD);
    this.bold(8);
    this.doc.text("ovowfoods.com", W / 2, H - 10, { align: "center", charSpace: 2 });
  }

  // ══ PAGE HEADER (on every menu page) ═══════════════════════════════════════
  drawPageHeader(pageNum: number) {
    // Gold top stripe
    this.fill(GOLD);
    this.doc.rect(0, 0, W, TOP_BAR, "F");

    // Dark green header band
    this.fill(GREEN);
    this.doc.rect(0, TOP_BAR, W, HEADER_H, "F");

    // Brand line
    this.textCol(GOLD);
    this.bold(6);
    this.doc.text("OVOW FOODS  ·  PURE VEGETARIAN", MX, TOP_BAR + 8, { charSpace: 1 });

    // Page number
    this.textCol(GOLD);
    this.bold(7);
    this.doc.text(`${String(pageNum).padStart(2, "0")}`, W - MX, TOP_BAR + 14, { align: "right" });
    this.textCol(GOLD);
    this.normal(5.5);
    this.doc.text("PAGE", W - MX - 8, TOP_BAR + 8, { align: "right", charSpace: 1 });

    this.y = TOP_BAR + HEADER_H + 6;
  }

  // ══ PAGE FOOTER ════════════════════════════════════════════════════════════
  drawPageFooter(pageNum: number) {
    const fy = this.pageH - FOOTER_H;
    this.fill(GREEN);
    this.doc.rect(0, fy, W, FOOTER_H, "F");

    this.textCol(GOLD);
    this.bold(6);
    this.doc.text("OVOW FOODS", MX, fy + 7.5, { charSpace: 1 });

    this.textCol(WHITE);
    this.normal(6);
    this.doc.setTextColor(180, 165, 130);
    this.doc.text(
      `Pure Vegetarian  ·  ${COMPANY_CONFIG.phone}`,
      W / 2, fy + 7.5, { align: "center" }
    );

    this.textCol(GOLD);
    this.bold(6);
    this.doc.text(`${String(pageNum).padStart(2, "0")}`, W - MX, fy + 7.5, { align: "right" });
  }

  // ══ CATEGORY BAND ══════════════════════════════════════════════════════════
  drawCategoryBand(name: string) {
    // Subtle cream bg for category label
    this.fill(CREAM);
    this.doc.rect(MX - 2, this.y - 2, CONTENT_W + 4, CAT_HEADER_H - 2, "F");
    // Left gold accent bar
    this.fill(GOLD);
    this.doc.rect(MX - 2, this.y - 2, 3, CAT_HEADER_H - 2, "F");
    // Category name
    this.textCol(GREEN);
    this.serif(13);
    this.doc.text(name, MX + 5, this.y + 7);
    // Gold underline
    this.fill(GOLD);
    this.doc.rect(MX + 5, this.y + 9.5, CONTENT_W - 7, 0.5, "F");
    this.y += CAT_HEADER_H + 2;
  }

  // ══ COLUMN HEADER ══════════════════════════════════════════════════════════
  drawColHeader() {
    this.textCol(MUTED);
    this.bold(6.5);
    this.doc.text("DISH", MX + 2, this.y + 4, { charSpace: 1.5 });
    this.doc.text("PRICE", W - MX - 2, this.y + 4, { align: "right", charSpace: 1.5 });
    // Thin separator
    this.stroke("#D4C5A0");
    this.doc.setLineWidth(0.2);
    this.doc.line(MX, this.y + 6, W - MX, this.y + 6);
    this.y += COL_HEADER_H;
  }

  // ══ MENU ITEM ROW ══════════════════════════════════════════════════════════
  drawItem(item: Product, index: number) {
    const descLines = item.description
      ? this.doc.splitTextToSize(item.description, CONTENT_W - 30)
      : [];
    const rowH = ITEM_BASE_H + (descLines.length > 0 ? descLines.length * DESC_LINE_H + 1 : 0);

    // Alternating row background
    if (index % 2 === 0) {
      this.fill(CREAM);
      this.doc.rect(MX - 2, this.y - 2, CONTENT_W + 4, rowH + 1, "F");
    }

    // Gold dot
    this.fill(item.available === false ? RED : GOLD);
    this.doc.circle(MX + 2.5, this.y + 3.5, 1.2, "F");

    // Item name
    this.textCol(TEXT);
    this.serif(10);
    const maxNameW = CONTENT_W - 28;
    const nameText = this.doc.splitTextToSize(item.name, maxNameW)[0];
    this.doc.text(nameText, MX + 6, this.y + 5);

    // Badges inline
    let badgeX = MX + 6 + this.doc.getTextWidth(nameText) + 3;
    if (item.signature || item.isSignature) {
      this.fill(GOLD);
      this.doc.roundedRect(badgeX, this.y + 1, 16, 4.5, 0.8, 0.8, "F");
      this.textCol(WHITE);
      this.bold(5);
      this.doc.text("SIGNATURE", badgeX + 8, this.y + 4.5, { align: "center" });
      badgeX += 18;
    }
    if (item.isSwaminarayan) {
      this.fill(GREEN);
      this.doc.roundedRect(badgeX, this.y + 1, 10, 4.5, 0.8, 0.8, "F");
      this.textCol(GOLD);
      this.bold(5);
      this.doc.text("JAIN", badgeX + 5, this.y + 4.5, { align: "center" });
    }
    if (item.isBestseller) {
      this.fill("#1D5A40");
      this.doc.roundedRect(badgeX, this.y + 1, 18, 4.5, 0.8, 0.8, "F");
      this.textCol(GOLD);
      this.bold(5);
      this.doc.text("BESTSELLER", badgeX + 9, this.y + 4.5, { align: "center" });
    }

    // Price — right aligned
    if (item.available === false) {
      this.textCol(RED);
      this.bold(7.5);
      this.doc.text("SOLD OUT", W - MX - 2, this.y + 5, { align: "right" });
    } else {
      this.textCol(GOLD);
      this.bold(7.5);
      this.doc.text("₹", W - MX - 14, this.y + 5);
      this.textCol(TEXT);
      this.serif(12);
      this.doc.text(String(item.price), W - MX - 2, this.y + 5.5, { align: "right" });
    }

    // Description
    if (descLines.length > 0) {
      this.textCol(MUTED);
      this.normal(7.5);
      this.doc.text(descLines, MX + 6, this.y + 9);
    }

    // Serving size
    if (item.servingSize) {
      this.textCol(MUTED);
      this.normal(6.5);
      const svY = this.y + 9 + (descLines.length > 0 ? descLines.length * DESC_LINE_H : 0);
      this.doc.text(`Serving: ${item.servingSize}`, MX + 6, svY);
    }

    // Separator line
    this.stroke("#E0D5BC");
    this.doc.setLineWidth(0.15);
    this.doc.line(MX, this.y + rowH, W - MX, this.y + rowH);

    this.y += rowH + 1;
  }
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function DownloadMenuButton({ products }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const logoB64 = await logoToBase64();

      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pdf = new OvowPDF(doc);

      // ── COVER PAGE ──────────────────────────────────────────────────────────
      await pdf.drawCover(logoB64, products.length);

      // ── GROUP BY CATEGORY ───────────────────────────────────────────────────
      const grouped = products.reduce<Record<string, Product[]>>((acc, p) => {
        const cat = (typeof p.category === "string" ? p.category : p.category?.name) || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(p);
        return acc;
      }, {});

      // ── MENU PAGES — automatic page breaks ─────────────────────────────────
      let pageNum = 2;
      doc.addPage();
      pdf.drawPageHeader(pageNum);

      for (const [category, items] of Object.entries(grouped)) {
        // Check if category band + col header + at least one item fits
        const minNeeded = CAT_HEADER_H + COL_HEADER_H + ITEM_BASE_H + SECTION_GAP;
        pageNum = pdf.check(minNeeded, pageNum);

        pdf.drawCategoryBand(category || "Menu");
        pdf.drawColHeader();

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const safeName = item.name || "Unnamed Item";
          const safeDesc = item.description || "";
          
          const descLines = safeDesc
            ? doc.splitTextToSize(safeDesc, CONTENT_W - 30).length
            : 0;
          
          // Calculate precise height including description and serving size
          let itemH = ITEM_BASE_H;
          if (descLines > 0) itemH += descLines * DESC_LINE_H + 1;
          if (item.servingSize) itemH += DESC_LINE_H;
          itemH += 1; // padding

          pageNum = pdf.check(itemH + FOOTER_H, pageNum);
          pdf.drawItem({ ...item, name: safeName, description: safeDesc }, i);
        }

        // Gap between categories
        pdf.addGap(SECTION_GAP);
      }

      // Draw footer on last page
      pdf.drawPageFooter(pageNum);

      doc.save("OVOW-FOODS-Menu.pdf");
      
    } catch (err) {
      console.error("PDF error:", err);
      alert("Could not generate menu PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      suppressHydrationWarning
      className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#C9A24A] hover:border-[#C9A24A] hover:text-primary transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
    >
      {loading ? (
        <>
          <IconLoader size={14} className="animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <IconDownload size={14} className="group-hover:translate-y-0.5 transition-transform" />
          Download Menu
        </>
      )}
    </button>
  );
}
