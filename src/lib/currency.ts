// Currency formatting utilities for Indian rupees

export const formatIndianCurrency = (amount: number): string => {
  // Convert decimal to whole rupees (multiply by 100 if needed)
  const wholeAmount = Math.round(amount);
  
  // Format with Indian numbering system
  return wholeAmount.toLocaleString('en-IN');
};

export const parsePrice = (price: number): number => {
  // Ensure price is in proper rupee format (whole numbers)
  return Math.round(price);
};