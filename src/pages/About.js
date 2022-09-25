import React from "react"
import { Box, Link } from "@mui/material"
import useInquiry from '../hooks/useInquiry'
import {
  Link as LinkIcon
} from 'react-feather'


const About = () => {
  const inquiry = useInquiry()

  const handleClick = () => {
    inquiry.handleOpen()
  };

  return <>
    <div className="eyecatch">
      <figure>
        <img
          src="about.jpg"
          alt=""
          style={{ height: "100%" }} />
      </figure>
    </div>
    <article className="content">
      <div className="container">
        <h1 className="bar">ESSENTIALSについて</h1>
        <aside className="info">
          <div className="subtitle">
            <i className="fas fa-utensils"></i>
            ABOUT ESSENTIALS
          </div>
        </aside>
        <div className="postbody">
          <p>
            sample SAMPLE
          </p>
        </div>
        <Box mb="5rem" />
        <h1 className="bar">お問い合わせ</h1>
        <div className="postbody">
          お問い合わせは
          <span margin='0 5px'>
            <Link href="#" onClick={handleClick}>
              <LinkIcon size={20} />こちら
            </Link>
          </span>
          から
        </div>
      </div>
    </article>
  </>;
}



export default About