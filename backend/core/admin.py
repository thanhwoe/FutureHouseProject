from django.contrib import admin

from .models import *


class ImageInline(admin.TabularInline):
    model = Images
class File3DInline(admin.TabularInline):
    model = Files3D
class DocumentlInline(admin.TabularInline):
    model = FileDocument
class OrderAdmin(admin.ModelAdmin):
    list_display = ['user',
                    'ordered',
                    'payment',
                    'coupon'
                    ]
    list_display_links = [
        'user',

        'payment',
        'coupon'
    ]
    list_filter = ['ordered']
    search_fields = ['user__username']



class ItemAdmin(admin.ModelAdmin):
    list_display=['title','category','label','discount_price']
    list_filter =['title']
    search_fields =['title']
    prepopulated_fields={'slug':('title',),}
    inlines = [
        ImageInline,
        File3DInline,
        DocumentlInline
    ]

class PostAdmin(admin.ModelAdmin):
    list_display=['title','author']
    list_filter =['title']
    search_fields =['title']
    prepopulated_fields={'slug':('title',),}

class ImagesAdmin(admin.ModelAdmin):
    list_display=['item','image']
    list_filter =['item']
    search_fields =['item']


admin.site.register(Item,ItemAdmin)
admin.site.register(Post,PostAdmin)
admin.site.register(Images,ImagesAdmin)
admin.site.register(OrderItem)
admin.site.register(Order, OrderAdmin)
admin.site.register(Payment)
admin.site.register(Coupon)
admin.site.register(UserProfile)
admin.site.register(Comment)
admin.site.register(CommentReply)
admin.site.register(PaymentItem)
admin.site.register(Chat)
admin.site.register(Contact)
admin.site.register(Message)
admin.site.register(FileDocument)