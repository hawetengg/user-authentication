export const formatDateToCustomString = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return `${monthNames[monthIndex]} ${day} ${year}`;
  };
