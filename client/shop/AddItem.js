import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import BoxIcon from '@material-ui/icons/AddBox';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from './../auth/auth-helper'
import { makeStyles } from '@material-ui/core/styles'
import { create } from './api-item.js'
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

export default function AddItem() {
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const classes = useStyles()

    const clickButton = () => {
        setOpen(true)
    }

    const handleRequestClose = () => {
        setOpen(false)
    }

    const [values, setValues] = useState({
        name: '',
        price: 0,
        stock: 0,
        error: '',
        open: false,
    })

    const jwt = auth.isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = () => {
        const item = {
            name: values.name || undefined,
            price: values.price || undefined,
            stock: values.stock || undefined
        }
        create({
            t: jwt.token
        }, item).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, error: '', open: true })
                setRedirect(true)
            }
        })
    }

    if (redirect) {
        return <Redirect to='/' />
    }

    return (<span>
        <IconButton aria-label="Add Item" onClick={clickButton} color="secondary">
            <BoxIcon />
        </IconButton>

        <Dialog open={open} onClose={handleRequestClose}>
            <DialogTitle>{"Add Item to Shop"}</DialogTitle>
            <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal" /><br />
            <TextField id="price" label="Price" className={classes.textField} value={values.price} onChange={handleChange('price')} margin="normal" /><br />
            <TextField id="stock" label="Stock" className={classes.textField} value={values.stock} onChange={handleChange('stock')} margin="normal" />
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