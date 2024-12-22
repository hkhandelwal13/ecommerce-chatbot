from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Product

# Registering Product model in Django Admin
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock')  # Fields to display in the list view
    search_fields = ('name', 'category')  # Add search functionality for name and category
    list_filter = ('category', 'price')  # Add filter options for category and price
    ordering = ('name',)  # Order results by product name by default
    fields = ('name', 'category', 'price', 'stock', 'description', 'image_url')  # Fields to display in form view
