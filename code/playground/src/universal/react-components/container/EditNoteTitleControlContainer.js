import React, { Component } from "react";
import { connect } from "react-redux";
import EditNoteControl from "../presentational/EditNoteTitleControl"
import { updateNoteTitleCommand } from "../../redux-actions/commands"

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUpdateNoteTitle: (note, updatedTitle) => dispatch(updateNoteTitleCommand(note, updatedTitle))
    };
};

class EditNoteTitleControlContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inEditMode: false,
            title: this.props.note.title
        };
        this.handleClickTitle = this.handleClickTitle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAbort = this.handleAbort.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClickTitle(event) {
        this.setState({ inEditMode: true });
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleAbort(event) {
        this.setState({ title: this.props.note.title, inEditMode: false });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title } = this.state;
        this.setState({ inEditMode: false });
        this.props.dispatchUpdateNoteTitle(this.props.note, title);
    }

    render() {
        const { title, inEditMode } = this.state;
        let titleHasBeenChanged = false;
        if (title !== this.props.note.title) {
            titleHasBeenChanged = true;
        }
        return (
            <EditNoteControl
                handleClickTitle={this.handleClickTitle}
                handleChange={this.handleChange}
                handleAbort={this.handleAbort}
                handleSubmit={this.handleSubmit}
                title={title}
                inEditMode={inEditMode}
                titleHasBeenChanged={titleHasBeenChanged}
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(EditNoteTitleControlContainer);