from django.db.models.base import Model
from django.db.models.signals import post_save
from django.conf import settings
from django.db import models
from django.template.defaultfilters import default, slugify
from django.contrib.auth.models import AbstractUser
from django.db.models import Sum
from django.shortcuts import reverse
from django_countries.fields import CountryField
import random
import string
from django.contrib.postgres.fields import ArrayField
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField
from django.utils.translation import gettext_lazy as _
from django.dispatch import receiver
# delete refund model

CATEGORY_CHOICES = (
    ('Bungalow','Bungalow'),
    ('Classical','Classical'),
    ('Modern','Modern'),
    ('Traditional','Traditional'),
    ('Luxury','Luxury'),
    
 
)

LABEL_CHOICES = (
    ('New', 'New'),
    ('Trending', 'Trending')
)




# class UserExtend(AbstractUser):
#     isStaff = models.BooleanField(default=False)


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    isStaff = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username




def create_folder(instance, filename):
    folder_name = instance.title
    slug = slugify(folder_name)

    return "%s/%s" % (slug,filename)

# def create_folder_option(instance, filename):
#     folder_name = instance.item.title
#     slug = slugify(folder_name)

#     return "%s/%s" % (slug,filename)

def select_id(instance, filename):
    folder_name = instance.title
    slug = slugify(folder_name)

    return "%s/%s" % (slug,filename)


class Item(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    discount_price = models.FloatField(blank=True, null=True)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=20)
    label = models.CharField(choices=LABEL_CHOICES, max_length=10)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    thumbnail = models.ImageField(_("Image"),upload_to=create_folder, default='thumbnail_default.png')
    square_foot= models.CharField(max_length=10, default=None)
    beds= models.CharField(max_length=10, default=None)
    stories= models.CharField(max_length=10, default=None)
    garages= models.CharField(max_length=10, default=None)
    baths= models.CharField(max_length=10, default=None)
    description = models.TextField(max_length=500,blank=True, null=True)
    user_wishlist = models.ManyToManyField(settings.AUTH_USER_MODEL,blank=True)
    avarage_rate = models.FloatField(default=0)
    count_sell = models.IntegerField(default=0)
    count_comment = models.IntegerField(default=0)
    overview = models.TextField(max_length=150,blank=True, null=True)


    def __str__(self):
        return self.title

    # def delete(self, *args, **kwargs):
    #     self.delete()
    #     super().delete( *args, **kwargs)
    # def update(self, *args, **kwargs):
    #     self.thumbnail.update()
    #     super().update( *args, **kwargs)

def get_img_filename(instance, filename):
    title = instance.item.title
    slug = slugify(title)
    return "%s/%s" % (slug,filename)

class Images(models.Model):
    item = models.ForeignKey(Item, on_delete = models.CASCADE,related_name='img')
    image = models.ImageField(_("Image"),upload_to = get_img_filename)
    class Meta:
        unique_together=(
            ('item', 'image')
        )
    def delete(self, *args, **kwargs):
        self.image.delete()
        super().delete( *args, **kwargs)
    # @receiver(models.signals.pre_delete, sender=image)
    # def delete(sender, instance, using, **kwargs):
    #     instance.content.delete(save=False)

class Files3D(models.Model):
    item = models.ForeignKey(Item, on_delete = models.CASCADE,related_name='file')
    file = models.FileField(_("File"),upload_to=get_img_filename,default=False)
    
    def delete(self, *args, **kwargs):
        self.file.delete()
        super().delete( *args, **kwargs)

class FileDocument(models.Model):
    item = models.ForeignKey(Item, on_delete = models.CASCADE,related_name='document')
    document = models.FileField(_("File"),upload_to=get_img_filename,default=False)
    
    def delete(self, *args, **kwargs):
        self.document.delete()
        super().delete( *args, **kwargs)

