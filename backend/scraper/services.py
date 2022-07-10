import requests
from bs4 import BeautifulSoup

urls = [
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
    # { 
    #     "url": "https://www.mlb.com/redsox/news/",
    #     "tags": ["li"],
    #     "css_class": "article-navigation__item",
    # },
    # { 
    #     "url": "https://nesn.com/boston-red-sox/",
    #     "tags": ["h3"],
    # },
]

def scrape(url, tag, css_class):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    print("SCRAPING: " + url)

    results = []

    if css_class:
        attrs = {"class": css_class}
    else:
        attrs = {}

    blog_titles = soup.findAll(tag, attrs)

    for title in blog_titles:
        link = title.find('a')

        if link:
            href = link.get('href')
            results.append({
                "site": url,
                "title": title.text,
                "href": href
            })

    return results

def get_articles():
    all_articles = []
    
    for site in urls:
        for tag in site.get("tags"):
            url = site.get('url')
            css_class = site.get('css_class')
            results = scrape(url, tag, css_class)
            all_articles += results

    return all_articles


