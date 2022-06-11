{
    // method to submit the form data for new post using AJAX
    let createPost = function() {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data) {
                    console.log(data);
                    let newPost = newPostDOM(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($('.toggle-like-button', newPost));
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM
    let newPostDOM = function(post) {
        // console.log(post);

        // CHANGE :: show the count of zero likes on this post
        return $(`<li id="post-${ post._id }">
                    <p>
                        ${ post.content }

                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
                        </small>
                        <br>
                        <small>
                            - ${ post.user.name }
                        </small>
                        <br>
                        <small>
                            <a data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post" class="toggle-like-button">
                                0 Likes
                            </a>
                        </small>
                    </p>
                    <div class="post-comments">
                            <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type comment..." required>
                                <input type="hidden" name="post" value="${ post._id }">
                
                                <input type="submit" value="Add Comment">
                            </form>
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">

                            </ul>
                        </div>
                    </div>
                </li>`);
    }

    // method to delete a post from DOM
    let deletePost = function(deleteLink) {
        $(deleteLink).click(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#post-${ data.data.post_id }`).remove();
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}