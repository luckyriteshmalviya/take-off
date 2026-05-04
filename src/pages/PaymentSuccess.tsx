import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, PartyPopper, Camera, Copy, Check, Download, CalendarDays } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import logoImg from "@/assets/logo.png";

import { useToast } from "@/hooks/use-toast";
import { getDayTypeFromString } from "@/lib/pricing";

/** Format "YYYY-MM-DD" into a human-friendly string, e.g. "Sun, 23 Feb 2026" */
const formatVisitDate = (dateStr: string | null): string => {
  if (!dateStr) return "";
  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const paymentId = searchParams.get("payment_id");
  const amount = searchParams.get("amount");
  const customerName = searchParams.get("name");
  const persons = searchParams.get("persons");
  const visitDate = searchParams.get("date");
  const pricePerPerson = searchParams.get("price_per_person");
  const discountAmount = searchParams.get("discount");
  const appliedCoupon = searchParams.get("coupon");

  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);


  const transactionDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedVisitDate = formatVisitDate(visitDate);
  const dayType = visitDate ? getDayTypeFromString(visitDate) : "Weekday";
  const isSpecial = pricePerPerson === "1000";

  const copyPaymentId = () => {
    if (paymentId) {
      navigator.clipboard.writeText(paymentId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  /** Fallback: instantly downloads a self-contained HTML receipt — no flash, no dialog. */
  const downloadHtmlFallback = () => {
    const dlDayType = visitDate ? getDayTypeFromString(visitDate) : "Weekday";
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<title>Take-off Receipt</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',Arial,sans-serif;background:#f9fafb;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:32px 16px}
  .t{background:#fff;border:2px solid #111;border-radius:16px;max-width:580px;width:100%;padding:32px;position:relative}
  .bar{position:absolute;top:0;left:0;width:100%;height:10px;background:#111;border-radius:14px 14px 0 0}
  .hdr{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #e5e7eb;padding-bottom:18px;margin-bottom:20px;margin-top:8px}
  .brand{display:flex;align-items:center;gap:10px}
  .bn{font-size:26px;font-weight:900;color:#111;line-height:1}
  .bs{font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:.2em;text-transform:uppercase}
  .badge{background:#111;color:#fff;padding:5px 14px;border-radius:99px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;display:inline-block;margin-bottom:6px}
  .iss{font-size:11px;color:#9ca3af}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
  .lbl{font-size:9px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:.15em;margin-bottom:4px}
  .val{font-size:17px;font-weight:700;color:#111}
  .sub{font-size:10px;color:#6b7280;margin-top:2px;font-weight:600}
  .box{background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px}
  .row{display:flex;justify-content:space-between;align-items:center}
  .paid{background:#dcfce7;color:#166534;padding:2px 10px;border-radius:99px;font-size:10px;font-weight:800}
  .tot{font-size:22px;font-weight:900;color:#111}
  .pid{background:#111;color:#fff;border-radius:12px;padding:18px;text-align:center;margin-bottom:20px}
  .plbl{font-size:10px;color:#9ca3af;letter-spacing:.2em;text-transform:uppercase;margin-bottom:6px}
  .pval{font-family:'Courier New',monospace;font-size:18px;font-weight:700;word-break:break-all}
  .ftr{display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid #e5e7eb}
  .fnotes{font-size:10px;color:#6b7280;line-height:1.8}
  .floc{font-weight:700;color:#111}
  .auth{text-align:center;width:110px;border-top:1px solid #111;padding-top:6px}
  .atxt{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#111}
</style></head><body>
<div class="t"><div class="bar"></div>
<div class="hdr">
  <div class="brand"><img src="${logoImg}" alt="Take-off Logo" style="width:40px;height:40px;object-fit:contain;border-radius:8px;" crossorigin="anonymous"/><div><div class="bn">Take-off</div><div class="bs">Trampoline Park</div></div></div>
  <div style="text-align:right"><div class="badge">Entry Pass</div><div class="iss">Issued: ${transactionDate}</div></div>
</div>
<div class="grid">
  <div>
    <div style="margin-bottom:14px"><div class="lbl">Name</div><div class="val">${customerName ?? "Customer"}</div></div>
    <div style="margin-bottom:14px"><div class="lbl">No. of Passes</div><div class="val" style="font-size:26px">${persons ?? "1"}</div></div>
    ${formattedVisitDate ? `<div><div class="lbl">Visit Date</div><div class="val" style="font-size:14px">${formattedVisitDate}</div><div class="sub">${dlDayType} · ₹${pricePerPerson ?? "800"}/person</div></div>` : ""}
  </div>
  <div class="box">
    <div class="row"><span class="lbl">Status</span><span class="paid">PAID</span></div>
    <div class="row"><span class="lbl">Base Amount</span><span style="font-size:11px;font-weight:700;color:#111">₹${(Number(persons || 1) * Number(pricePerPerson || 800))}</span></div>
    ${discountAmount ? `<div class="row"><span class="lbl">Discount ${appliedCoupon ? `(${appliedCoupon})` : ''}</span><span style="font-size:11px;font-weight:700;color:#166534">-₹${discountAmount}</span></div>` : ""}
    <div style="border-top:1px solid #e5e7eb;margin-top:4px;padding-top:8px;" class="row"><span class="lbl">Total Paid</span><span class="tot">₹${amount ?? "0"}</span></div>
  </div>
</div>
<div class="pid"><div class="plbl">Booking Reference (Payment ID)</div><div class="pval">${paymentId ?? "N/A"}</div></div>
<div class="ftr">
  <div class="fnotes"><span class="floc">Misrod, Bhopal (MP)</span><br/>• Grip socks mandatory<br/>• Arrive 15 mins early<br/>• Sign waiver at reception</div>
  <div class="auth"><div class="atxt">Authorized</div></div>
</div></div></body></html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TakeOff-Receipt-${paymentId ?? "receipt"}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "✅ Receipt Downloaded!",
      description: "Open the file in any browser to view or share.",
    });
  };

  /** Downloads a PDF via jsPDF + html2canvas.
   *  Creates a temporary off-screen DOM node (outside React) to avoid any flash. */
  const handleDownload = async () => {
    setDownloading(true);
    const pdfDayType = visitDate ? getDayTypeFromString(visitDate) : "Weekday";

    try {
      let html2canvasMod: typeof import("html2canvas") | null = null;
      let jsPDFMod: typeof import("jspdf") | null = null;
      try {
        [html2canvasMod, jsPDFMod] = await Promise.all([
          import("html2canvas"),
          import("jspdf"),
        ]);
      } catch {
        downloadHtmlFallback();
        return;
      }

      const html2canvas = html2canvasMod.default;
      const { jsPDF } = jsPDFMod;

      // Build the receipt as a fully inline-styled HTML string
      const inner = `
        <div style="font-family:'Segoe UI',Arial,sans-serif;background:#f9fafb;padding:40px 32px;width:794px;">
          <div style="background:#fff;border:2px solid #111;border-radius:16px;padding:32px;position:relative;overflow:hidden;">
            <div style="position:absolute;top:0;left:0;width:100%;height:10px;background:#111;border-radius:14px 14px 0 0;"></div>
            <div style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #e5e7eb;padding-bottom:18px;margin-bottom:20px;margin-top:8px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <img src="${logoImg}" alt="Take-off Logo" style="width:40px;height:40px;object-fit:contain;border-radius:8px;" crossorigin="anonymous" />
                <div>
                  <div style="font-size:26px;font-weight:900;color:#111;line-height:1;">Take-off</div>
                  <div style="font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:.2em;text-transform:uppercase;">Trampoline Park</div>
                </div>
              </div>
              <div style="text-align:right;">
                <div style="background:#111;color:#fff;padding:5px 14px;border-radius:99px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;display:inline-block;margin-bottom:6px;">Entry Pass</div>
                <div style="font-size:11px;color:#9ca3af;">Issued: ${transactionDate}</div>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">
              <div>
                <div style="margin-bottom:14px;">
                  <div style="font-size:9px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:.15em;margin-bottom:4px;">Name</div>
                  <div style="font-size:17px;font-weight:700;color:#111;">${customerName ?? "Customer"}</div>
                </div>
                <div style="margin-bottom:14px;">
                  <div style="font-size:9px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:.15em;margin-bottom:4px;">No. of Passes</div>
                  <div style="font-size:26px;font-weight:700;color:#111;">${persons ?? "1"}</div>
                </div>
                ${formattedVisitDate ? `
                <div>
                  <div style="font-size:9px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:.15em;margin-bottom:4px;">Visit Date</div>
                  <div style="font-size:14px;font-weight:700;color:#111;">${formattedVisitDate}</div>
                  <div style="font-size:10px;color:#6b7280;margin-top:2px;font-weight:600;">${pdfDayType} &middot; &#8377;${pricePerPerson ?? "800"}/person</div>
                </div>` : ""}
              </div>
              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:10px;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-size:9px;color:#9ca3af;font-weight:700;text-transform:uppercase;">Status</span>
                  <span style="background:#dcfce7;color:#166534;padding:2px 10px;border-radius:99px;font-size:10px;font-weight:800;">PAID</span>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #e5e7eb;padding-top:8px;">
                  <span style="font-size:9px;color:#9ca3af;font-weight:700;text-transform:uppercase;">Base Amount</span>
                  <span style="font-size:11px;font-weight:700;color:#111;">&#8377;${(Number(persons || 1) * Number(pricePerPerson || 800))}</span>
                </div>
                ${discountAmount ? `
                <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #e5e7eb;padding-top:8px;">
                  <span style="font-size:9px;color:#166534;font-weight:700;text-transform:uppercase;">Discount ${appliedCoupon ? `(${appliedCoupon})` : ''}</span>
                  <span style="font-size:11px;font-weight:700;color:#166534;">-&#8377;${discountAmount}</span>
                </div>` : ''}
                <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #e5e7eb;padding-top:8px;">
                  <span style="font-size:9px;color:#9ca3af;font-weight:700;text-transform:uppercase;">Total Paid</span>
                  <span style="font-size:22px;font-weight:900;color:#111;">&#8377;${amount ?? "0"}</span>
                </div>
              </div>
            </div>
            <div style="background:#111;color:#fff;border-radius:12px;padding:18px;text-align:center;margin-bottom:20px;">
              <div style="font-size:10px;color:#9ca3af;letter-spacing:.2em;text-transform:uppercase;margin-bottom:6px;">Booking Reference (Payment ID)</div>
              <div style="font-family:'Courier New',monospace;font-size:18px;font-weight:700;word-break:break-all;">${paymentId ?? "N/A"}</div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid #e5e7eb;">
              <div style="font-size:10px;color:#6b7280;line-height:1.8;">
                <span style="font-weight:700;color:#111;">Misrod, Bhopal (MP)</span><br/>
                &bull; Grip socks mandatory<br/>&bull; Arrive 15 mins early<br/>&bull; Sign waiver at reception
              </div>
              <div style="text-align:center;width:110px;border-top:1px solid #111;padding-top:6px;">
                <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#111;">Authorized</div>
              </div>
            </div>
          </div>
        </div>`;

      // Create an off-screen wrapper. It must be FULLY VISIBLE (no opacity,
      // no visibility:hidden) because html2canvas faithfully captures CSS
      // visibility — hidden or transparent content renders blank.
      // position:absolute + left:-9999px keeps it invisible to the user.
      const wrapper = document.createElement("div");
      wrapper.style.cssText =
        "position:absolute;left:-9999px;top:0;width:794px;height:auto;" +
        "overflow:visible;pointer-events:none;z-index:-1;";
      wrapper.innerHTML = inner;
      document.body.appendChild(wrapper);

      // Target the actual receipt div (first child) for a cleaner capture
      const receiptEl = wrapper.firstElementChild as HTMLElement;

      // Give the browser enough time to paint the injected content
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setTimeout(resolve, 200));
        });
      });

      const canvas = await html2canvas(receiptEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#f9fafb",
        logging: false,
        width: 794,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
      });

      document.body.removeChild(wrapper);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const imgH = pdfW * (canvas.height / canvas.width);
      pdf.addImage(imgData, "PNG", 0, 0, pdfW, imgH <= pdfH ? imgH : pdfH);
      pdf.save(`TakeOff-Receipt-${paymentId ?? "receipt"}.pdf`);

      toast({
        title: "✅ Receipt Downloaded!",
        description: "Your PDF receipt has been saved to your device.",
      });
    } catch (err) {
      console.error("PDF download error:", err);
      downloadHtmlFallback();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      {/* --- Screen UI --- */}
      <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-b from-green-50 via-background to-background dark:from-green-950/20 dark:via-background dark:to-background px-4 py-4 print:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md w-full text-center space-y-3"
        >
          {/* Success Icon */}
          <div className="relative inline-flex">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/25"
            >
              <CheckCircle size={34} className="text-white" strokeWidth={2.5} />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, delay: 0.5 }}
            >
              <PartyPopper size={22} className="absolute -top-2 -right-2 text-yellow-500" />
            </motion.div>
          </div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-1"
          >
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
              Booking{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                Confirmed!
              </span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Thank you {customerName ? `, ${customerName}` : "for booking"}! 🎉
            </p>
          </motion.div>

          {/* Visit Date Banner */}
          {formattedVisitDate && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-semibold text-sm ${
                isSpecial
                  ? "bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400"
                  : "bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-400"
              }`}
            >
              <CalendarDays size={16} className="shrink-0" />
              <span>Visit: {formattedVisitDate}</span>
              {isSpecial && <span className="text-[11px] font-normal opacity-80">({dayType})</span>}
            </motion.div>
          )}

          {/* Payment ID Card */}
          {paymentId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 border-2 border-green-500/20 rounded-2xl p-4 space-y-2"
            >
              <p className="text-sm font-medium text-foreground">Your Payment ID</p>
              <div className="flex items-center justify-center gap-2 bg-background/60 rounded-xl px-3 py-2.5">
                <span className="font-mono text-sm sm:text-base font-bold text-foreground break-all select-all">
                  {paymentId}
                </span>
                <button
                  onClick={copyPaymentId}
                  className="shrink-0 p-1.5 rounded-lg hover:bg-muted transition-colors"
                  title="Copy Payment ID"
                >
                  {copied ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} className="text-muted-foreground" />
                  )}
                </button>
              </div>

              {amount && persons && (
                <div className="flex flex-col gap-1 text-xs text-foreground mt-2 px-2 pb-1 bg-background/50 rounded-lg p-2 border border-border/50">
                  <div className="flex justify-between items-center">
                    <span>Passes: <strong>{persons}</strong></span>
                    {pricePerPerson && (
                      <span>
                        ₹{pricePerPerson}/person
                        {isSpecial && <span className="ml-1 text-orange-500">({dayType})</span>}
                      </span>
                    )}
                    <span>Base: <strong>₹{(Number(persons || 1) * Number(pricePerPerson || 800))}</strong></span>
                  </div>
                  {discountAmount && Number(discountAmount) > 0 && (
                    <div className="flex justify-between items-center text-green-600 dark:text-green-500 font-medium">
                      <span>Discount {appliedCoupon ? `(${appliedCoupon})` : ''}</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-1 border-t border-border mt-1">
                    <span className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Total Paid</span>
                    <span className="font-bold text-sm">₹{amount}</span>
                  </div>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Show this ID at reception when you arrive.
              </p>
            </motion.div>
          )}

          {/* Screenshot Reminder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2.5 text-left"
          >
            <Camera size={18} className="text-amber-500 shrink-0" />
            <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 font-medium leading-tight">
              Please download your receipt or take a screenshot of this page for your reference!
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            <Button
              size="lg"
              onClick={handleDownload}
              disabled={downloading}
              variant="outline"
              className="flex-1 text-sm sm:text-base px-6 py-5 rounded-xl border-primary text-primary hover:bg-primary/5 bg-transparent disabled:opacity-60 disabled:text-primary disabled:border-primary disabled:bg-transparent"
            >
              <Download className="mr-2" size={18} />
              {downloading ? "Generating PDF..." : "Download Receipt"}
            </Button>
            <Button
              size="lg"
              onClick={() => navigate("/")}
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all duration-300 text-sm sm:text-base px-6 py-5 rounded-xl text-white"
            >
              <ArrowLeft className="mr-2" size={18} />
              Back to Home
            </Button>
          </motion.div>
        </motion.div>
      </div>

    </>
  );
};

export default PaymentSuccess;
