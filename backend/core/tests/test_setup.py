import io
from django.contrib.auth import get_user_model
from django.template.defaultfilters import title
from rest_framework.test import APITestCase
from core.api.serializers import *
from core.models import *
from core.api.views import *
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image

User = get_user_model()

class TestSetUp(APITestCase):
    def setUp(self):
        def generate_file(self):
            file = io.BytesIO()
            image = Image.new('RGBA', size=(100, 100), color=(155, 0, 0))
            image.save(file, 'png')
            file.name = 'test.png'
            file.seek(0)
            return file
        ExFile = generate_file(self)

        self.user = User.objects.create_user(
            username='usertest2',
            password='strong_password'
        )
        
        self.blog = Post.objects.create(
            title='testBlog',
            content='test',
            author=self.user,
            slug='test-blogg'
        )

        self.product = Item.objects.create(
            title = 'test product',
            price = 20,
            category='Bungalow',
            label='New',
            slug='test-productt',
            square_foot='2',
            beds='2',
            stories='2',
            garages='2',
            baths='2'
        )
        self.coupon = Coupon.objects.create(
            code="testcode",
            amount=20
        )


        self.user_data_register={
            'email':'test@gmail.com',
            'username':'usertest',
            'password1':'strong_password',
            'password2':'strong_password'
        }
        self.user_data_login={
            'username':'usertest2',
            'password':'strong_password'
        }
        self.product_data={
            'title':'productTest',
            'price':'20',
            'discount_price':'30',
            'category':'Bungalow',
            'label':'New',
            'slug':'product-test',
            'description':'descriptionTest',
            'square_foot':'20',
            'beds':'5',
            'stories':'5',
            'garages':'5',
            'baths':'5',
            'thumbnail':ExFile,
            'files':ExFile,
            'document':ExFile,
        }
        self.blog_data={
            'title':'blog test',
            'overview':'test',
            'content':'test',
            'slug':'test',
            'thumbnail':ExFile,
        }
        self.put_data_product={
            'title':'new title test',
            'price':'20',
            'discount_price':'30',
            'category':'Bungalow',
            'label':'New',
            'slug':'product-test',
            'description':'descriptionTest',
            'square_foot':'20',
            'beds':'5',
            'stories':'5',
            'garages':'5',
            'baths':'5',
        }
        self.put_blog_data={
            'title':'new blog test',
            'overview':'test',
            'content':'test',
            'slug':'test',
        }

        self.comment_data={
           "User_ID":self.user.id,
           "Item_ID":self.product.id,
           "content":"test comment"
        }
  
        return super().setUp()

    def tearDown(self) -> None:
        return super().tearDown()