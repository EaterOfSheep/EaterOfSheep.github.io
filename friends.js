    async function fetchFriendsSpreadsheetData() {

//	const url = `testfriends.csv`;
	const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vS06JCuRIuw20HxT_UFSvdvdzTPqBUoGj575IkqIkqvBlbIttgwsi80EP2Got61Qvaa4ze2q5alcY-G/pub?gid=0&single=true&output=csv`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvText = await response.text();
        displayFriendsSpreadsheetData(csvText);
      } catch (error) {
        console.error("Error fetching spreadsheet data:", error);
        alert("Could not fetch spreadsheet data. Ensure the spreadsheet is published and accessible.");
      }
    }



	function displayFriend(friendData) {
	  const friendsDiv = document.getElementById("friends");

	  const [title, url] = friendData.map(cell => cell.trim());

	  friend = document.createElement("a");
	  friend.textContent = title;
	  friend.href = url;
	friend.className = "navfriend"

	  friendsDiv.appendChild(friend);
	}







function displayFriendsSpreadsheetData(csvText) {
  const rows = csvText.split("\n").map(row => row.split(","));
  const headerRow = rows[0];
  const dataRows = rows.slice(1);

  // Populate the friends container
  const friendsDiv = document.getElementById("friends");
  friendsDiv.innerHTML = "";

  dataRows.forEach(row => {
    if (row.length > 1) { // Avoid empty rows
	    displayFriend(row)
    }
  });
}

    // Fetch and display the spreadsheet data when the page loads
    fetchFriendsSpreadsheetData();
