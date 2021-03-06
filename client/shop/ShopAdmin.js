import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ItemIcon from '@material-ui/icons/CardGiftcard';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import DeleteItem from './DeleteItem'
import EditItem from './EditItem'
import AddItem from './AddItem'
import { Link } from 'react-router-dom'
import { list } from './api-item.js'

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        padding: theme.spacing(1),
        margin: theme.spacing(5)
    }),
    title: {
        margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    }
}))

export default function Items() {
    const classes = useStyles()
    const [items, setItems] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                setItems(data)
            }
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [])

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                All Shop Items
            </Typography>
            <AddItem />
            <List dense>
                {items.map((itemList, i) => {
                    return <ListItem button>
                        <ListItemAvatar>
                            <Avatar>
                                <ItemIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={itemList.name} />
                        <ListItemText>Price: {itemList.price}??</ListItemText>
                        <ListItemText>Stock: {itemList.stock}</ListItemText>
                        <ListItemSecondaryAction>
                            <EditItem itemId={itemList._id} />
                            <DeleteItem itemId={itemList._id} />
                        </ListItemSecondaryAction>
                    </ListItem>
                })
                }
            </List>
        </Paper >
    )
}
