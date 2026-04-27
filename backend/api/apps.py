from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend.api'

    def ready(self):
        # Workaround for Python 3.14 importlib deadlock with Django runserver thread and allauth
        try:
            import allauth.account.internal.constants
        except ImportError:
            pass
