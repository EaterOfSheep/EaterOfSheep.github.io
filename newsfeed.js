
    // Provided Spreadsheet ID
    const SPREADSHEET_ID = "2PACX-1vQB52mmeonPezNUiyChzgpyPtelUaZ6CHAxo43TTkkgEtL-esg5FC8sO0XG7m7a-Rxx18fpJTeDjH1C";

    // Replace with the desired sheet name (tab name in the spreadsheet)
    const SHEET_NAME = "Sheet1";

    async function fetchSpreadsheetData() {
//      const url = `https://docs.google.com/spreadsheets/d/e/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

//	const url = `test.csv`;
	    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQB52mmeonPezNUiyChzgpyPtelUaZ6CHAxo43TTkkgEtL-esg5FC8sO0XG7m7a-Rxx18fpJTeDjH1C/pub?gid=0&single=true&output=csv"

	    console.log(url)

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvText = await response.text();
        displaySpreadsheetData(csvText);
      } catch (error) {
        console.error("Error fetching spreadsheet data:", error);
        alert("Could not fetch spreadsheet data. Ensure the spreadsheet is published and accessible.");
      }
    }



	function displayPost(postdata) {
	  const postsDiv = document.getElementById("posts");

	  const post = createPostContainer();
	  const [title, message, url, author, datePosted, category] = postdata.map(cell => cell.trim());

	  appendTitle(post, title);
	  appendMessage(post, message);
	  appendContent(post, url); // Handles either embedding a YouTube video or adding a link
	  appendMetaInfo(post, author, datePosted, category);

	  postsDiv.appendChild(post);
	}

	// Create a styled post container
	function createPostContainer() {
	  const post = document.createElement("div");

		post.className="post";

	  return post;
	}

	// Append the title to the post
	function appendTitle(post, title) {
	  const titleElement = document.createElement("h3");
	  titleElement.textContent = title;
	  titleElement.style.marginBottom = "8px";
	  post.appendChild(titleElement);
	}

	// Append the message to the post
	function appendMessage(post, message) {
	  const messageElement = document.createElement("p");
	  messageElement.textContent = message;
	  messageElement.style.marginBottom = "8px";
	  post.appendChild(messageElement);
	}

	// Append either a YouTube video or a link to the post
	function appendContent(post, url) {
	  if (isYouTubeLink(url)) {
	    const videoId = extractYouTubeVideoId(url);
	    if (videoId) appendYouTubeEmbed(post, videoId);
	  } else {
	    appendReadMoreLink(post, url);
	  }
	}

	// Check if the URL is a YouTube link
	function isYouTubeLink(url) {
	  return url.includes("youtube.com/watch") || url.includes("youtu.be");
	}

	// Extract the YouTube video ID from the URL
	function extractYouTubeVideoId(url) {
	  return url.includes("youtube.com/watch")
	    ? new URL(url).searchParams.get("v")
	    : url.split("/").pop();
	}

	// Append a YouTube video embed to the post
	function appendYouTubeEmbed(post, videoId) {
	  const iframe = document.createElement("iframe");
	  iframe.src = `https://www.youtube.com/embed/${videoId}`;
	  iframe.width = "100%";
	  iframe.height = "315";
	  iframe.style.border = "none";
	  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
	  iframe.allowFullscreen = true;
	  post.appendChild(iframe);
	}

	// Append a "Read more" link to the post
	function appendReadMoreLink(post, url) {
	  const urlElement = document.createElement("a");
	  urlElement.href = url;
	  urlElement.textContent = "Open link";
	  urlElement.style.display = "block";
	  urlElement.style.marginBottom = "8px";
	  urlElement.style.color = "#007BFF";
	  urlElement.style.textDecoration = "none";
	  urlElement.addEventListener("mouseover", () => (urlElement.style.textDecoration = "underline"));
	  urlElement.addEventListener("mouseout", () => (urlElement.style.textDecoration = "none"));
	  post.appendChild(urlElement);
	}

	// Append meta information to the post
	function appendMetaInfo(post, author, datePosted, category) {
	  const metaInfo = document.createElement("div");
	  metaInfo.style.fontSize = "0.9em";
	  metaInfo.style.color = "#666";
	  metaInfo.textContent = `Posted by ${author} on ${datePosted} | Category: ${category}`;
	  post.appendChild(metaInfo);
	}



function displaySpreadsheetData(csvText) {
  // Parse the CSV text into rows and columns
  const rows = parseCSV(csvText);
  const headerRow = rows[0];
  const dataRows = rows.slice(1).reverse();

  // Populate the posts container
  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "";

  dataRows.forEach(row => {
    if (row.length > 1) { // Avoid empty rows
      displayPost(row);
    }
  });
}

function parseCSV(csvText) {
  const rows = [];
  let currentRow = [];
  let currentValue = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {
      // Handle escaped quotes inside a quoted value
      currentValue += '"';
      i++; // Skip the next quote
    } else if (char === '"') {
      // Toggle the insideQuotes state
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      // End of a value
      currentRow.push(currentValue);
      currentValue = '';
    } else if (char === '\n' && !insideQuotes) {
      // End of a row
      currentRow.push(currentValue);
      rows.push(currentRow);
      currentRow = [];
      currentValue = '';
    } else {
      // Append the character to the current value
      currentValue += char;
    }
  }

  // Push the last value and row if necessary
  if (currentValue || currentRow.length > 0) {
    currentRow.push(currentValue);
    rows.push(currentRow);
  }

  return rows;
}


    // Fetch and display the spreadsheet data when the page loads
    fetchSpreadsheetData();
