const accesskey = '_cl9FmOvGG95sj72YGB0903-bgftkxed8JBbR_n3uUE';

const searchform = document.getElementById('search-form');
const searchbox = document.getElementById('search-box');
const searchresults = document.getElementById('search-results');
const showmorebtn = document.getElementById('show-more');

let keyword = '';
let page = 1;

async function searchImages() {
    keyword = searchbox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchresults.innerHTML = ''; // Clear previous results on new search
    }

    const results = data.results;
    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.style.display = 'none'; // Initially hide the download button
        downloadButton.addEventListener('click', () => {
            downloadImage(result.urls.full);
        });

        image.addEventListener('click', () => {
            // Toggle visibility of the download button on image click
            downloadButton.style.display = downloadButton.style.display === 'none' ? 'block' : 'none';
        });

        const container = document.createElement('div');
        container.appendChild(image);
        container.appendChild(downloadButton);

        searchresults.appendChild(container);
    });

    if (data.total_pages > page) {
        showmorebtn.style.display = 'block'; // Show 'Show More' button if more pages are available
    } else {
        showmorebtn.style.display = 'none'; // Hide 'Show More' button if no more pages
    }
}

async function downloadImage(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'downloaded_image.jpg'; // You can customize the file name here
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

searchform.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showmorebtn.addEventListener('click', () => {
    page++;
    searchImages();
});
