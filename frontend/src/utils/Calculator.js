const SizeCalculator = (minAmt, maxAmt, amt) => {
  const minSize = 50;
  const maxSize = 300;
  const m = (maxSize - minSize) / (maxAmt - minAmt);
  const y = m * amt + minSize;
  return y;
};

const SpanCalculator = (minAmt, maxAmt, amt) => {
  let minSpan = 0.5;
  let maxSpan = 7;
  let m = (maxSpan - minSpan) / (maxAmt - minAmt);
  let y = m * amt + minSpan;
};

export { SizeCalculator, SpanCalculator };
