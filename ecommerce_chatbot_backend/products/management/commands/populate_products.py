import random
from django.core.management.base import BaseCommand
from products.models import Product

class Command(BaseCommand):
    help = "Populates the database with dummy e-commerce products."

    def handle(self, *args, **kwargs):
        categories = ['Electronics', 'Books', 'Clothing', 'Home Appliances', 'Toys']
        for i in range(100):  # Generate 100 dummy products
            Product.objects.create(
                name=f"Product {i + 1}",
                description="This is a sample product description.",
                price=round(random.uniform(10.00, 500.00), 2),
                category=random.choice(categories),
                stock=random.randint(1, 100),
                image_url="https://via.placeholder.com/150"  # Placeholder image
            )
        self.stdout.write(self.style.SUCCESS("Successfully added 100 dummy products."))
