import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Person from '@material-ui/icons/Person'
import DeleteComment from './DeleteComment'
import auth from './../auth/auth-helper'
import { Link } from 'react-router-dom'
import { list } from './api-comment'

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

export default function Comments() {
  const classes = useStyles()
  const [comments, setComments] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setComments(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [])


  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Comments Page
      </Typography>
      <List dense>
        {comments.map((item, i) => {
          return <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.user} />
            <ListItemText primary={item.comment} /> {
             auth.isAuthenticated().user && auth.isAuthenticated().user.name == item.user &&
              (<ListItemSecondaryAction>
                <Link to={"/comment/edit/" + comment._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit/>
                  </IconButton>
                </Link>
                <DeleteComment commentId={comment._id}/>
              </ListItemSecondaryAction>)
            }
          </ListItem>

        })
        }
      </List>
    </Paper>
  )
}
