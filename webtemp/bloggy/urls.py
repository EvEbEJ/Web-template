from django.urls import path
from . import views

app_name = "bloggy"
urlpatterns = [
    path("", views.index, name="index"),
    path("explore/", views.explore, name="explore"),
    path("article/<str:slug>", views.article, name="article"),
    path("search", views.search, name="search"),
    path("q", views.q, name="query"),
    path("t", views.t, name="trending")
]
