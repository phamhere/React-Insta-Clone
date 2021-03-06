import React from "react";
import { CommentInput } from "./Styles";
import Comment from "./Comment";

class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments,
      comment: "",
      index: this.props.index
    };
  }
  addNewComment = e => {
    if (this.state.comment) {
      let newComments = [
        ...this.state.comments,
        { username: localStorage.getItem("user"), text: this.state.comment }
      ];
      if (e.key === "Enter") {
        this.setState({
          comments: newComments,
          comment: ""
        });
      }
    }
  };
  deleteComment = index => {
    let filteredComments = this.state.comments.filter(
      (comment, i) => index !== i
    );
    this.setState({ comments: filteredComments });
  };
  onCommentChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {
    localStorage.getItem(`post${this.state.index}`) !== null
      ? this.setState(
          JSON.parse(localStorage.getItem(`post${this.state.index}`))
        )
      : localStorage.setItem(
          `post${this.state.index}`,
          JSON.stringify(this.state)
        );
  }
  componentDidUpdate() {
    localStorage.setItem(`post${this.state.index}`, JSON.stringify(this.state));
  }
  render() {
    return (
      <React.Fragment>
        {this.state.comments.map((comment, i) => (
          <Comment
            comment={comment}
            key={i}
            i={i}
            deleteComment={this.deleteComment}
          />
        ))}
        <CommentInput
          type="text"
          name="comment"
          placeholder="Add a comment..."
          onChange={this.onCommentChange}
          value={this.state.comment}
          onKeyPress={this.addNewComment}
        />
      </React.Fragment>
    );
  }
}

export default CommentSection;
