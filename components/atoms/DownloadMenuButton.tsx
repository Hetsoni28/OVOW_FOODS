"use client";

import { useState } from "react";
import { IconDownload, IconLoader } from "@/components/atoms/Icons";
import type { Product } from "@/types";
import { COMPANY_CONFIG } from "@/lib/config";

interface Props { products: Product[] }

// ─── Brand colors ─────────────────────────────────────────────────────────────
const GREEN  = "#0B2118";
const GOLD   = "#C9A24A";
const CREAM  = "#F9F6F0";
const WHITE  = "#FFFFFF";
const TEXT   = "#1a1208";
const RED    = "#DC2626";

// ─── Page geometry (A4 in mm) ─────────────────────────────────────────────────
const W = 210;          // page width
const MX = 16;          // horizontal margin
const CONTENT_W = W - MX * 2; // 178
const FOOTER_H = 15;    // footer height reserved at bottom

// ─── Grid geometry ────────────────────────────────────────────────────────────
const COL_GAP = 10;
const COL_W = (CONTENT_W - COL_GAP) / 2; // 84
const IMG_W = COL_W;
const IMG_H = 56; // 3:2 aspect ratio
const CARD_TEXT_H = 34; // space below image for text
const ITEM_H = IMG_H + CARD_TEXT_H + 8; // total height per item = 98
const DESC_LINE_H = 3.5;

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
    img.onerror = () => resolve("");
    img.src = "/logo/ovow-foods-logo.png";
  });
}

