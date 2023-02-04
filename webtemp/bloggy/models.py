from django.db import models

from re import sub
from random import randint
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize

# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return f"{self.name}"

class Article(models.Model):
    title = models.CharField(verbose_name="Name of Article", max_length=50, name="title", unique=True)
    created = models.DateTimeField(auto_now_add=True)
    cover = models.ImageField(verbose_name="Cover image", upload_to='images/%Y/%m/%d/', blank=True)
    tags = models.ManyToManyField(Tag, verbose_name="Tags", blank=True)
    body = models.TextField(verbose_name="Article content", name="content")
    escaped_body = models.TextField(blank=True, editable=False)
    stem_body = models.TextField(blank=True, editable=False)
    views = models.BigIntegerField(default=0)
    slug = models.SlugField(unique=True, blank=True)
    def save(self, *args, **kwargs):
        if not self.slug:
            slug = sub("[^\s\w]", "", self.title.lower()).replace(" ", "-") + str(randint(100000, 999999))
            while Article.objects.filter(slug=slug):
                slug = slug[:-6] + str(randint(100000, 999999))
            self.slug = slug
        self.escaped_body = sub('<[^<]+?>', '', self.content)
        ps = PorterStemmer()
        for i in word_tokenize(self.escaped_body):
            self.stem_body += ps.stem(i) + " "
        super(Article, self).save(*args, **kwargs)
    def __str__ (self):
        return f"{self.title}"