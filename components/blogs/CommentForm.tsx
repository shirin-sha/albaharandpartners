"use client";
import React from "react";

export default function CommentForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="write-review comment-content"
      id="comment-form"
    >
      <h4 className="title-wg-comment">Leave A Comment</h4>
      <fieldset>
        <textarea placeholder="Write your comment here" defaultValue={""} />
      </fieldset>
      <div className="cols g-20">
        <fieldset>
          <input type="text" placeholder="You Name (Public)" />
        </fieldset>
        <fieldset>
          <input type="email" placeholder="Your email (private)" />
        </fieldset>
      </div>
      <fieldset className="check-box mb-24">
        <input type="checkbox" id="checkbox" />
        <label htmlFor="checkbox" className="caption-1">
          Save my name, email, and website in this browser for the next time I
          comment.
        </label>
      </fieldset>
      <div className="bottom-btn">
        <button type="submit" className="tf-btn style-1 bg-on-suface-container">
          <span>Submit Review </span>
          <i className="icon-arrow-right-2" />
        </button>
      </div>
    </form>
  );
}
