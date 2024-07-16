$(document).ready(function() {
    const apiKey = 'api key';
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    function fetchNews(query = '') {
        $.get(url + (query ? `&q=${query}` : ''), function(data) {
            const articles = data.articles;
            let newsHtml = '';

            articles.forEach(article => {
                let publishedAt = new Date(article.publishedAt);
                newsHtml += `
                    <div class="col-md-4 d-flex align-items-stretch">
                        <div class="card mb-4">
                            <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text">${article.description}</p>
                                <p class="card-text mt-auto">
                                    <small class="text-muted">By ${article.author || 'Unknown'} on ${publishedAt.toDateString()}</small>
                                </p>
                                <a href="${article.url}" class="btn btn-primary mt-3" target="_blank">Read more</a>
                            </div>
                        </div>
                    </div>
                `;
            });

            $('#newsContainer').html(newsHtml);
        }).fail(function() {
            $('#newsContainer').html('<p>Failed to load news articles. Please try again later.</p>');
        });
    }

    // Initial fetch
    fetchNews();

    // Search functionality
    $('#searchButton').click(function() {
        const query = $('#searchInput').val();
        fetchNews(query);
    });
});
