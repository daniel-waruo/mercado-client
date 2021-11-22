import React from "react"

type PrettyPageProps = {
  children: React.ReactElement
}
const PrettyPage = ({children}: PrettyPageProps) => {
  return (
    <div className="container">
      <img className="background"
           src="/loginBg.jpg" alt={'bg'}/>
      <p className="message">All your dreams can come true<br/>if you have the courage to pursue them</p>
      {children}
      {
        [...Array(100)].map(
          (x, index) => (
            <div key={index} className="circle-container">
              <div className="circle"/>
            </div>
          )
        )
      }
    </div>
  )
}

export default PrettyPage
