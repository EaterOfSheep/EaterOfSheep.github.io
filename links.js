    async function fetchLinksSpreadsheetData() {

	const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQt4U-h3vpNfqvRccssnMLZUmJ25FJ7mQEaxGgb-xLBMQ4wUzxghDVGs-Kza0_3945gyg5Z-lfkEZrQ/pub?gid=0&single=true&output=csv`;


      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvText = await response.text();
        displayLinksSpreadsheetData(csvText);
      } catch (error) {
        console.error("Error fetching spreadsheet data:", error);
        alert("Could not fetch spreadsheet data. Ensure the spreadsheet is published and accessible.");
      }
    }



	function displayLink(linkData) {
	  const linksDiv = document.getElementById("links");

	  const [title, url] = linkData.map(cell => cell.trim());

	  link = document.createElement("a");
	  link.textContent = title;
	  link.href = url;
	link.className = "navlink"

	  linksDiv.appendChild(link);
	}







function displayLinksSpreadsheetData(csvText) {
  const rows = csvText.split("\n").map(row => row.split(","));
  const headerRow = rows[0];
  const dataRows = rows.slice(1);

  // Populate the links container
  const linksDiv = document.getElementById("links");
  linksDiv.innerHTML = "";

  dataRows.forEach(row => {
    if (row.length > 1) { // Avoid empty rows
	    displayLink(row)
    }
  });
}

    // Fetch and display the spreadsheet data when the page loads
    fetchLinksSpreadsheetData();
