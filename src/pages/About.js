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
        <h1 className="bar">luxbookingについて</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div className="postbody">
              <p>
                (株)LUXJAPAN制作の予約システムの美容室用デモサイトです。
              </p>
              <p>location:大阪府大阪市~</p>
              <p>tel:06-1234-0000</p>
            </div>
          </div>

          <ul>
            <li>mon:月：11:00~20:00</li>
            <li>tue:火：11:00~20:00</li>

            <li>wed:火：定休日</li>
            <li>thu:月：11:00~20:00</li>
            <li>fri:月：11:00~20:00</li>
            <li>sat:月：11:00~20:00</li>
            <li>sun:月：11:00~20:00</li>
          </ul>
        </div>

      </div>
    </article>
  </>;
}



export default About