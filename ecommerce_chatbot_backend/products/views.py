from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])

@api_view(['GET'])
def get_products(request):
    """
    Fetch products based on search query, category filter, or specific product details.
    Example queries:
        /api/products/?search=laptop
        /api/products/?category=Electronics
        /api/products/?id=1
    """
    search_query = request.GET.get('search', '')
    category = request.GET.get('category', '')
    product_id = request.GET.get('id', None)

    if product_id:  # Fetch product by ID
        try:
            product = Product.objects.get(id=product_id)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({"error": "Product not found."}, status=404)

    # Default search or filter behavior
    products = Product.objects.all()
    if search_query:
        products = products.filter(name__icontains=search_query)
    if category:
        products = products.filter(category__iexact=category)

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
