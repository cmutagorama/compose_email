/* eslint-disable no-useless-escape */
import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    toggleInput: true,
    value: "",
    emails: [],
    error: null
  };

  handleChange = evt => {
    this.setState({
      value: evt.target.value,
      error: null
    });
  };

  handleKeyDown = evt => {
    if (["Enter", "Tab", " ", ","].includes(evt.key)) {
      evt.preventDefault();
      var email = this.state.value.trim();
      if (email && this.isValid(email)) {
        this.setState({
          emails: [...this.state.emails, email],
          value: "",
          toggleInput: false
        });
      }
    }
  };

  handleDelete = toBeRemoved => {
    this.setState({
      emails: this.state.emails.filter(email => email !== toBeRemoved)
    });
  };

  isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  isInList(email) {
    return this.state.emails.includes(email);
  }

  // Email validation
  isValid(email) {
    var error = null;
    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (error) {
      this.setState({ error });
      return false;
    }
    return true;
  }

  handlePaste = evt => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter(email => !this.isInList(email));

      this.setState({
        emails: [...this.state.emails, ...toBeAdded]
      });
    }
  };

  handleToggleInput = evt => {
    evt.preventDefault();
    this.setState({
      toggleInput: true
    });
  };

  render() {
    return (
      <main className="wrapper">
        {this.state.emails.map(email => (
          <div className="tag-item" key={email}>
            {email}
            <button
              type="button"
              className="button"
              onClick={() => this.handleDelete(email)}
            >
              &times;
            </button>
          </div>
        ))}
        {!this.state.toggleInput && (
          <button className="add-btn" onClick={this.handleToggleInput}>
            &#43;
          </button>
        )}
        {this.state.toggleInput && (
          <input
            className={"input " + (this.state.error && "has-error")}
            placeholder="Type or paste email addresses and press `Enter`"
            autoFocus
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onPaste={this.handlePaste}
          />
        )}
        {this.state.error && <p className="error">{this.state.error}</p>}

        <textarea name="message" id="message" placeholder="Type your message" />
        <button className="submit">Send message</button>
      </main>
    );
  }
}

export default App;
