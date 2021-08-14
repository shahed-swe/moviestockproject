const Comments = (props) => {
    const  {id, comment} = props.comments;
    return (
        <div class="comment-style" key={id}>
            <div class="comments">
                {comment}
            </div>
        </div>
    )
}

export default Comments;