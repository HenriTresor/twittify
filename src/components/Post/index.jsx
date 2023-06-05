import React from 'react'
import './Post.css'
import propTypes from 'prop-types'
import { Avatar, Typography} from '@mui/material'
import {
     Comment, Share, HeartBroken, BarChart
} from '@mui/icons-material'

const Post = ({
    avatar,
    author, author_uname,
    posted_on, post_content,
    post_comments,
    post_likes,post_views, post_retweets
}) => {
  return (
      <div
      className='post-container'
      >
          <div className='post-header'>
              <Avatar />
              <div>
                  <Typography>
                      {author}  {author_uname} • {new Date(posted_on).toLocaleDateString()}
                  </Typography>
                  <Typography>
                      {post_content?.post_text}
                  </Typography>
              </div>
          </div>
          <div className="post-reactions">
              <div>
                  <Comment />
                  <Typography>
                      {post_comments?.length ? post_comments.length : 0}
                  </Typography>
            </div>
              <div>
                  <Share />
                  <Typography>
                      {post_retweets?.length ? post_retweets.length : 0}
                  </Typography>
            </div>
              <div>
                  <HeartBroken />
                  <Typography>
                      {post_likes?.length ? post_likes?.length : 0}
                  </Typography>
            </div>
              <div>
                  <BarChart />
                  <Typography>
                      {post_views?.length ? post_views?.length : 0}
                  </Typography>
            </div>
          </div>
      </div>
  )
}

Post.prototype = {
    avatar: propTypes.string.isRequired,
    author: propTypes.string.isRequired,
    author_uname: propTypes.string.isRequired,
    posted_on: propTypes.string.isRequired,
    post_content: {
        post_text: propTypes.string,
        post_image: propTypes.string
    },
    post_comments: propTypes.array,
    post_retweets: propTypes.array,
    post_likes: propTypes.array,
    post_views: propTypes.array
}

export default Post