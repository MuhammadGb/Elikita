"use client";

export default function useDownloadCSV() {
  const downloadCSV = (tableRef) => {
    const table = tableRef.current;
    let csvContent = "";
    if (!table.row) return;
    for (let row of table.rows) {
      let rowData = [];
      for (let cell of row.cells) {
        rowData.push(cell.textContent);
      }
      csvContent += rowData.join(",") + "\n";
    }

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "table.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return downloadCSV;
}
