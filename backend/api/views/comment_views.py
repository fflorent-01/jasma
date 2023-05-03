import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from api.utils.request_method_wrappers import post_wrapper, put_wrapper, get_wrapper, delete_wrapper
from api.constants.http_status import HTTP_STATUS
from api.models import User, Post, Comment
from api.utils.handle_file_save import handle_file_save
from api.utils.handle_file_delete import handle_file_delete

@csrf_exempt
@login_required
@post_wrapper
def create_comment(request):
    try:
        text_content = request.POST.get('text_content')
        post_id = request.POST.get('post_id')
        user = request.user
        # Comment contains a file
        if request.FILES:
            uploaded_file = request.FILES.get('file')
            saved_file = handle_file_save(uploaded_file, "comment")
            if saved_file == False:
                return JsonResponse({'successs': False, 'message': "File upload failed."}, 
                                    status=HTTP_STATUS["Internal Server Error"])
            file_url = saved_file["URL"]
        # Post has no file.
        else:
            file_url = None

        post = Post.objects.get(post_id=post_id)
        comment = Comment.objects.create( 
                        post=post,
                        user=user, 
                        text_content=text_content, 
                        file_url=file_url)
        
        # TODO: Create a notification towards the post owner (in Redis)
        post_owner = User.objects.get(id=post.user_id)
        #create_notification(post_owner.id, {
        # from: user.id,
        # event_type: "new_comment",
        # event_reference: post_id,
        # message: f"{user.username} commented on your post})

        return JsonResponse({'successs': True, 'message': "Comment created successfully."}, 
                            status=HTTP_STATUS["Created"])
    except Exception as e:
        # Check if a comment has been created, if yes, delete it upon error.
        if 'comment' in locals():
            comment.delete()
        # Delete the saved file too.
        if 'saved_file' in locals():
            if saved_file != False:
                handle_file_delete(saved_file["location"])
        print(e)
        return JsonResponse({'successs': False, 'message': e.args[0]}, 
                            status=HTTP_STATUS["Internal Server Error"])

@csrf_exempt
@login_required
@delete_wrapper
def delete_comment(request, comment_id):
    try: 
        comment = Post.objects.get(comment_id=comment_id)
    except Comment.DoesNotExist:
        return JsonResponse({'success': True, 'message': "Comment does not exist or already deleted."}, 
                            status=HTTP_STATUS["Gone"])
    if comment.file_url != None:
        delete_file = handle_file_delete(comment.file_url)
    comment.delete()
    return JsonResponse({'successs': True, 'message': "Comment deleted successfully."}, 
                        status=HTTP_STATUS["OK"])

@csrf_exempt
@login_required
@put_wrapper
def edit_comment(request):
    try:
        comment_id = request.POST.get('comment_id')
        comment = Comment.objects.get(comment_id=comment_id)
    except Comment.DoesNotExist:
        return JsonResponse({'success': False, 'message': "Comment does not exist."}, 
                        status=HTTP_STATUS["Not Found"])
    # Update text_content if available
    text_content = request.POST.get('text_content')
    if text_content:
        comment.text_content = text_content
    # Handle file upload if available
    if request.FILES:
        uploaded_file = request.FILES.get('file')
        saved_file = handle_file_save(uploaded_file, "post")
        if saved_file == False:
            return JsonResponse({'successs': False, 'message': "File upload failed."}, 
                                status=HTTP_STATUS["Internal Server Error"])
        file_url = saved_file["URL"]
        # If the comment already contains a file, delete the old one
        if comment.file_url:
            handle_file_delete(comment.file_url)
    else:
        file_url = None
    
    comment.file_url = file_url
    comment.save()
    return JsonResponse({'success': True, 'message': "Comment updated successfully."}, 
                        status=HTTP_STATUS["Created"])

@get_wrapper
def get_comments(request):
    post_id = request.GET.get('post_id', None)
    limit = int(request.GET.get('limit', 1))
    try:
        post = Post.objects.get(post_id=post_id)
    except Post.DoesNotExist:
        return JsonResponse({'success': False, 'message': "Post does not exist."}, 
                            status=HTTP_STATUS["Not Found"])
    # Get the comments of the post with the limit.
    comments = Comment.objects.filter(post=post).order_by('-created_at')[:limit]
    comments_formatted = Comment.format_comments_dict(comments)

    return JsonResponse({'success': True, 'comments': comments_formatted},
                        status=HTTP_STATUS["OK"])
