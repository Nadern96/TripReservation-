from django.contrib import admin
from .models import DesignTrip,Program

class DesignTripAdmin(admin.ModelAdmin):
    list_display = ('status','user','form_submitted_date',
                    'trip_type','about_trip','budget_from','budget_to','travel_with',
                    'couple_question','couple_question','adult_number','chidren_number',
                    'exact_date','arrival_date','departure_date','month','period',
                    'begin_trip','agent_language','agent_time',
                    'agent_welcome','agent_byebye','agent_car','agent_camera')
    fieldsets = (
        ('Tab1', {'fields': ('status', 'user','program',
                    'trip_type','about_trip','budget_from','budget_to')}),

        ('Tab2', {'fields': ('travel_with',
                    'couple_question','adult_number','chidren_number',
                    'exact_date','arrival_date','departure_date','month','period')}),

        ('Tab3', {'fields': ('begin_trip','agent_language','agent_time',
                    'agent_welcome','agent_byebye','agent_car','agent_camera')}),
    )
    search_fields = ('about_trip','form_submitted_date',
                    'trip_type','about_trip','travel_with',
                    'couple_question','couple_question','adult_number','chidren_number',
                    'exact_date','arrival_date','departure_date','month','period',
                    'begin_trip','agent_language','agent_time',
                    'agent_welcome','agent_byebye','agent_car','agent_camera','status')
    ordering = ['form_submitted_date']
    list_filter = ('status',)

    actions = ['mark_ongoing','mark_requested','mark_Done','mark_archieve']

    def mark_ongoing(self, request, queryset):
        rows_updated =queryset.update(status="onGoing")
        if rows_updated == 1:
            message_bit = "1 story was"
        else:
            message_bit = "%s stories were" % rows_updated
        self.message_user(request, "%s successfully marked as OnGoing." % message_bit)
    mark_ongoing.short_description = "Mark OnGoing"

    def mark_Done(self, request, queryset):
        rows_updated = queryset.update(status="Done")
        if rows_updated == 1:
            message_bit = "1 story was"
        else:
            message_bit = "%s stories were" % rows_updated
        self.message_user(request, "%s successfully marked as Done." % message_bit)
    mark_Done.short_description = "Mark Done"

    def mark_requested(self, request, queryset):
        rows_updated = queryset.update(status="Requested")
        if rows_updated == 1:
            message_bit = "1 story was"
        else:
            message_bit = "%s stories were" % rows_updated
        self.message_user(request, "%s successfully marked as Requested." % message_bit)
    mark_requested.short_description = "Mark Requested"

    def mark_archieve(self, request, queryset):
        rows_updated = queryset.update(status="Archieve")
        if rows_updated == 1:
            message_bit = "1 story was"
        else:
            message_bit = "%s stories were" % rows_updated
        self.message_user(request, "%s successfully marked as Archieve." % message_bit)
    mark_archieve.short_description = "Mark Archieve"

admin.site.register(DesignTrip,DesignTripAdmin)
admin.site.register(Program)