// ─── Video Frame Extractor ────────────────────────────────────────────────────
async function extractVideoFrame(url: string): Promise<string> {
  if (!url) return "";
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.setAttribute("crossOrigin", "anonymous");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    
    const timeout = setTimeout(() => resolve(""), 10000);

    video.onloadedmetadata = () => {
      // Seek to the middle of the video to skip intro B-roll and show the actual food
      video.currentTime = video.duration && video.duration > 2 ? video.duration / 2 : 1;
    };
    
    video.onseeked = () => {
      clearTimeout(timeout);
      try {
        const canvas = document.createElement("canvas");
        // 3:2 aspect ratio (landscape) to fit beautifully in the grid
        canvas.width = 400;
        canvas.height = 266;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#F9F6F0";
          ctx.fillRect(0, 0, 400, 266);

          const vw = video.videoWidth || 640;
          const vh = video.videoHeight || 360;
          
          // "Cover" logic to fill the 400x266 canvas completely without letterboxes
          const scale = Math.max(400 / vw, 266 / vh);
          const drawW = vw * scale;
          const drawH = vh * scale;
          const drawX = (400 - drawW) / 2;
          const drawY = (266 - drawH) / 2;

          ctx.drawImage(video, drawX, drawY, drawW, drawH);
          resolve(canvas.toDataURL("image/jpeg", 0.8));
        } else {
          resolve("");
        }
      } catch (e) {
        console.error("Canvas draw error", e);
        resolve("");
      }
    };
    
    video.onerror = (e) => {
      clearTimeout(timeout);
      console.error("Video load error", e);
      resolve("");
    };
    
    video.src = url;
    video.load();
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

  fill(hex: string) { this.doc.setFillColor(...rgb(hex)); }
  stroke(hex: string) { this.doc.setDrawColor(...rgb(hex)); }
  textCol(hex: string) { this.doc.setTextColor(...rgb(hex)); }

  bold(size: number) { this.doc.setFont("helvetica", "bold"); this.doc.setFontSize(size); }
  normal(size: number) { this.doc.setFont("helvetica", "normal"); this.doc.setFontSize(size); }
  serif(size: number) { this.doc.setFont("times", "bold"); this.doc.setFontSize(size); }

  remaining() { return this.pageH - FOOTER_H - this.y; }

  newPage(pageNum: number, logoB64: string) {
    this.doc.addPage();
    this.fill(CREAM);
    this.doc.rect(0, 0, W, this.pageH, "F");
    this.y = 0;
    this.drawPageHeader(pageNum, logoB64);
  }

  check(needed: number, pageNum: number, logoB64: string) {
    if (this.remaining() < needed) {
      this.drawPageFooter(pageNum);
      this.newPage(pageNum + 1, logoB64);
      return pageNum + 1;
    }
    return pageNum;
  }

  // ══ COVER PAGE ═════════════════════════════════════════════════════════════
  async drawCover(logoB64: string, totalItems: number) {
    const H = this.pageH;

    this.fill(CREAM);
    this.doc.rect(0, 0, W, H, "F");

    let logoY = 90;
    if (logoB64) {
      try {
        this.doc.addImage(logoB64, "PNG", W/2 - 20, 60, 40, 40);
        logoY = 110;
      } catch {}
    }

    this.textCol(GREEN);
    this.serif(34);
    this.doc.text("MASTER INVENTORY", W/2, logoY + 20, { align: "center" });
    
    this.textCol(GOLD);
    this.bold(9);
    const subText = "OVOW FOODS · PURE VEGETARIAN";
    const subW = this.doc.getTextWidth(subText) + (subText.length - 1) * 2;
    this.doc.text(subText, (W - subW) / 2, logoY + 32, { charSpace: 2 });

    this.stroke(GOLD);
    this.doc.setLineWidth(0.5);
    this.doc.line(W/2 - 30, logoY + 45, W/2 + 30, logoY + 45);

    this.textCol(TEXT);
    this.normal(10);
    this.doc.text(`Call / WhatsApp: ${COMPANY_CONFIG.phone}`, W/2, logoY + 60, { align: "center" });
    this.doc.text(COMPANY_CONFIG.email || "hello@ovowfoods.com", W/2, logoY + 66, { align: "center" });
  }

  // ══ PAGE HEADER ════════════════════════════════════════════════════════════
  drawPageHeader(pageNum: number, logoB64: string) {
    this.y = 15;
    
    this.textCol(TEXT);
    this.bold(8);
    this.doc.text("MASTER INVENTORY", MX, this.y + 4, { charSpace: 1.5 });
    
    if (logoB64) {
      try {
        // Logo size 10x10, right aligned with the margin
        this.doc.addImage(logoB64, "PNG", W - MX - 10, this.y - 4, 10, 10);
      } catch (e) {}
    } else {
      const rightText = "OVOW FOODS";
      const rightW = this.doc.getTextWidth(rightText) + (rightText.length - 1) * 1.5;
      this.doc.text(rightText, W - MX - rightW, this.y + 4, { charSpace: 1.5 });
    }

    this.y += 8;
    this.stroke(GOLD);
    this.doc.setLineWidth(0.4);
    this.doc.line(MX, this.y, W - MX, this.y);

    this.y += 10;
  }

  // ══ PAGE FOOTER ════════════════════════════════════════════════════════════
  drawPageFooter(pageNum: number) {
    const fy = this.pageH - 15;
    
    this.stroke("#E0D5BC");
    this.doc.setLineWidth(0.2);
    this.doc.line(MX, fy, W - MX, fy);

    this.textCol(TEXT);
    this.normal(7);
    this.doc.text(`WhatsApp: ${COMPANY_CONFIG.phone}`, MX, fy + 5);
    this.doc.text("ovowfoods.com", W - MX, fy + 5, { align: "right" });
    this.doc.text(`${pageNum}`, W / 2, fy + 5, { align: "center" });
  }

  // ══ CATEGORY HEADER ════════════════════════════════════════════════════════
  drawCategoryHeader(category: string) {
    this.y += 5;
    this.textCol(GREEN);
    this.serif(18);
    const catText = category.toUpperCase();
    const catW = this.doc.getTextWidth(catText) + (catText.length - 1) * 1;
    this.doc.text(catText, (W - catW) / 2, this.y, { charSpace: 1 });
    
    this.stroke(GOLD);
    this.doc.setLineWidth(0.5);
    this.doc.line(W / 2 - 15, this.y + 4, W / 2 + 15, this.y + 4);

    this.y += 15;
  }

  // ══ DRAW ITEM CARD ═════════════════════════════════════════════════════════
  drawItem(item: Product, imgB64: string, colIndex: number) {
    const x = MX + colIndex * (COL_W + COL_GAP);
    const startY = this.y;

    if (imgB64) {
      try {
        this.doc.addImage(imgB64, "JPEG", x, startY, IMG_W, IMG_H);
      } catch (e) {}
    }

    // Category name (small gold caps)
    const catName = (typeof item.category === "string" ? item.category : item.category?.name) || "OTHER";
    this.textCol(GOLD);
    this.bold(6);
    this.doc.text(catName.toUpperCase(), x, startY + IMG_H + 5, { charSpace: 1 });

    // Product name (dark serif)
    this.textCol(TEXT);
    this.serif(11);
    const safeName = item.name || "Unnamed Item";
    const nameLines = this.doc.splitTextToSize(safeName, COL_W - 15); // leave room for price
    this.doc.text(nameLines[0], x, startY + IMG_H + 11);

    // Price
    if (item.available === false) {
      this.textCol(RED);
      this.bold(8);
      this.doc.text("SOLD OUT", x + COL_W, startY + IMG_H + 11, { align: "right" });
    } else {
      this.textCol(TEXT);
      this.serif(11);
      // jsPDF base fonts do not support the ₹ symbol natively, so we use 'Rs.'
      this.doc.text(`Rs. ${item.price}`, x + COL_W, startY + IMG_H + 11, { align: "right" });
    }

    // Description
    const safeDesc = item.description || "";
    const descLines = safeDesc ? this.doc.splitTextToSize(safeDesc, COL_W) : [];
    if (descLines.length > 0) {
      this.textCol("#8B7355"); // MUTED
      this.normal(7);
      // Only draw up to 3 lines of description to prevent layout breaking
      this.doc.text(descLines.slice(0, 3), x, startY + IMG_H + 16);
    }

    // Serving size
    if (item.servingSize) {
      this.textCol("#8B7355");
      this.normal(6.5);
      const descH = Math.min(descLines.length, 3) * DESC_LINE_H;
      this.doc.text(`Serving: ${item.servingSize}`, x, startY + IMG_H + 16 + descH);
    }
  }
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function DownloadMenuButton({ products }: Props) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Generating PDF...");

  const handleDownload = async () => {
    setLoading(true);
    setLoadingText("Initializing PDF...");
    
    try {
      const { jsPDF } = await import("jspdf");
      
      const productImages: Record<string, string> = {};
      let count = 0;
      
      for (const p of products) {
        count++;
        setLoadingText(`Processing images (${count}/${products.length})...`);
        const videoUrl = p.video?.asset?.url || p.previewVideo;
        if (videoUrl) {
          const imgB64 = await extractVideoFrame(videoUrl);
          productImages[p._id!] = imgB64;
        }
      }

      setLoadingText("Building Catalog...");
      const logoB64 = await logoToBase64();

      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pdf = new OvowPDF(doc);

      // COVER PAGE
      await pdf.drawCover(logoB64, products.length);

      // CATALOG PAGES
      let pageNum = 2;
      pdf.newPage(pageNum, logoB64);

      // GROUP BY CATEGORY
      const grouped = products.reduce<Record<string, Product[]>>((acc, p) => {
        const cat = (typeof p.category === "string" ? p.category : p.category?.name) || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(p);
        return acc;
      }, {});

      // Custom Sort Order
      const getCategoryWeight = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes("subji") || lower.includes("sabji")) return 1;
        if (lower.includes("biryani")) return 2;
        if (lower.includes("dal")) return 3;
        if (lower.includes("roti") || lower.includes("bread")) return 4;
        if (lower.includes("dessert") || lower.includes("sweet")) return 5;
        if (lower.includes("side") || lower.includes("said") || lower.includes("iatam") || lower.includes("raita")) return 6;
        return 99;
      };

      const sortedCategories = Object.entries(grouped).sort((a, b) => {
        return getCategoryWeight(a[0]) - getCategoryWeight(b[0]);
      });

      for (const [category, items] of sortedCategories) {
        // Need space for header + at least one item
        pageNum = pdf.check(25 + ITEM_H, pageNum, logoB64);
        
        pdf.drawCategoryHeader(category);

        let colIndex = 0;
        for (let i = 0; i < items.length; i++) {
          const item = items[i];

          if (colIndex === 0) {
            pageNum = pdf.check(ITEM_H, pageNum, logoB64);
          }

          pdf.drawItem(item, productImages[item._id!] || "", colIndex);

          colIndex++;
          if (colIndex === 2) {
            colIndex = 0;
            pdf.y += ITEM_H;
          }
        }

        // If row is half-full, advance Y so next category starts on a new line
        if (colIndex === 1) {
          pdf.y += ITEM_H;
        }

        // Add gap before next category
        pdf.y += 10;
      }

      pdf.drawPageFooter(pageNum);

      setLoadingText("Saving file...");
      doc.save("OVOW-FOODS-Catalog.pdf");
      
    } catch (err) {
      console.error("PDF error:", err);
      alert("Could not generate catalog PDF. Please try again.");
    } finally {
      setLoading(false);
      setLoadingText("Generating PDF...");
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      suppressHydrationWarning
      className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#C9A24A] hover:border-[#C9A24A] hover:text-[#0B2118] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
    >
      {loading ? (
        <>
          <IconLoader size={14} className="animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          <IconDownload size={14} className="group-hover:translate-y-0.5 transition-transform" />
          Download Catalog
        </>
      )}
    </button>
  );
}
