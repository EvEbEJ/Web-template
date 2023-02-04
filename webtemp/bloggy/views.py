from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from django.db.models import Count

from itertools import chain
from re import sub
from collections import Counter
import datetime
from nltk.stem import PorterStemmer

from .models import Article

# Create your views here.

def query(q, model):
    exact = model.objects.filter(title__iexact=q)
    contains = model.objects.filter(title__contains=q)
    return list(chain(exact, contains))

def index(request):
    return render(request, "bloggy/index.html")

def explore(request):
    return render(request, "bloggy/explore.html")

def article(request, slug):
    article = Article.objects.get(slug=slug)
    article.views += 1
    article.save()
    print(article.stem_body)
    related = Article.objects.exclude(id=article.id).filter(tags__in=article.tags.all()).annotate(
        matches=Count('tags')
    ).order_by('-matches')
    if len(related) > 3:
        related = related[:3]
    return render(request, "bloggy/article.html", {
        "article": article,
        "MEDIA_URL": settings.MEDIA_URL,
        "related": related,
    })

# search results
def search(request):
    try:
        q = request.GET["q"]
        q = sub(' +', ' ', sub("\W", " ", q)).strip()
        query = q.split(" ")
        results = []
        ps = PorterStemmer()
        # sort articles by relevance: # distinct words from query in article
        for word in query:
            stem_word = ps.stem(word)
            q_result = []
            q_result.extend(Article.objects.filter(title__icontains=word))
            q_result.extend(Article.objects.filter(stem_body__icontains=stem_word))
            print(ps.stem(word))
            q_result.extend(Article.objects.filter(tags__name__icontains=word))
            results.extend([i for i, j in Counter(q_result).most_common()])
        results = [i for i, j in Counter(results).most_common()]
    except:
        q = None
        results = []
    return render(request, "bloggy/search.html", {
        "results": results,
        "q": q
    })

# input results (by title)
def q(request):
    # TODO: ADD validation
    if request.method == 'GET':
        # query database
        q_results = query(request.GET["q"], Article)
        results = {}
        # for each query results append to json list
        for article in q_results:
            di = {}
            di["title"] = article.title
            di["slug"] = article.slug
            results[article.id] = di
        return JsonResponse(results)

# top article
def t(request):
    # TODO: ADD validation
    if request.method == 'GET':
        # query database
        trending = Article.objects.filter(created__gte=datetime.date.today() - datetime.timedelta(days=7)).order_by("-views")[:5]
        results = {}
        # for each query results append to json list
        for article in trending:
            di = {}
            di["views"] = article.views
            di["slug"] = article.slug
            results[article.title] = di
        return JsonResponse(results)