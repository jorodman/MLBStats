from site import abs_paths
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from operator import attrgetter, itemgetter

article_urls = [
    { 
        "url": "https://bosoxinjection.com/boston-red-sox-news/",
        "tags": ["h2", "h3"],
    },
    { 
        "url": "https://www.overthemonster.com/",
        "tags": ["h2"],
    },
    { 
        "url": "https://www.mlbtraderumors.com/boston-red-sox",
        "tags": ["h2"],
    },
    # TODO append url to relative site paths
    # { 
    #     "url": "https://www.mlb.com/redsox/news/",
    #     "tags": ["li"],
    #     "css_class": "article-navigation__item",
    # },
    { 
        "url": "https://nesn.com/boston-red-sox/",
        "tags": ["h3"],
    },
]

def scrape(url, tags, css_class):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    print("SCRAPING: " + url)
    domain = urlparse(url).netloc

    results = []

    if css_class:
        attrs = {"class": css_class}
    else:
        attrs = {}

    for tag in tags:
        blog_titles = soup.findAll(tag, attrs)

        for title in blog_titles:
            link = title.find('a')

            if link:
                href = link.get('href')
                results.append({
                    "title": title.text,
                    "href": href,
                    "score": 0
                })

    return { 
        "domain": domain,
        "url": url,
        "articles": results 
     }

def get_articles():
    articles = []
    
    for site in article_urls:
        tags = site.get('tags')
        url = site.get('url')
        css_class = site.get('css_class')
        results = scrape(url, tags, css_class)
        results = { 
            "domain": results['domain'],
            "url": results['url'],
            "articles": filter_articles(results['articles'])
        }
        articles.append(results)

    other()

    return articles

def other():
    get_fastcast()

def get_fastcast():
    mlb_base_url = "https://www.mlb.com"
    fastcast_path = "/video/topic/fastcast"
    response = requests.get(mlb_base_url + fastcast_path)
    soup = BeautifulSoup(response.text, 'html.parser')

    all_links = soup.find_all("a", {"class": "linkstyle__AnchorElement-sc-1rt6me7-0 ivXIsF Card__ContentCard-sc-q3pb1i-1 eJjpVD"})

    if all_links and all_links[0] and all_links[0].get('href'):
        relative_path = all_links[0].get('href')
        absolute_path = mlb_base_url + relative_path
        return absolute_path


def filter_articles(articles):

    # TODO match with regex so that any title with 'podcast' is removed for example
    dislikes = [
        "otm",
        "thread"
        "podcast",
        "podcasts",
        "podcast:"
        "thread",
    ]

    likes = [
        "trade",
        "trades",
        "agent",
        "sign",
        "deal",
        "rumor",
        "rumors",
        "extension",
        "bold",
        "latest",
    ]

    bad_articles = []

    for article in articles:
        for word in dislikes:
            if word in article['title'].lower():
                bad_articles.append(article['title'])
                
    for article in articles:
        for word in likes:
            if word in article['title'].lower():
                article['score'] += 1
    
    # remove the bad
    filtered = []
    for article in articles:
        if article['title'] not in bad_articles:
            filtered.append(article)

    # sort by score
    filtered = sorted(filtered, key=itemgetter('score'), reverse=True)

    return filtered[:6]


