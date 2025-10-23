from django.urls import path

from .views import ShortDetailView, ShortGenerateView

urlpatterns = [
    path("generate/", ShortGenerateView.as_view(), name="short-generate"),
    path("<int:pk>/", ShortDetailView.as_view(), name="short-detail"),
]

