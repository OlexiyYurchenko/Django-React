import django.forms as forms
from first_project.models import Article

class ArticleForm(forms.ModelForm):

    class Meta:
        model = Article
        fields = ('title', 'announce_text', 'text' )
