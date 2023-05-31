from django.contrib import admin

from .models import Message

@admin.register(Message)
class MessageModelAdmin(admin.ModelAdmin):
    list_display = ('pk', 'subject', 'created_at', 'updated_at')
    list_filter = ('created_at',)
    search_fields = ('subject', 'body')
