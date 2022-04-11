import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import AddCommentIcon from '@material-ui/icons/AddComment';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from './../auth/auth-helper'
import { makeStyles } from '@material-ui/core/styles'
import { create } from './api-comment.js'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
}))

export default function AddComment() {
    const [open, setOpen] = useState(false)
    const classes = useStyles()

    const clickButton = () => {
        setOpen(true)
    }

    const handleRequestClose = () => {
        setOpen(false)
    }

    const [values, setValues] = useState({
        originId: '',
        user: '',
        comment: '',
        error: '',
        open: false,
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = () => {
        console.log(auth.isAuthenticated().user.name)
        const comment = {
            originId: auth.isAuthenticated().user._id || undefined,
            user: auth.isAuthenticated().user.name || undefined,
            comment: values.comment || undefined
        }
        create(comment).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, error: '', open: true })
            }
        })
    }

    return (<span>
        <IconButton aria-label="Add Comment" onClick={clickButton} color="secondary">
            <AddCommentIcon />
        </IconButton>

        <Dialog open={open} onClose={handleRequestClose}>
            <DialogTitle>{"Write Comment"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter a comment.
                </DialogContentText>
            </DialogContent>
            <TextField id="comment" label="Comment" className={classes.textField} value={values.comment} onChange={handleChange('comment')} margin="normal" /><br />
            <DialogActions>
                <Button onClick={handleRequestClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={clickSubmit} color="primary" autoFocus="autoFocus" variant="contained" className={classes.submit}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    </span>)

}