# class ThumbnailItem(models.Model):
#     item = models.ForeignKey(Item, on_delete = models.CASCADE,related_name='thumbnail')
#     thumbnail = models.ImageField(_("Image"),upload_to=get_img_filename,blank=True, null=True)
#     def delete(self, *args, **kwargs):
#         self.file.delete()
#         super().delete( *args, **kwargs)
    
    # def delete(self, using=None, keep_parents=False):
    #     self.file.storage.delete(self.file.name)
    #     super().delete()

# class Variation(models.Model):
#     item = models.ForeignKey(Item, on_delete = models.CASCADE)
#     name = models.CharField(max_length=50) #size

#     class Meta:
#         unique_together=(
#             ('item', 'name')
#         )

#     def __str__(self):
#         return self.name

# class ItemVariation(models.Model):
#     variation = models.ForeignKey(Variation, on_delete = models.CASCADE)
#     value = models.CharField(max_length=50) #S,M,L
#     # attachment = models.ImageField(blank=True)

#     class Meta:
#         unique_together=(
#             ('variation', 'value')
#         )

#     def __str__(self):
#         return self.value

class OrderItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    # item_variations=models.ManyToManyField(ItemVariation)
    # quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.item.title}"

    # def get_total_item_price(self):
    #     return self.quantity * self.item.price

    # def get_total_discount_item_price(self):
    #     return self.quantity * self.item.discount_price

    # def get_amount_saved(self):
    #     return self.get_total_item_price() - self.get_total_discount_item_price()

    def get_final_price(self):
        if self.item.discount_price:
            return self.item.discount_price
        return self.item.price


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    # ref_code = models.CharField(max_length=20, blank=True, null=True)
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)
    payment = models.ForeignKey(
        'Payment', on_delete=models.CASCADE, blank=True, null=True)
    coupon = models.ForeignKey(
        'Coupon', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.user.username

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        if self.coupon:
            total -= self.coupon.amount
        return total


class Post(models.Model):
    title = models.CharField(max_length=100)
    overview = models.TextField(max_length=200,blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    # content = RichTextField()
    content = RichTextUploadingField()
    # view_count = models.IntegerField(default = 0)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    thumbnail = models.ImageField()
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)
    def __str__(self):
        return self.title

class PaymentItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                            on_delete=models.CASCADE, blank=True, null=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    downloadUrl = models.CharField(max_length=250)
    isPaid =models.BooleanField(default=False)
    def __str__(self):
        return f"{self.user.username} ---- {self.item.title}"

class Payment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True, null=True)
    items = models.ManyToManyField(PaymentItem)
    amount = models.FloatField()
    # itemIDsold =ArrayField(models.IntegerField())
    # listURL =ArrayField(models.CharField(max_length=255))
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Coupon(models.Model):
    code = models.CharField(max_length=15)
    amount = models.FloatField()

    def __str__(self):
        return self.code


class Refund(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    reason = models.TextField()
    accepted = models.BooleanField(default=False)
    email = models.EmailField()

    def __str__(self):
        return f"{self.pk}"


class Comment (models.Model):
    User_ID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    Item_ID = models.ForeignKey(Item, on_delete=models.CASCADE)
    content = models.TextField(null=True)
    publish = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.content


class CommentReply (models.Model):
    User_ID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    Comment_ID = models.ForeignKey(Comment, on_delete=models.CASCADE)
    content = models.TextField(null=True)
    publish = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.content

class Contact(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='friends', on_delete=models.CASCADE)
    friends = models.ManyToManyField('self', blank=True)

    def __str__(self):
        return self.user.username

class Message(models.Model):
    contact = models.ForeignKey(
        Contact, related_name='messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.contact.user.username

# chat room
class Chat(models.Model):
    participants = models.ManyToManyField(Contact, related_name='chats', blank=True) 
    messages = models.ManyToManyField(Message, blank=True)  

    def __str__(self):
        return "{}".format(self.pk)



def userprofile_receiver(sender, instance, created, *args, **kwargs):
    if created:
        userprofile = UserProfile.objects.create(user=instance)


post_save.connect(userprofile_receiver, sender=settings.AUTH_USER_MODEL)



