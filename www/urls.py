from django.urls import path, re_path
from www import views


urlpatterns = [
#    path('', views.index, name="index"),
    path('postcode-signup', views.create_account, name="create_account"),
     path('free-angel-consultation', views.free_angel_consultation, name="free_angel_consultation"),
#    path('meet', views.meet, name="meet"),
   path('shop', views.shop, name="shop"),
   path('aapp1', views.aapp1, name="aapp1"),
   path('aapp2', views.aapp2, name="aapp2"),
   path('aapp3', views.aapp3, name="aapp3"),
   path('check-email-ss', views.check_email_ss, name="check_email_ss"),
   path('ss', views.ss, name="ss"),
   path('cc', views.cc, name="cc"),
   path('1', views.one, name="one"),
   path('checkout_test', views.checkout_test, name="checkout_test"),
   #path('lp/cc/', views.landing_pages, name="landing_pages"),
   re_path(r'^lp', views.landing_pages, name="landing_pages"),
#    path('terms', views.terms, name="terms"),
#    path('privacy', views.privacy, name="privacy"),
#     path('lp', views.landing_pages, name="landing_pages"),
#    path('sp/(?P<page>\D+)/$', views.sales_pages, name="sales_pages"),
#    path('product/(?P<page>\D+)/$', views.product_pages, name="product_pages"),
#    path('checkout-test', views.checkout_test, name="checkout_test"),
#    path('check-email-ss', views.check_email_ss, name="check_email_ss"),
#    path('process$', views.process, name="process"),
#    path('process-test', views.process_test, name="process_test"),
#    path('check-installments', views.check_installments, name="check_installments"),
#    path('^thank-you', views.thank_you, name="thank_you"),
#    path('.well-known/pki-validation/612A8A404CC33625A27AC090A46603BB.txt', views.validation, name="validation"),
]
