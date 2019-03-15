# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from account.models.account import Account


class AccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'email')


admin.site.register(Account, AccountAdmin)