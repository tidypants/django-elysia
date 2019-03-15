from django.db import models

# Create your models here.

statuses = (
    ('active', 'Active'),
    ('draft', 'Draft'),
    ('paused', 'Paused')
)


class Testimonial(models.Model):
    status = models.CharField("Status", max_length=9, choices=statuses, null=False, blank=False, default="draft")
    title = models.CharField("Testimonial Title", max_length=99, null=False, blank=False, default="Default Title")
    testimonial = models.CharField("Testimonial", max_length=1999, null=False, blank=False, default="Lorum ipsum dolor sit amet...")
    name = models.CharField("Name", max_length=99, null=False, blank=False, default="Baba Vanga")
    location = models.CharField("Location/State", max_length=99, null=False, blank=False, default="Virginia")
    picture = models.CharField("Profile Pic (link)", max_length=999, null=False, blank=False, default="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1-744x744.jpg")

    def __str__(self):
        return str(self.name)
