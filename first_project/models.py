from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
from cloudinary.models import CloudinaryField
# Create your models here.

 
class Article(models.Model):
    title = models.CharField(_('title'), max_length=128)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    announce_text = models.TextField(_('announce'), max_length=512, blank=True)
    text = models.TextField(_('text'), max_length=4096)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user', null=True)

    def __str__(self):
        return self.title

    @property
    def announce(self):
        return self.announce_text or self.text[:512].rsplit(' ', 1)[0]

    class Meta:
        ordering = ['-created_at']
        verbose_name = _('article')
        verbose_name_plural = _('articles')

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    val = models.IntegerField(default=0, validators=[MinValueValidator(0),
                                       MaxValueValidator(2)])


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comment')
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comment', null=True)
    text = models.TextField(_('text'), max_length=4096)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.article.title


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    image = CloudinaryField('image', null=True, blank=True)


    def __str__(self):
        return 'Profile for user {}'.format(self.user.username)