export function formatDate(dateString) {
    const date = new Date(dateString);
  
    // Get the day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    const year = date.getFullYear();
  
    // Add suffix for the day (st, nd, rd, th)
    const getDaySuffix = (day) => {
      if (day % 10 === 1 && day !== 11) return 'st';
      if (day % 10 === 2 && day !== 12) return 'nd';
      if (day % 10 === 3 && day !== 13) return 'rd';
      return 'th';
    };
  
    const dayWithSuffix = `${day}${getDaySuffix(day)}`;
  
    // Return the formatted string
    return `${dayWithSuffix} ${month}, ${year}`;
  }
  