export const fillMissingDates = async (data, day=60) => {
    // Create a map to store data by date
    const dataMap = new Map();
    await data.forEach(entry => {
      const date = new Date(Date.UTC(`${entry._id.year}`,`${entry._id.month - 1}`,`${entry._id.day}`));
      console.log(date,`${entry._id.year}`,`${entry._id.month }`,`${entry._id.day}`);
      // const date = entry._id.date
      const dateStr = date.toISOString().split('T')[0].trim();

      // console.log(dateStr);
      dataMap.set(dateStr.trim(), {total: entry.total, totalOrders:entry.totalOrders});
      // console.log(dateStr, entry.total);
    });
  
    // Fill in missing dates with total = 0
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - Number(day));
    const filledData = [];
    for (let date = startDate; date <= endDate; date.setDate(date.getDate()+1)) {
      const dateStr = date.toISOString().split('T')[0].trim();
      // console.log(dateStr);
      
      const value = await dataMap.get(dateStr) || {total: 0, totalOrders:0};
      // console.log(dateStr, dataMap.get(dateStr));
      filledData.push({ date: dateStr, value });
    }
  
    return filledData;
  };
