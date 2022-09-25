import React from "react"

const Home = () => {
  return <>
    <section className="hero">
      <figure>
        <img
          src="hero.jpg"
          alt=""
          style={{ height: "100%" }} />
      </figure>
      <div className="catch">
        <h1>
          There is no love sincerer than
          <br />
          the love of nails.
        </h1>
      </div>
      <div className="wave">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1366 229.5"
          fill="#fff"
        >
          <path
            d="M1369,6.3C1222.5-12.2,1189.5,8,919.2,96.6C665,179.8,160,141.7-2,53.1v150l1371-14.2V6.3z"
            opacity=".53"
          />
          <path d="M1369 229.5V55.8c-9.5-2.4-19.2-4.4-28.9-5.8-196.9-29.9-203.4-15.8-503.9 82.6-219.8 72-627.6 53.2-838.2-10.5v107.4h1371z" />
        </svg>
      </div>
    </section>
    <section className="food">
      <div className="container">
        <h2 className="bar">
          Our <span>Services</span>
        </h2>
        <div className="details">
          <div className="detail">
            <figure>
              <img
                src="fruit.jpg"
                alt=""
                style={{ width: '320px' }} />
            </figure>
            <br />
            <p>Hand</p>
            <p>
              ジェルネイルを中心に指先を綺麗に
            </p>
          </div>
          <div className="detail">
            <figure>
              <img
                src="grain.jpg"
                alt=""
                style={{ width: '320px' }} />
            </figure>
            <br />
            <p>Foot</p>
            <p>
              素足にも自信が持てるフットネイル
            </p>
          </div>
          <div className="detail">
            <figure>
              <img
                src="beverage.jpg"
                alt=""
                style={{ width: '320px' }} />
            </figure>
            <br />
            <p>Care</p>
            <p>
              フットネイルがより映える魅せられる足へ
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="photo">
      <h2 className="sr-only">Photo</h2>
      <figure>
        <img
          src="berry.jpg"
          alt="赤く熟したベリー"
          style={{ height: "100%", width: 'FULL_WIDTH' }} />
      </figure>
    </section>
  </>;
}

export default Home
