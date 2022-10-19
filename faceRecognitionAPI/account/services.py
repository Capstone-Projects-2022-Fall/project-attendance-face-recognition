from account.models import Student, Instructor
from recognition.models import StudentImage


def account_registration_verification(user):
    """
    Verify if user's images has been added to the dataset
    :param user:
    :return: True if found at least 5 images
    """
    if Student.objects.filter(user=user).exists():
        count_images = StudentImage.objects.filter(student__user=user).count()
        if count_images < 5:
            return False
        return True
    elif Instructor.objects.filter(user=user).exists():
        return True
    return False
