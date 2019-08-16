import django.forms as forms
from first_project.models import Article, Comment, Profile

class ArticleForm(forms.ModelForm):

    class Meta:
        model = Article
        fields = ('title', 'announce_text', 'text' )

class CommentForm(forms.ModelForm):

    class Meta:
        model = Comment
        fields = ('text',)


class ProfileForm(forms.ModelForm):

    class Meta:
        model = Profile
        fields = ('date_of_birth', 'image')
        