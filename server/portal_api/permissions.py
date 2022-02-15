from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.permissions import IsAdminUser


class IsTaskCommitteeHead(BasePermission):
    message = "Editing tasks is restricted to the committee head"

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return request.user == obj.committee.head


class IsTaskCommitteeMember(BasePermission):
    message = (
        "You must be on the committee owned by this resource to perform this action"
    )

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        committee = obj.committee
        committee_members = committee.members.all()

        return request.user in committee_members


class IsTaskCommitteeHeadOrMember(BasePermission):
    def has_object_permission(*args):
        return IsTaskCommitteeHead.has_object_permission(
            *args
        ) or IsTaskCommitteeMember.has_object_permission(*args)


class IsTaskCommitteHeadOrMemberOrAdmin(BasePermission):
    def has_object_permission(*args):
        return (
            IsTaskCommitteeHead.has_object_permission(*args)
            or IsTaskCommitteeMember.has_object_permission(*args)
            or IsAdminUser.has_object_permission(*args)
        )


class IsCommitteeHead(BasePermission):
    message = "Editing tasks is restricted to the committee head"

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return request.user == obj.head


class IsCommitteeMember(BasePermission):
    message = (
        "You must be on the committee owned by this resource to perform this action"
    )

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        committee_members = obj.members.all()

        return request.user in committee_members


class IsCommitteeHeadOrMember(BasePermission):
    def has_object_permission(*args):
        return IsCommitteeHead.has_object_permission(
            *args
        ) or IsCommitteeMember.has_object_permission(*args)
