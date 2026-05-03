"use client";

/**
 * WSJ-style contextual strip — static sample lines (replace with live quotes later).
 */
const LINES = [
  "A股 · 深度与流动性",
  "港股 · 估值与政策",
  "美债收益率 · 全球定价锚",
  "离岸人民币 · 跨境资本",
  "大宗商品 · 地缘与周期",
];

export function MarketStrip() {
  return (
    <div id="market" className="bg-wsj-navy text-white/95 border-b border-white/10 scroll-mt-[120px]">
      <div className="max-w-7xl mx-auto px-4 py-2 overflow-x-auto">
        <div className="flex items-center gap-6 min-w-max font-ui text-[11px] tracking-wide uppercase">
          <span className="text-wsj-gold font-semibold shrink-0">市场焦点</span>
          {LINES.map((line) => (
            <span
              key={line}
              className="text-white/70 whitespace-nowrap border-l border-white/15 pl-6 first:border-0 first:pl-0"
            >
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
