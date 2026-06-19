/**
 * Safely parses a date input and formats it as "19 Jun 2026".
 * Handles legacy records gracefully. If date is missing or invalid, it falls back to today's date.
 * Never throws "Invalid Date".
 * 
 * @param {string|Date} dateInput 
 * @returns {string} Formatted date string
 */
export const formatDate = (dateInput) => {
  let d;
  if (!dateInput) {
    d = new Date();
  } else {
    d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      d = new Date(); // Fallback for "Invalid Date"
    }
  }

  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};
