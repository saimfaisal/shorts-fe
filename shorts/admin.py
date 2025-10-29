from django.contrib import admin

from .models import ShortVideo


@admin.register(ShortVideo)
class ShortVideoAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "youtube_url",
        "duration",
        "start_time",
        "status",
        "created_at",
    )
    list_filter = ("status", "created_at")
    search_fields = ("youtube_url", "status")

