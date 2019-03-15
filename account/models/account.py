import requests
# from django.contrib.auth.models import User
from django.db import models

from www.functions import get_async_web_response, get_async_web_response_no_decode

#from medium.functions import get_async_web_response, get_async_web_response_no_decode

gender_choices = (
    ('male', 'Man'),
    ('female', 'Woman')
)


class Account(models.Model):
    # user = models.OneToOneField(User, null=True, blank=True)
    gender = models.CharField("Gender", max_length=6, choices=gender_choices, null=True, blank=True)
    first_name = models.CharField("First Name", max_length=99, null=True, blank=True)
    last_name = models.CharField("Last Name", max_length=99, null=True, blank=True)
    email = models.EmailField("Email", max_length=99, null=False, blank=False)
    birth_date = models.DateField("Birth Date",  null=True, blank=True)
    ip = models.CharField("IP Address", max_length=99, null=True, blank=True)
    cid = models.CharField("Voluum Click ID", max_length=199, null=True, blank=True)
    stripe_id = models.CharField("Stripe Purchase ID", max_length=199, null=True, blank=True)

    def __str__(self):
        return str(self.email)

    def post_lead(self):

        url = "https://api.getresponse.com/v3/contacts"

        payload = '{ "name": "'+ self.first_name +'","email": "'+ self.email +'","campaign": { "campaignId": "85Wba" },"ipAddress": "192.168.55.10","customFieldValues": [ { "customFieldId": "YFrqR", "value": [ "'+ str(self.id) +'" ] } ] }'

                    #'{ "name": "" + self.first_name + """,
                    #            "email": "" + self.email + """,
                    #            "campaign": { "campaignId": "aeyhq" },
                    #             "ipAddress": "" + self.ip + """,
                    #              "customFieldValues": [ { "customFieldId": "YFrqR",
                    #               "value": [ "" + str(self.id) + """ ] } ] }'
        headers = {
            'X-Auth-Token': "api-key 612050ed434b13c06f0c5d6e99b00ff9",
            'Content-Type': "application/json",
            'cache-control': "no-cache",
    }

        response = requests.request("POST", url, data=payload, headers=headers)

        print(response.text)

        #data = '{ "name": "' + self.first_name + '", "email": "' + self.email + '", "campaign": { "campaignId": "aeyhq" }, "ipAddress": "' + self.ip + '", "customFieldValues": [ { "customFieldId": "YFrqR", "value": [ "' + str(self.id) + '" ] } ] }'
        #headers = {"X-Auth-Token": "api-key 612050ed434b13c06f0c5d6e99b00ff9", "Content-Type": "application/json"}
        #get_async_web_response_no_decode("https://api.getresponse.com/v3/contacts", "POST", data=data, headers=headers)

    def set_purchased(self, total, paid, instalments):
        headers = {"X-Auth-Token": "api-key 612050ed434b13c06f0c5d6e99b00ff9", "Content-Type": "application/json"}
        contacts = get_async_web_response("https://api.getresponse.com/v3/contacts?query[name]=" + self.first_name, headers=headers)
        contact_id = ""
        for c in contacts:
            if c["email"] == self.email:
                contact_id = c["contactId"]
        data = '{ "name": "' + self.first_name + '", "email": "' + self.email + '", "campaign": { "campaignId": "aeyhq" }, "ipAddress": "' + self.ip + '", "tags": [ { "tagId": "rFtP" } ] }'
        get_async_web_response_no_decode("https://api.getresponse.com/v3/contacts/" + contact_id, 'POST', data=data, headers=headers)
        if instalments:
            campaign = "ab9t7"
        else:
            campaign = "a1WT7"
        sale_data = '{"name": "' + self.first_name + '", "email": "' + self.email + '", "campaign": {"campaignId": "' + campaign + '"}, "ipAddress": "' + self.ip + '", "customFieldValues": [{"customFieldId": "YFrqR", "value": ["' + str(self.stripe_id) + '"]}, {"customFieldId": "ECEv3", "value": ["' + total + '" ]}, {"customFieldId": "EI8SP", "value": ["' + paid + '" ]}]}'
        get_async_web_response_no_decode("https://api.getresponse.com/v3/contacts", 'POST', data=sale_data, headers=headers)

    def save(self, **kwargs):
        if self.id is None:
            super(Account, self).save()
            self.post_lead()
        super(Account, self).save()

    def get_guardian_angel(self):
        birth_date_as_text = self.birth_date.strftime("%d%m%Y")
        array_it = list(birth_date_as_text)
        added_up = 0

        for l in array_it:
            add = int(l)
            added_up += add

        def make_single_digit(multi_digit):
            adding_up = 0

            for n in list(str(multi_digit)):
                digit = int(n)
                adding_up += digit

            if adding_up in [11, 22, 33, 44] or len(str(adding_up)) == 1:
                return adding_up
            else:
                return make_single_digit(adding_up)

        if added_up not in [11, 22, 33, 44] or len(str(added_up)) != 1:
            number = make_single_digit(added_up)
        else:
            number = added_up

        switcher = {
            1: "Raguel",
            2: "Uriel",
            3: "Jophiel",
            4: "Haniel",
            5: "Jeremiel",
            6: "Michael",
            7: "Raphael",
            8: "Raziel",
            9: "Ariel",
            11: "Uriel",
            22: "Haniel",
            33: "Michael",
            44: "Raziel"
        }

        return switcher.get(number, "NaN")
