
// Include this script in your HTML
// 

const pdfUrl = 'Start_coding_v1.pdf'; // Change this to the URL of your PDF
const canvas = document.getElementById('pdfCanvas');
const context = canvas.getContext('2d');

let pdfDoc = null;
let currentPage = 1;

// Load PDF.js and fetch the PDF document
pdfjsLib.getDocument(pdfUrl).promise.then((pdf) => {
  pdfDoc = pdf;
  renderPage(currentPage);
});

// Function to render a specific page
function renderPage(pageNumber) {
  pdfDoc.getPage(pageNumber).then((page) => {
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    page.render(renderContext);
  });
}

// Event listeners for flipping pages
const prevButton = document.getElementById('prevPage');
const nextButton = document.getElementById('nextPage');

prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

nextButton.addEventListener('click', () => {
  if (currentPage < pdfDoc.numPages) {
    currentPage++;
    renderPage(currentPage);
  }
});